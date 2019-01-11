<template>
  <div class="ok-state">
    <div class="state-top text-cartoon">
      <h1 class="title" v-if="gameState.title != 'unknown'">{{gameState.title}}</h1>
      <span class="description" v-html="message"></span>

      <div class="player-list-container" v-if="playerList.length > 0">
        <h3 class="player-list-title" v-if="playerListTitle" v-html="playerListTitle"></h3>
        <div :class="{['player-list']: true, ['single']: playerList.length == 1}" v-if="playerList.length > 0">
          <Player v-for="player in playerList" :text-style="playerStyle[player.id]" :key="player.id" :player="player" />
        </div>
      </div>
      <span class="after-description description" v-html="messageAfter"></span>
    </div>
    <div class="state-bottom">
      <b-button block @click="yes()" size="lg" :disabled="answered" variant="bronze">{{ok}} ({{answers}}/{{totalNeeded}})</b-button>
    </div>
  </div>
</template>

<script>
import {StateMixin} from '../../mixins/StateMixin.js';
import Player from '../Player'
export default {
  data () {
    return {
      answered: false
    }
  },
  mixins: [StateMixin],
  components: {
    Player
  },
  computed: {
    answers () {
      return this.$store.state.game.currentAccepted
    },
    totalNeeded () {
      return this.$store.state.game.players.length
    },
    playerList () {
      return this.gameState.playerList;
    },
    playerStyle () {
      return this.gameState.playerStyle;
    },
    playerListTitle () {
      return this.gameState.messages.playerList;
    },
    ok () {
      if (this.gameState.messages.ok) {
        return this.gameState.messages.ok
      }
      return 'I understand';
    },
    message () {
      if (this.isGameBoard) {
        return this.gameState.messages.screen
      }
      return this.gameState.messages.player
    },
    messageAfter () {
      if (!this.isGameBoard) {
        return this.gameState.messages.after
      }
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
.ok-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  .ok-state-bottom {
    font-family: 'Anir';
  }
  
  .after-description {
    margin-top:0.8em;
  }
}
</style>

