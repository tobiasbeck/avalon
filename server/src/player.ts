import { Character, GameState } from './types';
import { CHARACTERS, KNIGHT_NAMES } from './const';
import { EventEmitter } from "events";
import Game from "./game";
import StrictEventEmitter from 'strict-event-emitter-types';
import { State } from './states/state';

interface PlayerEvents {
  ['player-yes']:void,
  ['player-no']: void,
  ['player-choose']: any,
  ['disconnect']: void
}

export default class Player extends (EventEmitter as { new(): StrictEventEmitter<EventEmitter, PlayerEvents> }) {
  public name: string;
  public id: number;
  public socket: SocketIO.Socket;
  public gameLeader: boolean;
  public role: string;
  public character: Character;
  public rejoinId: string;
  public connected: boolean;

  constructor (name: string, socket: SocketIO.Socket, id: number, gameLeader = false, knightName = false, gender: 'm' | 'f' = 'm') {
    super()
    this.name = name;
    this.connected = true;

    if (this.name == 'Liisa' || this.name == 'Lisa' || this.name == 'Lisbetti') {
      this.name = 'Hot Potatoe';
    } else if (knightName == true) {
      let add = this.getRandomTitle(gender);
      this.name = add.prefix + ' ' + this.name;
    }

    this.id = id;
    this.socket = socket;
    this.gameLeader = gameLeader;
    this.role = '';
    this.character = undefined;
    this.setEvents();
  }

  setEvents () {
    this.socket.on('disconnect', () => {
      this.unsetEvents();
      this.connected = false;
      this.emit('disconnect');
    });

    this.socket.on('player-yes', () => {
      this.emit('player-yes');
    });

    this.socket.on('player-no', () => {
      this.emit('player-no');
    });

    this.socket.on('player-choose', (data) => {
      this.emit('player-choose', data);
    });
    
  }

  unsetEvents () {
    this.socket.removeAllListeners()
  }

  setState (state) {
    this.socket.emit('setState', state)
  }

  setCharacter(char: Character) {
    this.role = char.role;
    this.character = char;
    this.send('player-character', {character: char});
  }

  toJSON () {
    return {
      id: this.id,
      name: this.name,
      gameLeader: this.gameLeader,
      role: this.role,
      character: this.character,
      rejoinId: this.rejoinId
    }
  }

  rejoin(game: Game) {
    let pack = {
      player: {
        name: this.name,
        id: this.id,
        gameLeader: this.gameLeader,
        role: this.role,
        character: this.character,
        rejoinID: this.rejoinId
      },
      game: {
        id: game.id,
        players: game.players,
        state: game.state,
        fails: game.fails,
        size: (game.size !== undefined) ? game.size : {},
        questWinners: game.questWinners,
        currentAccepted: (game.state != undefined) ? game.state.answers : 0
      }
    }
    this.connected = true;
    this.setEvents();
    this.socket.emit('rejoinReturn', pack);
  }

  send (topic: string, data: any) {
    this.socket.emit(topic, data);
  }

  sendGameState(state: State) {
    this.send('setState', state);
  }

  initialize(game: Game) {
    this.send('game_players', game.players);
    this.sendGameState(game.state);
  }

  getRandomTitle(gender: 'm' | 'f') {
    let names = KNIGHT_NAMES[gender];
    let nameId = Math.floor(Math.random() * (names.length - 0)) + 0;
    return names[nameId];
  }


}