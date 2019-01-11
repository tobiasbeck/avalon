import { GameEmitter } from '../gameEmitter';
import { State } from "./state";
import Player from "../player";
import Game from "../game";

export enum YesNoMessageTypes {
  PLAYER = 'player',
  SCREEN = 'screen',
  NO_VOTERS = 'noVoters',
  YES = 'yes',
  NO = 'no',
  PLAYER_LIST = 'playerList'
};

export abstract class YesNoState extends State {
  protected votesYes: number;
  protected votesNo: number;
  protected alreadyVoted: Array<number>;
  protected allowedVoters: Array<number>;
  protected messages: {player: string, screen: string, noVoters: string, yes: string, no: string, playerList: string};
  protected playerList: Array<Player>;
  public static lastResult: Array<{player:Player, vote:'yes' | 'no'}>;

  constructor (game: Game) {
    super(game, true);
    this.votesNo = 0;
    this.votesYes = 0;
    //this.neededVotes = 1;
    this.alreadyVoted = [];
    this.allowedVoters = [];
    this.playerList = [];
    YesNoState.lastResult = [];
    this.messages = {player: '', screen: '', noVoters: '', yes: '', no: '', playerList: ''}
    this.type = 'yesNo';
    this.updateAnswers();
    this.init();
  }

  get answers () {
    return this.votesYes + this.votesNo;
  }

  get neededVotes () {
    return this.allowedVoters.length
  }

  toJSON () {
    return {
      id: this.id,
      type: this.type,
      state: this.state,
      title: this.title,
      allowedVoters: this.allowedVoters,
      playerList: this.playerList,
      messages: this.messages
    };
  }

  updateAnswers() {
    this.game.gameSocket.send('round_answers', this.answers);
  }
  setMessage(type: YesNoMessageTypes, message: string) {
    this.messages[type] = message;
  }

  yes(player: Player) {
    if (!this.alreadyVoted.includes(player.id) && this.allowedVoters.includes(player.id)) {
      this.votesYes++;
      this.alreadyVoted.push(player.id);
      YesNoState.lastResult.push({player: player, vote: 'yes'});
      this.updateAnswers();
      if (this.neededVotes <= this.answers) {
        this.end();
      }
    }
  }

  no(player: Player) {
    if (!this.alreadyVoted.includes(player.id) && this.allowedVoters.includes(player.id)) {
      this.votesNo++;
      this.alreadyVoted.push(player.id);
      YesNoState.lastResult.push({player: player, vote: 'no'});
      this.updateAnswers();
      if (this.neededVotes <= this.answers) {
        this.end();
      }
    }
  }
}