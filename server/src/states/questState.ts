import { YesNoState, YesNoMessageTypes } from "./yesNoState";
import { GameState } from "../types";
import Game from "../game";

export class QuestState extends YesNoState {
  init() {
    this.title="Mylord,";
    this.setMessage(YesNoMessageTypes.PLAYER, 'You are on the quest. It\'s on you if this quest succeeds or fails.');
    this.setMessage(YesNoMessageTypes.SCREEN, 'Our brave knights are on their quest. let\'s wait for them to come back');
    this.setMessage(YesNoMessageTypes.NO_VOTERS, 'Our brave knights are on their quest. let\'s wait for them to come back');
    this.setMessage(YesNoMessageTypes.YES, 'Success');
    this.setMessage(YesNoMessageTypes.NO, 'Failure');
    this.allowedVoters = this.game.questPlayers;
    this.playerList = this.game.questPlayers.map(val => this.game.players[val]);
    this.setMessage(YesNoMessageTypes.PLAYER_LIST, 'The elected Adventurers');
    this.state = GameState.QUEST;
  }

  end () {
    let quest = this.game.size.quests[this.game.questWinners.length];
    let result: 'good' | 'evil' = 'evil';
    if (this.votesNo < quest.fails) {
      result = 'good'; 
    }
    this.emit('end', result);
  }
}