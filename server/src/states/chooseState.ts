import { Quest, GameState } from './../types';
import { GameEmitter } from '../gameEmitter';
import { State } from "./state";
import Player from "../player";
import Game from "../game";


export class ChooseState extends State {
  protected choosen: Array<number>;
  protected maxChoosen: number;
  protected alreadyOk: Array<number>;
  protected choosingPlayer: Player;
  protected quest: Quest;
  protected messages: {player: string, screen: string, chooser: string};
  protected playerList: Array<Player>;
  static lastPlayer:number = -1;

  constructor (game: Game) {
    super(game, true);
    this.choosen = [];
    //this.maxOks = this.game.players.length;
    this.maxChoosen = 1;
    this.playerList = this.game.players;
    this.messages = {player: '', screen: '', chooser: ''}
    this.type = 'choose';
    this.updateAnswers();
    this.init();
  }

  init () {
    this.quest = this.game.size.quests[this.game.questWinners.length];
    console.log(this.game.questWinners.length);
    console.log(this.quest);
    this.maxChoosen = this.quest.players;
    this.state = GameState.CHOOSE;
    this.title="To our venerable and excellent king,";
    this.setChooserMessage('You are the King!<br>Please select players that go on a quest');
    this.setScreenMessage('');
    this.setPlayerMessage('The King chooses players going on a quest');
    this.setChoosingPlayer();
  }

  get answers () {
    return this.choosen.length;
  }

  toJSON () {
    return {
      id: this.id,
      type: this.type,
      state: this.state,
      title: this.title,
      maxChoosen: this.maxChoosen,
      playerList: this.playerList,
      choosingPlayer: this.choosingPlayer,
      choosen: this.choosen,
      messages: this.messages
    };
  }

  updateAnswers() {
    this.game.gameSocket.send('round_answers', this.choosen.length);
  }

  setPlayerMessage (message: string) {
    this.messages.player = message;
  }

  setChooserMessage (message: string) {
    this.messages.chooser = message;
  }

  setScreenMessage (message: string) {
    this.messages.screen = message;
  }

  choose (player:Player, chosen:any) {
    if (player.id == this.choosingPlayer.id) {
      this.choosen = chosen;
      this.game.gameSocket.sendGameState(this);
      this.updateAnswers();
    }
  }

  yes(player: Player) {
    if (this.choosen.length == this.maxChoosen) {
      this.game.questPlayers = this.choosen;
      this.end();
    }
  }

  setChoosingPlayer() {
    ChooseState.lastPlayer++;
    if (ChooseState.lastPlayer >= this.playerList.length) {
      ChooseState.lastPlayer = 0;
    }
    this.choosingPlayer = this.game.players[ChooseState.lastPlayer];
  }
}