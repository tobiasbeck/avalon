<template>
  <div class="welcome center-box">
    <div class="text-roll welcome-text center-inner">
    <h1 class="game-title">AVALON</h1>
    <b-alert show variant="danger" v-if="error">{{ error }}</b-alert>
    <b-alert show variant="bronze" v-if="stop">The game was ended early by the leader! Sorry :/</b-alert>
    <b-alert show variant="bronze" v-if="connected === false">Waiting for connection...</b-alert>
    <transition name="fade" mode="out-in">
      <div v-if="mode == 'welcome'" key="welcome_btns">
      <p>Welcome stranger!<br>
      This is a browserbased version of a boardgame called "Avalon" which was made by Indie Board & Card Games. <a href="https://www.ultraboardgames.com/avalon/game-rules.php" target="_blank">Rules</a><br>
      You can play the game here with your fellow adventurers, all you need is a mobile phone, computer or tablet for each player. You can also use an additional device as a gamefield.</p>
      <b-btn variant="bronze" @click="join()" size="lg" :disabled="!connected" block>Join a game</b-btn>
      <b-btn variant="outline-secondary" @click="mode='create'" size="lg" :disabled="!connected" block>Start a new game</b-btn><br><br>
      <b-btn variant="outline-secondary" @click="openRules()" size="lg" block>Read the rules</b-btn><br>
      <p>This project is not associated with Indie Board & Card Games in any way! </p>
      </div>
      <div v-if="mode == 'create'" key="create_btns">
        <p>You decided to create a new game!<br>
        If you play without a separate gamefield select "I'm playing on this device".<br>
        If you want to use a separate gamefield go to this page and click on "This device is used as a gamefield".
       </p>
      <b-btn variant="bronze" @click="mode = 'create_player'" size="lg" :disabled="!connected" block>I'm playing on this device</b-btn>
      <b-btn variant="outline-secondary" @click="create(true)" size="lg" :disabled="!connected" block>This device is used as a gamefield</b-btn>
      <b-btn variant="link" @click="mode='welcome'" size="lg" block>Back</b-btn>
      </div>
      <div v-if="mode == 'create_player'" key="create_player_btns">
      <b-form-input style="margin-bottom: 5%" placeholder="Enter your name" size="lg" v-model="name" ></b-form-input>
      <knight-name :enabled.sync="medievalName" :gender.sync="gender" />
      <b-btn variant="bronze" @click="create(false)" size="lg" :disabled="!connected" block>Create the game</b-btn>
      <b-btn variant="link" @click="mode='welcome'" size="lg" block>Back</b-btn>
      </div>
    </transition>
    </div>
    <div class="version">0.2.0</div>
  </div>
</template>

<script>
import KnightName from '../components/KnightName'
export default {
  components: {
    KnightName
  },
  data () {
    return {
      gameID: '',
      name: '',
      error: false,
      mode: 'welcome',
      medievalName: false,
      gender: 'm',
      stop: false
    }
  },
  created () {
    console.log(this.$route)
    this.stop = (this.$route.params.stop != undefined) ? this.$route.params.stop : false
  },
  computed: {
    gameIDUp: {
      get () {
        return this.gameID.toUpperCase()
      },
      set (value) {
        this.gameID = value.toUpperCase()
      }
    },
    gameIDValid () {
      return this.gameIDUp.length == 4
    },
    nameValid () {
      return this.name.length > 0
    },
    connected () {
      return this.$store.state.connected
    },
    endGame () {
      let winners = this.$store.state.lastRound.winners
      if (winners !== undefined && winners.length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    join () {
      this.$router.push('/join')
    },
    test () {
      this.$router.push('/testboard')
    },
    create (gamefield) {
      if (gamefield == false) {
        this.$store.commit('SET_PLAYER_LEADER', true)
      }
      this.$socket.emit('game-create', { gamefield: gamefield, name: this.name, knightName: this.medievalName, gender: this.gender }, (result) => {
        this.$store.commit('SET_GAME_ID', result.id)
        if (result.me !== false) {
          this.$store.dispatch('after_login', result.me)
        }
        if (gamefield == false) {
          this.$router.push('/game')
        } else {
          this.$router.push('/board')
        }
      })
    },
    openRules() {
      window.open('https://www.ultraboardgames.com/avalon/game-rules.php', '_blank');
    }
  }
}
</script>

<style lang="less">

</style>
