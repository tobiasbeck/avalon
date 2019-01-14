<template>
  <div class="view-game">
    <lobby v-if="gameStateType == 'lobby'"/>
    <my-character @close="showRole = false" v-if="showRole == true" />
    <game-header @open-role="openRole()" v-if="gameStateType !== 'lobby'" />
    <div class="game-inner-wrapper" v-if="gameStateType !== 'lobby'">
    <div class="game-inner">
    <ok-state v-if="gameStateType == 'ok'" :key="gameStateId" />
    <yes-no-state v-if="gameStateType == 'yesNo'" :key="gameStateId" />
    <role-state v-if="gameStateType == 'role'" :key="gameStateId" />
    <choose-state v-if="gameStateType == 'choose'" :key="gameStateId" />
    <assassin-state v-if="gameStateType == 'assassin'" :key="gameStateId" />
    <after-quest-state v-if="gameStateType == 'after_quest'" :key="gameStateId" />
    <victory-state v-if="gameStateType == 'victory'" :key="gameStateId" />
    </div>
    </div>
  </div>
</template>
<script>
import GameHeader from '../components/GameHeader';
import OkState from '../components/states/OkState';
import YesNoState from '../components/states/YesNoState';
import AfterQuestState from '../components/states/AfterQuestState';
import RoleState from '../components/states/RoleState';
import ChooseState from '../components/states/ChooseState';
import AssassinState from '../components/states/AssassinState';
import VictoryState from '../components/states/VictoryState';
import MyCharacter from '../components/myCharacter'

import Lobby from '../components/Lobby';
export default {
  components: {
    GameHeader,
    Lobby,
    OkState,
    RoleState,
    ChooseState,
    AssassinState,
    YesNoState,
    VictoryState,
    AfterQuestState,
    MyCharacter
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
  .game-inner-wrapper {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .game-inner {
    height: 100%;
    padding-bottom: 32px;
    flex-shrink: 1;
    flex-grow: 1;
    max-width: 900px;
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
