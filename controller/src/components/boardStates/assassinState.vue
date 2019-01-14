<template>
  <div class="board-assassin-state">
    <div class="state-top text-cartoon">
    <div class="player-list-container board-assassin-lists" v-if="evil.length > 0">
      <div class="assassin">
      <h3 class="player-list-title">
      The Assassin:
      </h3>
      <player :inline="true" :player="king"/>
      </div>
      <div>
      <h3 class="player-list-title">The betrayers:</h3>
        <div class="player-list" v-if="evil.length > 0">
        <Player v-for="player in evil" :key="player.id" :player="player" />
        </div>
      </div>
      <div>
        <h3 class="player-list-title">Choosen to kill:</h3>
      <div class="player-list" v-if="playerList.length > 0">
        <b-button block v-for="player in playerList" :disabled="!isKing" @click="choose(player)" :key="player.id" :variant="choosen.includes(player.id)? 'bronze' : 'secondary'"><Player :player="player" /></b-button>
      </div>
      </div>
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
.board-assassin-lists {
  display: flex;
  flex-direction: row;
  > div {
    margin: 20px;
    &.assassin {
      .component-player {
        font-size:1.2em;
      }
    }
    h3 {
      font-size:1.5em !important;
      margin-bottom:12px !important;
    }
  }
  
}
</style>

