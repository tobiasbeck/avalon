<template>
  <div :class="{['round-counter-round']: true, 'evil': team == 'evil', 'good': team == 'good'}">
  </div>
</template>

<script>
export default {
  props: {
    team: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less">
.round-counter-round {
  border:1px black solid;
  width:20px;
  height: 20px;
  border-radius:10px;
  margin:2px;
  transition: background-color 0.4s, border-color 0.4s;

  &.evil {
    background-color: #660000;
    border-color: #660000;
  }

  &.good {
    background-color: #228B22;
    border-color: 	#228B22;
  }
}
</style>
