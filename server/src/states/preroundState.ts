import { GameState } from './../types';
import { OkState } from "./okState";
import Player from '../player';

export class PreroundState extends OkState {
  init () {
    this.title = 'Wait...';
    this.state = GameState.PRE_ROUND;
    this.type = 'ok';
    this.setPlayerMessage('Wait...');
    this.setScreenMessage('Follow the instructions on your device!');
    
    
  }

 
}