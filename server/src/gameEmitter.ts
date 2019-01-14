import { EventEmitter } from "events";
import Player from "./player";
import StrictEventEmitter from 'strict-event-emitter-types';
import { GameState, GameSize } from "./types";
import { State } from "./states/state";
import Game from "./game";

interface GameEmitterEvents {
  ['settings-character']: {character: string},
  ['game-start']: void,
  ['game-end']: void,
  ['disconnect']: string
}

export class GameEmitter extends (EventEmitter as { new(): StrictEventEmitter<EventEmitter, GameEmitterEvents> }) {
  public players: Array<Player>;
  public socket: SocketIO.Socket;
  public isGameScreen: boolean;

  constructor (socket: SocketIO.Socket, isGameScreen = false) {
    super();
    this.socket = socket;
    this.players = [];
    this.isGameScreen = isGameScreen;
    this.setSocketEvents();
  }

  sendGameState(state: State) {
    this.send('setState', state);
  }

  unsetEvents () {
    this.socket.removeAllListeners()
  }

  send(event: string, data: any) {
    if(this.isGameScreen) {
      this.socket.emit(event, data);
    }
    this.publish(event, data)
  }

  publish(event: string, data: any) {
    for(let playerId in this.players) {
      this.players[playerId].socket.emit(event, data);
    }
  }

  setSocketEvents () {
    this.socket.on('settings-character', (data) => {
      this.emit('settings-character', data);
    });
    this.socket.on('game-start', () => {
      this.emit('game-start');
    });
    this.socket.on('disconnect', () => {
      if (this.isGameScreen) {
        this.emit('disconnect', '');
      }
    });
    this.socket.on('game-end', () => {
      this.emit('game-end');
    });
  }
  initialize(game: Game) {
    if (this.isGameScreen == true) {
      this.send('game_players', game.players);
      this.sendGameState(game.state);
    }
  }
  setSize(size: GameSize) {
    this.send('game_size', size);
  }
}