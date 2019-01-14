<template>
  <div class="view-game">
    <lobby v-if="gameStateType == 'lobby'"/>
    <my-character @close="showRole = false" v-if="showRole == true" />
    <div class="board-inner-wrapper" v-if="gameStateType !== 'lobby'">
    <board-state v-if="gameState !== 'victory'" />
    <player-list-state v-if="isPlayerList" />
    <quest-result v-if="gameState == 'after_quest'"/>
    <assassin-state v-if="gameState == 'assassin'" />
    <victory-state v-if="gameStateType == 'victory'" :full-height="false" :key="gameStateId" />
    </div>
  </div>
</template>
<script>

import BoardState from '../components/boardStates/boardState'
import PlayerListState from '../components/boardStates/playerListState';
import AssassinState from '../components/boardStates/assassinState';
import QuestResult from '../components/boardStates/questResult';
import VictoryState from '../components/states/VictoryState';
import Lobby from '../components/Lobby';

export default {
  components: {
    Lobby,
    BoardState,
    PlayerListState,
    QuestResult,
    AssassinState,
    VictoryState
  },
  data () {
    return {
      showRole: false
    }
  },
  computed: {
    gameState () {
      if (this.$store.state.game.state !== null && this.$store.state.game.state.state !== null) {
        return this.$store.state.game.state.state;
      }
      return 'unknown';
    },
    gameStateType () {
      if (this.$store.state.game.state !== null && this.$store.state.game.state.type !== null) {
        return this.$store.state.game.state.type;
      }
      return 'unknown'
    },
    gameStateId () {
      if (this.$store.state.game.state !== null && this.$store.state.game.state.id !== null) {
        return this.$store.state.game.state.id;
      }
      return 'unknown'
    },
    isPlayerList () {
      switch (this.gameState) {
        case 'vote':
        case 'choose':
        case 'after_vote':
        case 'quest':
        return true;
      }
      return false;
    }
  },
  
  methods: {
    openRole () {
      this.showRole = true;
    }
  }
}
</script>

<style lang="less">
.view-game {
  height: 100%;
  .board-inner-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .action {
     font-size: 1.5em;
    margin: 0px;
    padding:3vh;
    padding-bottom: 0px;
    font-weight:bold;
    text-align: left;
  }
  .wait-message {
    display: flex;
    flex-directon: column;
    justify-content: center;
    align-items: center;
    padding: 3vh;
    font-size:1.3em;
    font-weight: bold;
    color: white;
    background-color: rgba(0,0,0, 0.8);
    height: 100%;

  }
}
</style>
