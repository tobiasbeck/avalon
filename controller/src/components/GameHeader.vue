<template>
  <div class="game-header">
    <div class="game-header-top">
    <player :player="player" :hide-name="true" />
    <round-counter />
    <b-button @click="openCharacter()">My character</b-button>
    </div>
  </div>
</template>

<script>
import Player from './Player'
import RoundCounter from './roundCounter'
export default {
  components: {
    Player,
    RoundCounter
  },
  computed: {
    player () {
      return this.$store.state.player
    },
    gameState () {
      return this.$store.state.game.state;
    },
    actionMessage () {
      return 'Please wait...';
    }
  },
  methods: {
    openCharacter() {
      this.$emit('open-role');
    }
  }
}
</script>

<style lang="less">
.game-header {
  z-index: 3;
  position: fixed;
  white-space: nowrap;
  left: 0px;
  right: 0px;
  bottom:0px;
  height: 42px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  align-items: stretch;
  background-color: darken(#FFFFFF, 5%);
  border-top: 1px black solid;
  .game-header-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
      padding: 4px;
   button {
     margin: 0px;
     padding-top:4px;
     padding-bottom:4px;
   }
    > span {
    font-weight: bold;
    font-size: 1.4em;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      height: 1.3em;
      padding-right: 0.4em;
    }
  }
  }
}
</style>
