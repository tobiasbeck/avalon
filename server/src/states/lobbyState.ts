import { Character } from './../types';
import { CHARACTERS } from './../const';
import { State } from "./state";
import { GameState } from "../types";
import Player from '../player';

export class LobbyState extends State {
  private allRoles: Array<Character>;
  private enabledRoles: Array<string>;
  init () {
    this.state = GameState.LOBBY;
    this.type = 'lobby'
    this.allRoles = this.getSpecialRoles()
    this.enabledRoles = [];
  }

  get answers () {
    return 0;
  }

  toJSON () {
    let data = {
      allRoles: this.allRoles,
      enabledRoles: this.enabledRoles
    };
    return Object.assign({}, super.toJSON(), data);
  }

  choose (player:Player, data:any) {
    if (this.enabledRoles.includes(data.character)) {
        let position = this.enabledRoles.indexOf(data.character);
        this.enabledRoles.splice(position, 1);
    } else {
        this.enabledRoles.push(data.character);
    }
    this.game.gameSocket.sendGameState(this);
  }

  getSpecialRoles() {
    let specialRoles = [];
    for(let char of CHARACTERS) {
      if (char.special !== false) {
        specialRoles.push(char);
      }
    }
    return specialRoles;
  }

  end () {
    this.game.specialRoles = this.enabledRoles;
  }
}