<template>
<div class="page-lobby">
  <character-overlay v-if="charOverlay" :enabled-roles="enabledRoles" @close="charOverlay = false" @update="toggleRole($event)" />
  <div class="lobby-top text-cartoon">
    <h1>Lobby:</h1>
    <p  v-if="!isScreen">Game ID: <span class="readable-font">{{gameId}}</span> </p>
    <div class="lobby-head">
      <div class="lobby-head-left" v-if="isScreen">
        <p>Go to: <span class="readable-font">https://avalon.tobibeck.io</span></p>
        <p>Enter Game ID: <span class="readable-font">{{gameId}}</span> </p>
      </div>
      <div>
        <div class="lobby-head-right">
          <b-button variant="secondary" @click="openCharacters()" >Characters</b-button>
        </div>
      </div>
    </div>
    <div class="players">
      <player v-for="(player) in players" :key="player.id" :player="player" />
      <template v-if="players.length < 10">
        <player v-for="(i) in 10-players.length" :key="'empty-' + i" :muted-text="true" :player="{id: -1, name: '_____'}" />
      </template>
    </div>
  </div>
  <div class="lobby-bottom">
    <b-button variant="bronze" @click="startGame()" v-if="me.gameLeader == true" size="lg" block :disabled="!enableStart">
      <span v-if="players.length >= requiredPlayers && enableStart && me.gameLeader == true">Start</span>
        <span v-if="players.length < requiredPlayers" >Minimum {{requiredPlayers}}
        players</span>
         ({{players.length}} / {{maximumPlayers}} Players)</b-button>
  </div>
</div>
</template>

<script>
import CharacterOverlay from '../components/CharacterOverlay';
import { TweenLite } from 'gsap';
import {IsScreenMixin} from '../mixins/IsScreenMixin.js';
import Player from '../components/Player'
export default {
  components: {
    CharacterOverlay,
    Player
  },
  data () {
    return {
      requiredPlayers: 5,
      maximumPlayers: 10,
      charOverlay: false
    }
  },
  mixins: [IsScreenMixin],
  computed: {
    gameId () {
      return this.$store.state.game.id
    },
    enableStart () {
      if (this.$store.state.player.gameLeader == false) {
        return false;
      }
      if (this.players.length < this.requiredPlayers) {
        return false;
      }

      return true;
    },
    players () {
      return this.$store.state.game.players.filter(val => !(val.id === undefined))
    },
    me () {
      return this.$store.state.player
    },
    enabledRoles () {
      return this.$store.state.settings.enabledRoles
    }
  },
  methods: {
    startGame () {
      //this.$store.commit('SET_VARIANTS', this.variants);
      this.$socket.emit('game-start');
      //this.$store.dispatch('set_app_state', 'game')
    },
    openCharacters () {
      this.charOverlay = true;
    },
    toggleRole(role) {
      this.$socket.emit('settings-character', {character: role});
    }
  }
}
</script>

<style lang="less">
.page-lobby {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    padding: 12px;
    height: 100%;
    padding-bottom:32px;

    .lobby-top {
      max-width: 600px;
    }

  .lobby-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    .lobby-head-left {
      font-size:1.4em;
    }

    .lobby-head-right {
      .round-selecter {
        white-space: nowrap;
        display: flex;
        flex-directon: row;
        justify-content: flex-end;
        .voting {
          margin-right: 2%;
        }
        font-size:2em;
        .rounds {
          margin-left: 1vw;
          margin-right: 1vw;
        }
        margin-bottom:0.2em;
      }
      .variants {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        flex-wrap:wrap;
        button {
          margin: 1%;
          margin-right: 0px;
          &:last-child {
            margin-right: 0px;
          }
        }
      }
    }
  }
  .players {
    display: flex;
    flex-direction: row;
    padding: 0px;
    margin: 0px;
    list-style: none;
    text-align: left;
    font-weight: bold;
    flex-wrap: wrap;
    span {
      font-size:1.2em;
      padding:3px;
      min-width: 33%;
      flex-grow: 1;

    }
    img {
      height: 1.7em;
      padding-right :0.2em;
    }
  }
  .readable-font {
    color: black;
      font-size: 1.2em;
      font-family: 'PT Mono', Arial;
      padding: 1vw;
  }

  .lobby-bottom {
    max-width: 600px;
    button {
    }
  }
}
</style>
