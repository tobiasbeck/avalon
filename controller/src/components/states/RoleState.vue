<template>
  <div class="role-state">
    <text-container class="role-state-top state-top" type="roll">
      <span class="title">{{gameState.title}}</span>
      <div class="role-container">
        <role v-if="roleHidden == false " />
        <p v-if="roleHidden == true ">You have already clicked Ok and therefore hidden your role, but you can still see it again by clicking on the <strong>My Character</strong> button on bottom</p>
      </div>
       
    </text-container>
    <div class="role-state-bottom">
      <b-button block @click="yes()" size="lg" :disabled="answered" variant="bronze">Ok ({{answers}}/{{totalNeeded}})</b-button>
    </div>
  </div>
</template>

<script>
import {StateMixin} from '../../mixins/StateMixin.js';
import TextContainer from '../TextContainer';
import Role from '../Role';
export default {
  data () {
    return {
      answered: false,
      roleHidden: false
    }
  },
  components: { Role, TextContainer },
  mixins: [StateMixin],
  computed: {
    answers () {
      return this.$store.state.game.currentAccepted
    },
    totalNeeded () {
      return this.$store.state.game.players.length
    },
    role () {
      return this.$store.state.player.role
    },
    message () {
      if (this.isGameBoard) {
        return this.gameState.messages.screen
      }
      return this.gameState.messages.player
    }
  },
  methods: {
    yes () {
      this.answered = true;
      this.roleHidden = true;
      this.$socket.emit('player-yes');
    }
  },
    beforeDestroy () {
    this.answered = false;
  }
}
</script>

<style lang="less">
.role-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  .role-state-top {
    display: flex;
    flex-direction: column;
    font-family: 'Anrim';
    padding:12px;
    font-size:1em;
    overflow:auto;
    overflow-x: hidden;
    .title {
      text-align: center;
    }
    .role-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      p {
        font-family: 'Adolphus Serif';
      }
    }
    
    .description {
      font-family: 'Anir';
    }
  }

  .role-state-bottom {
    font-family: 'Anir';
  }
}
</style>

