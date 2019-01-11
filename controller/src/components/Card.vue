<template>
  <div :class="{
    ['component-card']: true,
    ['has-content']: id == false,
    ['red']: isRed,
    ['disabled']: disabled
    }">
    <img v-if="id !== false" :src="'/cards/' + id + '.png'">
    <slot v-if="id === false">
      Empty Card
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: [Object, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    id () {
      if (this.card) {
        return this.card.id
      }
      return false;
    },

    isRed () {
       if (this.card) {
        return this.card.red
      }
      return false;
    }
  }
}
</script>

<style lang="less">
.component-card {
  overflow:hidden;
  border-radius:2vw;
  border: 5px solid;
  border-color:rgb(20,20,20);
  margin-top: 3px;
  margin-bottom: 3px;
  &.has-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  &.red {
    border-color:#CF0000;
  }
  &.disabled {
    opacity: 0.5;
  }
 > img {
   width: 100%;
   transform: scale(1.14);
   object-fit: cover;

 }
}
</style>

