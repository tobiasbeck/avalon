<template>
  <div class="round-counter-container">
    <div class="round-counter">
      <round-counter-round :team="winners[0]" />
      <round-counter-round :team="winners[1]"/>
      <round-counter-round :team="winners[2]"/> 
      <round-counter-round :team="winners[3]"/>
      <round-counter-round :team="winners[4]"/>
    </div>
    <div class="fails">
    {{fails}}/5 Fails
    </div>
  </div>
</template>

<script>
import RoundCounterRound from './roundCounterRound'
export default {
  components: {RoundCounterRound},
  computed: {
    winners () {
      return this.$store.state.game.questWinners;
    },
    fails () {
      return this.$store.state.game.fails;
    }
  }
}
</script>

<style lang="less">
.round-counter-container {
  display: fleX;
  flex-direction: row;
}
  .round-counter {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .fails {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 12px;
  }
</style>
