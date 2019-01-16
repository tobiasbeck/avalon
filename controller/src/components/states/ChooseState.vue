<template>
  <div class="choose-state">
    <div class="choose-state-top text-cartoon">
      <span class="title" v-if="gameState.title != 'unknown'">{{gameState.title}}</span>
      <span class="description">Could you, <player :player="king" :inline="true"/> our allmighty king, choose a group of brave people that are worth going to the quest?</span>
      <div class="player-list-container">
      <div class="player-list choose" v-if="playerList.length > 0">
        <b-button block v-for="player in playerList" @click="choose(player)" :key="player.id" :disabled="!isKing" :variant="choosen.includes(player.id)? 'bronze' : 'secondary'"><Player :player="player" /></b-button>
      </div>
      </div>
    </div>
    <div class="choose-state-bottom">
      <b-button block @click="yes()" size="lg" class="btn-wrap" v-if="isKing" :disabled="!full" variant="bronze">Send these on a quest ({{answers}}/{{totalNeeded}})</b-button>
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
    choosen () {
      return this.gameState.choosen;
    },
    king () {
      return this.gameState.choosingPlayer;
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
.choose-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  .choose-state-top {
    display: flex;
    flex-direction: column;
    font-family: 'Anrim';
    padding:12px;
    font-size:1em;
    overflow:hidden;
    ul {
      .name {
        font-weight: bold;
      }
    }

    .title {
      font-size:1.2em;
      font-family: 'Anir';
    }

    .description {
      font-family: 'Adolphus Serif';
      font-size: 1.3em;
    }
  }

  .choose-state-bottom {
    font-family: 'Anir';
  }
}
</style>

