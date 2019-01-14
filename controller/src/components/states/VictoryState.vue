<template>
  <div :class="{['victory-state']: true, ['full-height']: fullHeight}">
    <div class="victory-state-top text-roll">
      <img class="victory-icon" :src="'/icons/' + gameState.icon + '.svg'">
      <span class="description" v-html="message"></span>
    </div>
  </div>
</template>

<script>
import {StateMixin} from '../../mixins/StateMixin.js';
import Player from '../Player'
export default {
  props: {
    fullHeight: {
      type: Boolean,
      default: true
    }
  },
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
    message () {
      if (this.isGameBoard) {
        return this.gameState.messages.screen
      }
      return this.gameState.messages.player
    }
  },
  beforeDestroy () {
    this.answered = false;
  }
}
</script>

<style lang="less">
.victory-state {
  &.full-height {
    height: 100%;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  .victory-state-top {
    display: flex;
    align-items: center;
    flex-direction: column;
    height:auto;



    font-family: 'Anrim';
    padding:12px;
    font-size:1em;
    .victory-icon {
      max-height: 30vh;
    }
    ul {
      .name {
        font-weight: bold;
      }
    }

    .title {
      font-size:3.2em;
      font-family: 'Anir';
    }

    .description {
      font-family: 'Adolphus Serif';
      font-size: 1.3em;
    }
  }

  .victory-state-bottom {
    font-family: 'Anir';
  }
}
</style>

