

import { GameState } from "../types";
import { EventEmitter } from "events";
import { OkState } from "./okState";
import Player from "../player";

const roleMessages = {
  merlin: '<li><span class="name">Merlin:</span> knows the minions of evil</li>',
  assassin: '<li><span class="name">Assassin:</span> Knows as much as a normal minion of the evil</li>',
  percival: '<li><span class="name">Percival:</span> knows Merlins identity</li>',
  mordred: '<li><span class="name">Morded:</span> Merlin does not know his identity</li>',
  oberon: '<li><span class="name">Oberon:</span> Does not reveal himself to the other evil minions, but also does not know the other evil minions</li>',
  morgana: '<li><span class="name">Morgana:</span> Appears to be Merlin (Also to Percival if he is in the game)</li>',
  minion: '<li><span class="name">Minions of the evil:</span> Know each other</li>',
  servant: '<li><span class="name">Servants:</span> Know nothing.</li>',
}

export class AfterRoleState extends OkState {
  init () {
    this.title = 'unknown'
    this.state = GameState.AFTER_ROLE;
    let players = this.game.players;
    setImmediate(() => {
      this.preText();
      for (let player of players) {
        if (player.character.role == 'merlin') {
          this.setPlayerMessage('<h2 class="sub-title">Dear Merlin,</h2>');
          this.setPlayerListTitle('These are the minions of evil:');
          this.playerList = this.listRoles(['minion', 'assassin', 'morgana'], player);
          player.sendGameState(this);
        }
        if (player.character.role == 'assassin') {
          this.setPlayerMessage('<h2 class="sub-title">Dear Assassin,</h2>');
          this.setPlayerListTitle('These are your evil minion partners:');
          this.playerList = this.listRoles(['minion', 'assassin', 'mordred', 'morgana'], player)
          player.sendGameState(this);
        }
        if (player.character.role == 'percival') {
          this.setPlayerMessage('<h2 class="sub-title">Dear Percival,</h2>');
          this.setPlayerListTitle('This is merlin (and morgana):');
          this.playerList = this.listRoles(['merlin', 'morgana'], player);
          player.sendGameState(this);
        }
        if (player.character.role == 'mordred') {
          this.setPlayerMessage('<h2 class="sub-title"Dear Mordred,<h2>');
          this.setPlayerListTitle('These are your evil minion partners:');
          this.playerList = this.listRoles(['minion', 'assassin', 'mordred', 'morgana'], player);
          player.sendGameState(this);
        }
        if (player.character.role == 'oberon') {
          this.setPlayerMessage('<h2 class="sub-title">Dear Oberon,<h2><h3>Nothing special to report at this point. Just continue.</h3>');
          this.playerList = [];
          player.sendGameState(this);
        }
        if (player.character.role == 'morgana') {
          this.setPlayerMessage('<h2 class="sub-title">Dear Morgana,</h2>');
          this.setPlayerListTitle('These are your evil minion partners:');
          this.playerList = this.listRoles(['minion', 'assassin', 'mordred', 'morgana'], player);
          player.sendGameState(this);
        }
        if (player.character.role == 'minion') {
          this.setPlayerMessage('<h2 class="sub-title">Dear minion of the evil,</h2>');
          this.setPlayerListTitle('These are your evil minion partners:');
          this.playerList = this.listRoles(['minion', 'assassin', 'mordred', 'morgana'], player);
          player.sendGameState(this);
        }
        if (player.character.role == 'servant') {
          this.setPlayerMessage('<h2 class="sub-title">Dear simple servant,</h2><h3>Nothing special to report at this point. Just continue.</h3>');
          this.playerList = [];
          player.sendGameState(this);
        }

      }
    });
  }

  listRoles(roles: Array<string>, player: Player) {
    let out = [];
    for (let i = 0; i < this.game.players.length; i++) {
      let p = this.game.players[i];
      if (roles.includes(p.role) && p.id != player.id) {
        out.push(p);
      }
    }
    return out;
  }

  preText () {
    let text = '<h2 class="sub-title">What other roles get reported:</h2>';
    text += '<ul>';
    console.log(this.game.specialRoles);
    for (let char of this.game.specialRoles) {
      text += roleMessages[char];
    }
    text += roleMessages['minion'];
    text += roleMessages['servant'];
    text += '</ul>';
    this.setAfterPlayerListMessage(text);
    this.setScreenMessage(text);

  }
}