<template>
  <div class="end">
    <h1 v-if="lastPos == 1">Congratulations!</h1>
    <h1 v-if="lastPos <= 3 && lastPos !== 1">Awesome!</h1>
    <h1 v-if="lastPos > 3">Cool!</h1>
    <div class="trophy">
      You are
      <img v-if="lastPos == 1" src="../assets/004-first.svg">
      <img v-if="lastPos == 2" src="../assets/002-second.svg">
      <img v-if="lastPos == 3" src="../assets/003-third.svg">
      <span v-if="lastPos > 3">{{lastPos}}<sup>th</sup></span>
    </div>
    <div class="points">
      <span class="points-sum">Your points: {{lastPoints}}</span>
      <span class="message">{{posMessage}}</span>
    </div>
    <b-button @click="nextGame()">Play another game</b-button>
  </div>
</template>

<script>
export default {
  computed: {
    lastPoints () {
      //return 20;
      return this.$store.state.lastRound.points;
    },
    posMessage () {
      switch (this.lastPos) {
        case 1:
          return 'Your friends think you\'re pretty funny!'
        case 2:
          return 'There is still one who\'s better than you are!'
        case 3:
          return 'At least you made it to the podium!'
        case 4:
          return 'Aww so close.. try harder next time!'
        case 5:
          return 'You\'re just average!'
        case 6:
          return 'Try harder next time!'
        case 7:
          return 'This is nothing you should say out loud!'
        case 8:
          return 'Yea we all have been to this poins already... not'
        case 9:
          return 'This place is just not worth talking about'
        case 10:
          return 'Even your grandma is better in this game!'
        default: 
          return 'How is this even possible????'
      }
    },
    lastPos () {
      //return 2;
      let positions = this.$store.state.lastRound.winners
      let me = this.$store.state.lastRound.id;
      let mypos = -1;
      for (let positionId in positions) {
        let position = positions[positionId]
        for (let player of position) {
          if(me == player.id ) {
            mypos = positionId
            return parseInt(mypos, 10) + 1;
          }
        }
      }
      return mypos
    }
  },
  methods: {
    nextGame () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.end {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-left:12vw;
  padding-right: 12vw;
  .trophy {
    display: flex;
    flex-direction: column;
    font-size:1.2em;
    img, span {
      height: 1.8em;
      font-size:3.8em;
      color: lighten(#2c3e50, 25%);
    }
  }
  .points {
    font-size:1.2em;
    .points-sum {
      color: lighten(#2c3e50, 25%);
    }
    .message {
      display: block;
    }
  }
}
</style>
