<template>
  <div class="yes-no-state">
    <div class="yes-no-state-top text-cartoon">
      <span class="title" v-if="gameState.title != 'unknown'">{{gameState.title}}</span>
      <span class="description" v-html="message"></span>
      <div class="player-list-container" v-if="playerList.length > 0">
        <h3 class="player-list-title" v-if="playerListTitle !== 'unknown'">{{playerListTitle}}</h3>
        <div class="player-list">
          <Player v-for="player in playerList" :key="player.id" :player="player" />
        </div>
      </div>
    </div>
    <div class="yes-no-state-bottom">
      <b-card no-body v-if="allowedVoters.includes(me.id)">
        <b-button-group>
        <b-button  @click="yes()" size="lg" :disabled="answered" variant="good">{{yesText}}</b-button>
        <b-button  @click="no()" size="lg" :disabled="answered" variant="evil">{{noText}}</b-button>
        </b-button-group>
        <b-card-footer><span class="text-muted">{{answers}}/{{totalNeeded}} Votes</span></b-card-footer>
      </b-card>
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
      return this.gameState.allowedVoters.length;
    },
    playerList () {
      return this.gameState.playerList;
    },
    yesText () {
      if (this.gameState.messages.yes) {
        return this.gameState.messages.yes;
      }
      return 'Yes';
    },
    noText () {
      if (this.gameState.messages.no) {
        return this.gameState.messages.no;
      }
      return 'No';
    },
    allowedVoters () {
      return this.gameState.allowedVoters;
    },
    me () {
      return this.$store.state.player;
    },
    playerListTitle () {
      if (this.gameState.messages.playerList) {
        return this.gameState.messages.playerList
      }
      return 'unknown'
    },
    message () {
      if (this.isGameBoard) {
        return this.gameState.messages.screen
      }
      if (this.allowedVoters.includes(this.me.id)) {
         return this.gameState.messages.player
      } else {
        return this.gameState.messages.noVoters
      }
     
    }
  },
  methods: {
    yes () {
      this.answered = true;
      this.$socket.emit('player-yes');
    },
    no () {
      this.answered = true;
      this.$socket.emit('player-no');
    }
  },
  beforeDestroy () {
    this.answered = false;
  }
}
</script>

<style lang="less">
.yes-no-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  .yes-no-state-top {
    display: flex;
    flex-direction: column;
    font-family: 'Anrim';
    padding:12px;
    font-size:1em;
    ul {
      .name {
        font-weight: bold;
      }
    }

    .title {
      font-size:2em;
      font-family: 'Anir';
    }

    .description {
      font-family: 'Adolphus Serif';
      font-size: 1.3em;
    }
  }

  .yes-no-state-bottom {
    font-family: 'Anir';
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    max-height: 35vh;
    .card {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    .btn-group {
      width: 100%;
      max-height: 35vh;
      flex-grow:1;
      display: flex;
      flex-direction: row;
      button {
        flex-grow: 1;
        width: 50%;
        
      }
    }
  }
}
</style>

