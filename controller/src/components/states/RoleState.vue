<template>
  <div class="role-state">
    <div class="role-state-top text-cartoon">
      <span class="title">{{gameState.title}}</span>
      <div class="role-container">
        <role />
      </div>
       
    </div>
    <div class="role-state-bottom">
      <b-button block @click="yes()" size="lg" :disabled="answered" variant="bronze">Ok ({{answers}}/{{totalNeeded}})</b-button>
    </div>
  </div>
</template>

<script>
import {StateMixin} from '../../mixins/StateMixin.js';
import Role from '../Role';
export default {
  data () {
    return {
      answered: false
    }
  },
  components: { Role },
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
    .role-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    .title {
      text-align: center;
      padding-bottom:1em;
      font-size:2.5em;
      font-family: 'Anir';
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

