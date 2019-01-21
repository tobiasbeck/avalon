<template>
  <div :class="{['round-counter-container']: true, ['board-counter-container']: board}">
    <div :class="{['round-counter']: true, ['board-counter']: board}">
      <round-counter-round :board="board" :team="winners[0]" :size="size.quests[0]" />
      <round-counter-round :board="board" :team="winners[1]" :size="size.quests[1]"/>
      <round-counter-round :board="board" :team="winners[2]" :size="size.quests[2]"/> 
      <round-counter-round :board="board" :team="winners[3]" :size="size.quests[3]"/>
      <round-counter-round :board="board" :team="winners[4]" :size="size.quests[4]"/>
    </div>
    <div class="fails">
    {{fails}}/5 Fails
    </div>
  </div>
</template>

<script>
import RoundCounterRound from './roundCounterRound'
export default {
  props: {
    board: {
      type: Boolean,
      default: false
    }
  },
  components: {RoundCounterRound},
  computed: {
    winners () {
      return this.$store.state.game.questWinners;
    },
    fails () {
      return this.$store.state.game.fails;
    },
    size () {
      return this.$store.state.game.size;
    }
  }
}
</script>

<style lang="less">
.round-counter-container {
  display: fleX;
  flex-direction: row;
  &.board-counter-container {
    flex-direction: column;
    .fails {
      font-size:3em;
      justify-content: center;
      padding: 0px;
    }
  }
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
