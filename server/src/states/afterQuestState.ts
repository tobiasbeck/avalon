
import { GameState } from "../types";
import { EventEmitter } from "events";
import { OkState } from "./okState";
import Player from "../player";
import { YesNoState } from "./yesNoState";

export class AfterQuestState extends OkState {
  protected result:{yes: number, no: number};
  init () {
    this.type = 'after_quest';
    this.state = GameState.AFTER_QUEST;

    this.result = {yes: 0, no: 0};
    this.result.yes = YesNoState.lastResult.filter(val => val.vote == 'yes').length;
    this.result.no = YesNoState.lastResult.filter(val => val.vote == 'no').length;
    
    if (this.game.lastStateResult == 'good') {
      this.title = 'Success';
      this.icon = 'quest_success';
      this.setPlayerMessage('We had success!<br> Let\'s celebrate this unbelivable outcome!');
      this.setScreenMessage('We had success!<br> Let\'s celebrate this unbelivable outcome!');
    } else {
      this.title = 'Oh no!';
      this.icon = 'quest_failure';
      this.setPlayerMessage('Our well planned quest failed!<br> This is a dark day for the kingdom!');
      this.setScreenMessage('Our well planned quest failed!<br> This is a dark day for the kingdom!');
    }
    
  }

  end () {
    this.emit('end', 'false');
  }

  toJSON () {
    let local = {
      result: this.result
    };

    return Object.assign({}, local, super.toJSON());
  }
}