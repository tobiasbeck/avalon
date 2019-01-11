<template>
  <div class="my-character-overlay">
    <div class="my-character-top">
    <div class="character-roll text-roll">
      <role />
    </div>
    </div>
    <b-button size="lg" style="flex-shrink: 0;" variant="bronze" class="close-btn" block @click="$emit('close')">Close</b-button>
  </div>
</template>

<script>
import Role from './Role';
export default {
  components: {Role}
}
</script>

<style lang="less">
.my-character-overlay {
  overflow: hidden;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color:rgba(0,0,0,0.8);
  z-index: 4;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  .my-character-top {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
  .character-roll {
    flex-grow: 0;
  }
  .close-btn {
    border-radius: 0px;
  }
}
</style>
