import { GameEmitter } from '../gameEmitter';
import { State } from "./state";
import Player from "../player";
import Game from "../game";
import { GameState } from '../types';

export class VictoryState extends State {
  protected messages: {player: string, screen: string};

  constructor (game: Game) {
    super(game, true);
    this.messages = {player: '', screen: ''}
    this.type = 'victory';
    this.init();
  }

  init() {
    //Merlin got killed
    if (this.game.lastStateResult == 'success') {
      this.setPlayerMessage('Merlin has fallen! The dark age rises!');
      this.setScreenMessage('Merlin has fallen! The dark age rises!');
      this.icon = 'evil_win';
    } else if (this.game.lastStateResult == 'evil') { // Evil team wins!
      this.setPlayerMessage('The dark team wins! The dark age rises!');
      this.setScreenMessage('The dark team wins! The dark age rises!');
      this.icon = 'evil_win';
    } else {//Good team wins
      this.setPlayerMessage('The good team wins! The evil forces are defeated!');
      this.setScreenMessage('The good team wins! The evil forces are defeated!');
      this.icon = 'good_win';
    }
    this.state = GameState.VICTORY;
    this.game.end();
  }

  get answers () {
    return 0
  }

  toJSON () {
    return {
      id: this.id,
      type: this.type,
      state: this.state,
      title: this.title,
      icon: this.icon,
      messages: this.messages
    };
  }

  setPlayerMessage (message: string) {
    this.messages.player = message;
  }

  setScreenMessage (message: string) {
    this.messages.screen = message;
  }
}