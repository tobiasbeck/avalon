
import { GameState } from "../types";
import { EventEmitter } from "events";
import { OkState } from "./okState";

export class WelcomeState extends OkState {
  init () {
    this.title = 'Welcome,'
    this.state = GameState.WELCOME;
    this.setPlayerMessage('to the great Avalon! \n A few hundred years ago mighty knights fought for this land, for glory and freedom. But the evil forces are rising up again, so it is on you: Defend the country from the evil ones or fight in the rows of evil for chaos and destruction. \n What side you play on depends on your role. We will show you your role in a minute, so make sure no one can look at your screen');
    this.setScreenMessage('Follow the instructions on your device!');
  }
}