import { GameState } from './../types';
import Game from "../game";
import * as shortid from 'shortid';
import { EventEmitter } from "events";
import Player from "../player";
import StrictEventEmitter from 'strict-event-emitter-types';

interface StateEvents {
  end: 'good' | 'evil' | 'false' | 'success' | 'failure'
}

export abstract class State extends (EventEmitter as { new(): StrictEventEmitter<EventEmitter, StateEvents> }) {
  public game: Game;
  protected type: string;
  public state: GameState;
  public icon: string;
  protected title: string;
  protected id: string;

  constructor (game: Game, skipInit = false) {
    super();
    this.game = game;
    this.id = shortid.generate();
    this.type = 'unknown';
    this.state = GameState.LOBBY;
    this.title = 'unknown';
    if (skipInit == false) {
      this.init();
    }
  }
  abstract get answers();
  abstract toJSON();
  abstract init ();
  yes (player:Player) {}
  no (player:Player) {}
  choose (player:Player, chosen:any) {}

  end (result: 'good' | 'evil' | 'false' | 'success' | 'failure' = 'false') {
    this.emit('end', result);
  }

  setTitle (title: string) {
    this.title = title;
  }
}