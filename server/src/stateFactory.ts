import { VictoryState } from './states/victoryState';
import { AssassinState } from './states/assassinState';
import { AfterQuestState } from './states/afterQuestState';
import { QuestState } from './states/questState';
import { AfterVoteState } from './states/afterVoteState';
import { VoteState } from './states/voteState';
import { PreroundState } from './states/preroundState';
import { AfterRoleState } from './states/afterRoleState';
import { WelcomeState } from './states/welcomeState';
import { GameState } from './types';
import Game from './game';
import { RoleState } from './states/roleState';
import { ChooseState } from './states/chooseState';
export class StateFactory {
  static getState(lastState: GameState, game: Game) {
    switch(lastState) {
      case GameState.LOBBY: 
        return new WelcomeState(game);
      case GameState.WELCOME: 
        return new RoleState(game);
      case GameState.ROLE:
        return new AfterRoleState(game);
      case GameState.AFTER_ROLE:
        return new ChooseState(game);
      case GameState.CHOOSE:
        return new VoteState(game);
      case GameState.VOTE:
        return new AfterVoteState(game);
      case GameState.AFTER_VOTE:
        if (game.fails >= 5) {
          game.lastStateResult = 'evil';
          return new VictoryState(game);
        } 
        if (game.lastStateResult == 'failure') {
          return new ChooseState(game);
        } else {
          return new QuestState(game);
        }
        break;
      case GameState.QUEST:
        return new AfterQuestState(game);
      case GameState.AFTER_QUEST:
        if (game.questWinners.filter(win => win==='evil').length >= 3 ) {
          game.lastStateResult = 'evil';
          return new VictoryState(game);
        } else if  (game.questWinners.filter(win => win === 'good').length >= 3 ) {
          return new AssassinState(game);
        } else {
          return new ChooseState(game);
        }
        case GameState.ASSASSIN:
          return new VictoryState(game);

    }
  }
}