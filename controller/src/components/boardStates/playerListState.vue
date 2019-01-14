<template>
  <div class="board-player-list-state">
    <div class="board-player-list-state-inner text-cartoon">
      <div class="player-list-container" >
        <h3 class="player-list-title" v-if="title" v-html="title"></h3>
        <div :class="{['player-list']: true, ['single']: playerList.length == 1}" v-if="playerList.length > 0">
          <Player v-for="player in playerList" :text-style="playerStyle[player.id]" :key="player.id" :player="player" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {StateMixin} from '../../mixins/StateMixin.js';
import Player from '../Player';
export default {
  components: {
    Player
  },
  mixins: [
    StateMixin
  ],
  computed: {
    playerList () {
      if (!this.useChoosen) {
        if (this.gameState.playerList) {
          return this.gameState.playerList
        }
        return [];
      } else {
        if (this.gameState.choosen) {
          return this.gameState.choosen.map(val => {
            return this.gameState.playerList.find(p => p.id == val);
          })
        }
        return [];
      }
    },
    players () {
      return this.$store.state.game.players;
    },
    playerStyle () {
      if (this.gameState.playerStyle) {
        return this.gameState.playerStyle
      }
      return [];
    },
    useChoosen () {
      if (this.gameStateState =='choose') {
        return true;
      }
      return false;
    },
    title () {
      switch(this.gameStateState) {
        case 'vote':
          return 'Quest-team to vote for'
         case 'choose':
          return 'By King chosen People going on a quest'
        case 'after_vote':
          return 'Vote Result'
        case 'quest':
          return 'People on the quest'
      }
      return undefined;
    }
  }
}
</script>

<style lang="less">
.board-player-list-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top:20px;
  align-items: center;
  max-width: 700px;
  font-size: 1.4em;
}
</style>
