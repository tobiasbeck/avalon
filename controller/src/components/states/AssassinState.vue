<template>
  <div class="assassin-state">
    <div class="state-top text-cartoon">
      <h2 class="sub-title">{{gameState.title}}</h2>
      <span class="description">The time has come, and our kingdom is nearly safe! But there are betrayers in our lines!<br>
 They have sent <player :inline="true" :player="king"/> to kill Merlin and to cross trough our plans! If they manage to kill Merlin the betrayer win!</span>

    <div class="player-list-container player-list-evil" v-if="evil.length > 0">
      <h3 class="player-list-title">The betrayers:</h3>
        <div class="player-list" v-if="evil.length > 0">
        <Player v-for="player in evil" :key="player.id" :player="player" />
        </div>
      </div>
      <div class="player-list" v-if="playerList.length > 0">
        <b-button block v-for="player in playerList" @click="choose(player)" :key="player.id" :variant="choosen.includes(player.id)? 'primary' : 'secondary'"><Player :player="player" /></b-button>
      </div>
    </div>
    <div class="assassin-state-bottom">
      <b-button block @click="yes()" size="lg" v-if="isKing" :disabled="!full" variant="evil">Kill that player ({{answers}}/{{totalNeeded}})</b-button>
    </div>
  </div>
</template>

<script>
import {StateMixin} from '../../mixins/StateMixin.js';
import Player from '../Player'
export default {
  mixins: [StateMixin],
  components: {
    Player
  },
  computed: {
    answers () {
      return this.$store.state.game.currentAccepted
    },
    totalNeeded () {
      return this.$store.state.game.state.maxChoosen
    },
    playerList () {
      return this.gameState.playerList;
    },
    evil () {
      return this.gameState.evil;
    },
    choosen () {
      return this.gameState.choosen;
    },
    king () {
      return this.gameState.choosingPlayer;
    },
    me () {
      return this.$store.state.player;
    },
    isKing () {
      return this.gameState.choosingPlayer.id == this.$store.state.player.id;
    },
    message () {
      if (this.isGameBoard) {
        return this.gameState.messages.screen
      }
      return this.gameState.messages.player
    },
    full() {
      if(this.choosen.length >= this.totalNeeded) {
        return true;
      }
      return false;
    }
  },
  methods: {
    yes () {
      this.answered = true;
      this.$socket.emit('player-yes');
    },
    choose (player) {
      if (this.isKing) {
        let newC = this.choosen.splice(0);
        console.log(newC);
        console.log(this.totalNeeded);
        console.log(newC < this.totalNeeded);
        if (!newC.includes(player.id)) {
          if (newC.length < this.totalNeeded) {
            newC.push(player.id);
          }
        } else {
          newC.splice(newC.indexOf(player.id), 1);
        }
        this.$socket.emit('player-choose', newC);
      }
    }
  }
}
</script>

<style lang="less">
.assassin-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
        
  padding: 20px;
  .player-list-evil {
    margin-bottom:25px;
  }
}
</style>

