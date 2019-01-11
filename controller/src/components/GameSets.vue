<template>
  <div class="game-sets">
    <h1 class="action">Combinations:</h1>
    <card-popup :open="open" :isSet="true" :set="selectedSet" @yes="yes()" @no="no()" />
    <game-set v-for="(set, id) in sets" :key="id" :set="set" @click.native="selectSet(set)" />
  </div>
</template>

<script>
import GameSet from './GameSet'
import CardPopup from './CardPopup'
export default {
  components: {
    GameSet,
    CardPopup
  },
  data () {
    return {
      selectedSet: {},
      open: false
    }
  },
  computed: {
    id () {
      return this.$store.state.player.id;
    },
    sets () {
      return this.$store.state.game.sets.filter((value) => value.player.id !== this.id)
    }
  },
   methods: {
    selectSet (set) {
      this.selectedSet = set;
      this.open = true;
    },
    no() {
      this.open = false;
    },
    yes() {
      //Chose card and send it!;
      this.$store.dispatch('choose_set', this.selectedSet);
      this.open = false;
    }
  }
}
</script>

<style lang="less">

</style>

