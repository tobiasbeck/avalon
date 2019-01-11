import Player from "./player";
import Game from "./game";

export type Character = {
  role: string,
  name: string,
  description: string,
  team: 'good' | 'evil' ,
  special: string | false,
  default?: true,
}

export type GameRejoins  = {
  [key:string]: Player;
}

export type GameList = {
  [key:string]: Game;
}

export type GameSize = {
  evils: number,
  quests: Array<Quest>
}

export type Quest = {
  players: number,
  fails:number;
}

export enum GameState {
  LOBBY = 'lobby',
  WELCOME = 'welcome',
  ROLE = 'role',
  AFTER_ROLE = 'after_role',
  PRE_ROUND = 'pre_round',
  CHOOSE = 'choose',
  VOTE = 'vote',
  AFTER_VOTE = 'after_vote',
  QUEST = 'quest',
  AFTER_QUEST = 'after_quest',
  ASSASSIN = 'assassin',
  VICTORY = 'victory'
};