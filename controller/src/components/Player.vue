<template>
  <span :class="{['component-player']: true, ['player-inline']: inline}">
    <img v-if="!hideIcon" :src="'/players/' + player.id + '.png'"> <span :class="{['text-muted']:mutedText, ['text-good']:textStyle == 'good', ['text-evil']:textStyle == 'evil'}" v-if="!hideName">{{player.name}}</span>
  </span>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      default: () => {}
    },
    hideName: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    mutedText: {
      type: Boolean,
      default: false
    },
    hideIcon: {
      type: Boolean,
      default: false
    },
    textStyle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less">
.component-player {
   font-weight: bold;
    font-size: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      height: 1.3em;
      padding-right: 0.4em;
    }

    &.player-inline {
      display: inline-flex;
      vertical-align: text-bottom;
    }
}
</style>
