<template>
  <div class="board-state">
    <div class="board-state-inner text-cartoon">
      <round-counter :board="true" />
    </div>
  </div>
</template>
<script>
import RoundCounter from '../roundCounter.vue'
export default {
  components: {RoundCounter}
}
</script>

<style lang="less">
.board-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
