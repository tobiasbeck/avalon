import { GameEmitter } from '../gameEmitter';
import { State } from "./state";
import Player from "../player";
import Game from "../game";
import { stringify } from 'querystring';

export abstract class OkState extends State {
  protected oks: number;
  protected maxOks: number;
  protected alreadyOk: Array<number>;
  protected messages: {player: string, screen: string, playerList: string, after: string};
  protected playerList: Array<Player>;
  protected playerStyle: Array<'good' | 'evil'>;

  constructor (game: Game) {
    super(game, true);
    this.oks = 0;
    //this.maxOks = this.game.players.length;
    this.maxOks = 1;
    this.alreadyOk = [];
    this.playerList = [];
    this.playerStyle = [];
    this.messages = {player: '', screen: '', playerList: '', after: ''}
    this.type = 'ok';
    this.updateAnswers();
    this.init();
  }

  get answers () {
    return this.oks;
  }

  toJSON () {
    return {
      id: this.id,
      type: this.type,
      state: this.state,
      icon: this.icon,
      title: this.title,
      playerStyle: this.playerStyle,
      playerList: this.playerList,
      messages: this.messages
    };
  }

  updateAnswers() {
    this.game.gameSocket.send('round_answers', this.oks);
  }

  setPlayerMessage (message: string) {
    this.messages.player = message;
  }

  setScreenMessage (message: string) {
    this.messages.screen = message;
  }

  setAfterPlayerListMessage (message: string) {
    this.messages.after = message;
  }

  setPlayerListTitle (message: string) {
    this.messages.playerList = message;
  }



  yes(player: Player) {
    if (!this.alreadyOk.includes(player.id)) {
      this.oks++;
      this.alreadyOk.push(player.id);
      this.updateAnswers();
      if (this.maxOks <= this.oks) {
        this.end();
      }
    }
  }
}