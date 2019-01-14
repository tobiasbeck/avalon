import { GameList } from './types';
import * as express from 'express';
import * as http from 'http';
import * as SocketIO from 'socket.io';
import * as compression from 'compression';
import Game from './game';
import * as randomId from 'simple-random-id'
import * as fs from 'fs';
import Player from './player';

let app = express();
let server = new http.Server(app);
let io = SocketIO(server);
let port = process.env.PORT || 3976;
let games: GameList = {};
let rejoinIds = {};
let statistics = {
  startedGames: 0,
  endedGames: 0,
  startedRounds: 0,
}
try {
let statisticsFile =  fs.readFileSync('./statistics.json', 'utf8');
if (statisticsFile && statisticsFile !== '') { 
  statistics = JSON.parse(statisticsFile);
}
} catch (error) {
  console.log(error);
}

app.use(compression({}));
io.on('connection', (socket) => {
  socket.emit('statisticsUpdate', statistics);
  console.log('Connected!');

  socket.on('game-create', (data, callback) => {
    let id = randomId(4);
    while (id.includes('0') || id.includes('O')) {
      id = randomId(4);
    }

    let game = new Game(id, socket, data.gamefield);
    games[id] = game;
    game.on('end', () => {
      delete games[game.id];
    });
    let result: false | Player;
    if (data.gamefield !== true) {
      result = game.join(socket, data);
      if((<Player>result).id !== undefined) {
        (<Player>result).gameLeader = true;
        rejoinIds[(<Player>result).rejoinId] = {
          gameId: id
        }
      }
    }
    console.log('GAME: ' + id)
    callback({id: id, me: result});
  });

  socket.on('game-join', (data, callback) => {
    if (games[data.game]) {
      let game = games[data.game];
      let result = game.join(socket, data);
      if (result === false) {
        callback({
          success: false,
          message: 'This game is already full :/'
        });
      } else {
        rejoinIds[(<Player>result).rejoinId] = {
          gameId: data.game
        }
        callback({
          success: true,
          result: result
        });
      }
    } else {
      callback({
        success: false,
        message: 'This game does not exist'
      });
    }
  });

  socket.on('player-rejoin', (data, callback) => {
    console.log('REJOIN ', data);
    if (rejoinIds[data]) {
      console.log('found rejoin')
      let gameId = rejoinIds[data].gameId;
      if (games[gameId]) {
        console.log('game exits');
        let game = games[gameId];
        console.log('trigger rejoin');
        game.rejoin(socket, data);
      } else {
        socket.emit('noGame', true)
      }
    } else {
      socket.emit('noGame', true)
    }
  });
});

server.listen(port, () => {
    console.log('[INFO] Listening on *:' + port);
});

function updateStatistics () {
  let content = JSON.stringify(statistics)
  io.emit('statisticsUpdate', statistics);
  fs.writeFile("./statistics.json", content, function(err) {
    if(err) {
        return console.log(err);
    }

    //console.log("The file was saved!");
}); 
}