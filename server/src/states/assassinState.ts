import { Quest, GameState } from './../types';
import { GameEmitter } from '../gameEmitter';
import { State } from "./state";
import Player from "../player";
import Game from "../game";
import { RSA_PKCS1_OAEP_PADDING } from 'constants';


export class AssassinState extends State {
  protected choosen: Array<number>;
  protected maxChoosen: number;
  protected alreadyOk: Array<number>;
  protected choosingPlayer: Player;
  protected quest: Quest;
  protected evil: Array<Player>;
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
    this.type = 'assassin';
    this.updateAnswers();
    this.init();
  }

  init () {
    this.quest = this.game.size.quests[this.game.questWinners.length];
    this.choosingPlayer = this.getAssassinPlayer();
    this.state = GameState.ASSASSIN;
    this.playerList = this.goodPlayers();
    this.title="My beloved friends,";
    
    this.evil = this.listRoles(['minion', 'assassin', 'oberon', 'morgana', 'mordred']);
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
      evil: this.evil,
      maxChoosen: this.maxChoosen,
      playerList: this.playerList,
      choosingPlayer: this.choosingPlayer,
      choosen: this.choosen,
      messages: this.messages
    };
  }

  getAssassinPlayer() {
    return this.game.players.find(val => val.role == 'assassin');
  }
  listRoles(roles: Array<string>) {
    let out = [];
    for (let i = 0; i < this.game.players.length; i++) {
      let p = this.game.players[i];
      if (roles.includes(p.role)) {
        out.push(p);
      }
    }
    return out;
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
      let merlin = this.game.players.find(val => val.role=='merlin');
      if(this.choosen[0] == merlin.id) {
        this.end('success');
      } else {
        this.end('good');
      }
      
    }
  }
  goodPlayers() {
    let out = [];
    for (let i = 0; i < this.game.players.length; i++) {
      let p = this.game.players[i];
      if (p.character.team == 'good') {
        out.push(p);
      }
    }
    return out;
  }
}

