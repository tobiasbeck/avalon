<template>
  <div :class="{['round-counter-round']: true, 'evil': team == 'evil', 'good': team == 'good', ['board-counter-round']: board}">
    <span class="size" v-if="board">{{size.players}}</span>
    <span class="round-fails text-muted" v-if="board && size.fails > 1">{{size.fails}} Fails</span>
  </div>
</template>

<script>
export default {
  props: {
    team: {
      type: String,
      default: ''
    },
    board: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="less">
.round-counter-round {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border:1px black solid;
  width:20px;
  height: 20px;
  border-radius:10px;
  margin:2px;
  transition: background-color 0.4s, border-color 0.4s;
  .size {
    transition: color 0.4s;
    font-size:3em;
  }
  .round-fails {
    font-size: 1.5em;
    line-height: 0em;
  }
  &.board-counter-round {
    width: 140px;
    height: 140px;
    border-radius:75px;
    border-width:4px;
  }

  &.evil {
    background-color: #660000;
    border-color: #660000;
    .size {
      color: white;
    }
  }

  &.good {
    background-color: #228B22;
    border-color: 	#228B22;
    .size {
      color: white;
    }
  }
}
</style>
