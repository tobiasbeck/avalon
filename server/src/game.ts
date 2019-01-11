import { StateFactory } from './stateFactory';
import { State } from './states/state';
import Player from "./player";
import * as shortid from 'shortid'
import { EventEmitter } from "events";
import { GAME_SIZES, CHARACTERS } from "./const";
import { GameEmitter } from "./gameEmitter";
import { Character, GameRejoins, GameSize, GameState } from "./types";
import { shuffle } from './helpers';

export default class Game  extends EventEmitter{
  readonly id: string;
  public gameSocket: GameEmitter;
  public state: State;
  public roundId: number;
  public players: Array<Player>;
  public questWinners: Array<'evil'|'good'>
  public questPlayers: Array<number>;
  public lastStateResult: 'good' | 'evil' | 'false' | 'success' | 'failure';
  public rejoinIds: GameRejoins;
  public fails: number;
  public size: GameSize;
  public specialRoles: Array<string>
  constructor (id: string,gameSocket: SocketIO.Socket, isScreen: boolean) {
    super();
    this.id = id;
    this.gameSocket = new GameEmitter(gameSocket, isScreen);
    this.state = undefined;
    this.roundId = 0;
    this.fails = 0;
    this.lastStateResult = 'false';
    this.fails = 0;
    this.size = undefined;
    this.questWinners = ['good','good', 'good'];
    this.specialRoles = [];
    this.players = [];
    this.rejoinIds = {};
    this.setGameEvents();
  }

  setGameEvents () {
    this.gameSocket.on('settings-character', (data) => {
      if (this.specialRoles.includes(data.character)) {
          let position = this.specialRoles.indexOf(data.character);
          this.specialRoles.splice(position, 1);
      } else {
          this.specialRoles.push(data.character);
      }
      this.gameSocket.send('settings_characters', this.specialRoles);
    });
    this.gameSocket.on('game-start', () => {
      this.startGame();
    });
    this.gameSocket.on('game-end', () => {
      //this.endGame();
    });

    this.gameSocket.on('disconnect', (value) => {
      //this.endGame()
    });
  }

  startGame () {
    this.size = GAME_SIZES[this.players.length];
    this.distributeRoles();
    this.setState(GameState.LOBBY);

  }

  rejoin (socket, id) {
    console.log(this.rejoinIds[id])
    if (this.rejoinIds[id] !== undefined) {
      let player = this.rejoinIds[id];
      player.unsetEvents();
      player.socket = socket;
      this.setPlayerEvents(player)
      player.rejoin(this);
      
      if (player.gameLeader == true) {
        this.gameSocket.unsetEvents();
        this.gameSocket.socket = socket;
        this.gameSocket.setSocketEvents();
      }
    }
  }

  join (socket, data): Player | false {
    if (this.players.length < 10) {
      let player = new Player(data.name, socket, 0);
      player.rejoinId = shortid.generate();
      this.rejoinIds[player.rejoinId] = player;
      let id = this.players.push(player);
      player.id = id-1;
      this.setPlayerEvents(player);

      this.gameSocket.players = this.players;
      this.gameSocket.send('player-join', player);
      player.initialize(this);
      return player;
    }
    return false;
  }

  setPlayerEvents(player: Player) {
    player.on('player-yes', () => {
      if (this.state !== undefined) {
        this.state.yes(player);
      }
    });

    player.on('player-no', () => {
      if (this.state !== undefined) {
        this.state.no(player);
      }
    });

    player.on('player-choose', (data) => {
      if (this.state !== undefined) {
        this.state.choose(player, data);
      }
    });
  }

  getSpecialRoles() {
    let specialRoles = [];
    for(let char of CHARACTERS) {
      if (char.special !== false) {
        specialRoles.push(char);
      }
    }
    return specialRoles;
  }

  publish(event, data) {
    for(let playerId in this.players) {
      this.players[playerId].socket.emit(event, data);
    }
  }

  distributeRoles () {
    let teams = {
      evil: 0,
      good: 0
    };

    let roles = [];
    this.specialRoles.push('merlin', 'assassin');
    for (let special of this.specialRoles) {
      let char = CHARACTERS.find(val => (val.role == special));
      roles.push(char);
      teams[char.team]++;
    }
    if (teams.evil < this.size.evils) {
      for (let i = 0; i < (this.size.evils - teams.evil); i++) {
        let char = CHARACTERS.find(val => (val.role == 'minion'));
        roles.push(char);
        teams[char.team]++;
      }
    }
    let sum = teams.evil + teams.good;
    for (let i = 0; i < (this.players.length - sum); i++) {
      let char = CHARACTERS.find(val => (val.role == 'servant'));
      roles.push(char);
      teams[char.team]++;
    }
    roles = shuffle<Character>(roles);
    for (let i = 0; i < this.players.length; i++) {
      let role = roles.shift();
      this.players[i].setCharacter(role);
    }
  }

  setState(state: GameState) {
    this.state = StateFactory.getState(state, this);
    this.gameSocket.sendGameState(this.state);
    this.state.on('end', (result) => {
      this.lastStateResult = result;
      if (result == 'evil' || result == 'good') {
        this.addQuestWinner(result);
      }
      this.setState(this.state.state);
    });
  }

  addQuestWinner(winner: 'evil' | 'good') {
    this.questWinners.push(winner);
    this.gameSocket.send('quest-winners', this.questWinners);
  }

  incrementFails() {
    this.fails++;
    this.gameSocket.send('game-fails', this.fails);
  }

  resetFails() {
    this.fails=0;
    this.gameSocket.send('game-fails', this.fails);
  }

  end() {
    this.emit('end');
  }
}