
import { GameState } from "../types";
import { EventEmitter } from "events";
import { OkState } from "./okState";
import { YesNoState } from "./yesNoState";

export class AfterVoteState extends OkState {
  init () {
    
    
    this.state = GameState.AFTER_VOTE;
    this.setPlayerListTitle('Vote Result');
    this.generatePlayerStyle();
    this.playerList = this.game.players;
    if (this.game.lastStateResult == 'success') {
      this.title = 'Success';
      this.game.resetFails()
      this.setPlayerMessage('The vote succeded! The quest can start!');
      this.setScreenMessage('The vote succeded! The quest can start!');
    } else {
      this.game.incrementFails();
      this.title = 'Failure';
      this.setPlayerMessage('The vote failed! May a new king send a new group of adventurers!');
      this.setScreenMessage('The vote succeded! May a new king send a new group of adventurers!');
    }
    
  }

  end () {
    this.emit('end', this.game.lastStateResult);
  }

  generatePlayerStyle() {
    let data = YesNoState.lastResult;
    for(let vote of data) {
      this.playerStyle[vote.player.id] = (vote.vote == 'yes') ? 'success' : 'danger';
    }
  }
}