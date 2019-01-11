<template>
  <div class="login center-box">
    <div class="center-inner text-roll">
    <h1 class="game-title">Avalon</h1>
    <b-alert show variant="danger" v-if="error">{{ error }}</b-alert>
    <b-alert show variant="info" v-if="connected === false">Waiting for connection...</b-alert>
    <b-form-input placeholder="Enter Game ID" size="lg" class="readable-font" v-model="gameIDUp" maxlength="4" ></b-form-input>
    <b-form-input placeholder="Enter your Name" size="lg" v-model="name" :disabled="gameID.length < 4" ></b-form-input>
    <b-btn variant="bronze" @click="login()" size="lg" :disabled="!canJoin" block>Join</b-btn>
    <b-btn variant="link" @click="back()" size="lg" :disabled="!connected" block>Back</b-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gameID: '',
      name: '',
      error: false,
    }
  },
  computed: {
    gameIDUp: {
      get () {
        return this.gameID.toUpperCase();
      },
      set (value) {
        this.gameID = value.toUpperCase();
      }
    },
    gameIDValid () {
      return this.gameIDUp.length == 4
    },
    nameValid () {
      return this.name.length > 0
    },
    canJoin () {
      return this.gameIDValid && this.nameValid
    },
    connected () {
     return this.$store.state.connected;
    },
    endGame () {
      let winners = this.$store.state.lastRound.winners
      if (winners !== undefined && winners.length > 0) {
        return true;
      }
      return false;
    }
  },
  methods: {
    login() {
      
      this.$socket.emit('game-join', {
        game: this.gameIDUp,
        name: this.name,
      }, (result) => {
        if (!result.success) {
          this.error = result.message
        } else {
          this.$store.commit('SET_GAME_ID', this.gameIDUp);
          this.$store.dispatch('after_login', result.result)
          this.$router.push('/game');
        }
      });
    },
    back() {
      this.$router.push('/');
    }
  }
}
</script>

<style lang="less">
.login {
  .version {
    position: fixed;
    right: 12vw;
    bottom: 6vw;
  }
  .form-control {
    &:first-of-type {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      border-bottom-width: 0px;
      margin-top:5%;
    }

    &:last-of-type {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      margin-bottom:5%;
    }
  }
  .readable-font {
    color: black;
      font-size: 1.2em;
      font-family: 'PT Mono', Arial; 
    }
}
</style>
