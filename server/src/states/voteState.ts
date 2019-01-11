import { YesNoState, YesNoMessageTypes } from "./yesNoState";
import { GameState } from "../types";

export class VoteState extends YesNoState {
  init() {
    this.title="Mylord,"
    this.setMessage(YesNoMessageTypes.PLAYER, 'Please tell us, <br> do you want that these brave people go for us on this dangerous quest?');
    this.setMessage(YesNoMessageTypes.SCREEN, 'Follow the instructions on your device');
    this.playerList = this.generatePlayerList();
    this.allowedVoters = this.game.players.map(val => val.id);
    this.state = GameState.VOTE;
  }

  end () {
    let yesOverNo = this.votesYes / (this.votesYes + this.votesNo);

    let result: 'failure' | 'success' = 'failure';
    console.log('failure');
    console.log(this.votesYes,this.votesNo, yesOverNo);
    if (yesOverNo > 0.5) {
      result = 'success'; 
      console.log('success');
    }
    this.emit('end', result);
  }

  generatePlayerList () {
    let list = [];
    for(let id of this.game.questPlayers) {
      list.push(this.game.players[id]);
    }
    return list;
  }
}