<template>
<transition name="fade">
  <div v-if="open && isSet == false" class="card-popup">
    <transition name="fade" mode="out-in" :duration="400">
      <h1 class="action" v-if="!selectPosition" key="choose-title">Choose this card?</h1>
      <h1 class="action" v-if="selectPosition" key="choose-position">Play this as first or second card?</h1>
    </transition>
    <card :card="card" />
    <transition name="fade" class="action-button" mode="out-in" :duration="400">
      <b-button-group v-if="!selectPosition" class="action-button"  key="choose-card-butons">
        <b-button block size="lg" variant="danger" @click="no()" class="no">Noo!</b-button>
        <b-button block size="lg" variant="success" @click="yes()" class="yes">Yes!</b-button>
      </b-button-group>
      <div v-if="selectPosition" class="action-button position-select" key="choose-position-buttons">
      <b-button-group class="action-button-inner" >
        <b-button block size="lg" @click="first()" variant="info" class="first">as first</b-button>
        <b-button block size="lg" @click="second()" variant="primary" class="second">as second</b-button>
      </b-button-group>
      <b-button block size="lg" variant="danger" @click="no()" class="no">Choose different Card</b-button>
      </div>
    </transition>
  </div>
  <div v-if="open && isSet == true" class="card-popup">
    <h1 class="action">Choose this Set?</h1>
    <game-set :set="set" />
    <b-button-group class="action-button">
      <b-button block size="lg" variant="danger" @click="no()" class="no">Noo!</b-button>
      <b-button block size="lg" variant="success" @click="yes()" class="yes">Yes!</b-button>
    </b-button-group>
  </div>
</transition>
</template>

<script>
import Card from './Card'
import GameSet from './GameSet'
export default {
  components: {
    Card,
    GameSet
  },
  data () {
    return {
      selectPosition: false
    }
  },
  props: {
    card: {
      type: Object,
      default: () => {}
    },
    isSet: {
      type: Boolean,
      default: false,
    },
    set: {
      type: Object,
      default: () => {}
    },
    open: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    isSelectMaster () {
      return this.$store.state.game.state === 'selectMaster'
    }
  },
  methods: {
    yes() {
      if (!this.isSelectMaster) {
        if(this.isSet) {
          this.$emit('yes', this.set);
        } else {
          this.$emit('yes', {card: this.card, position: "third"});
        }
        this.selectPosition = false;
      } else {
        this.selectPosition = true;
      }
      
    },
    no () {
      this.$emit('no', null);
      this.selectPosition = false;
    },

    first() {
      this.$emit('yes', {card: this.card, position:"first"});
      this.selectPosition = false;
      
    },
    second () {
      this.$emit('yes', {card: this.card, position:"second"});
      this.selectPosition = false;
    }
  }
}
</script>

<style lang="less">
.card-popup {
  z-index: 99;
  display: flex;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  flex-direction: column;
  background: rgba(0,0,0, 0.9);
  align-items:center;
  padding:3vh;
  
  .action {
    color: white;
    padding: 0 0 3vh 0 !important;
  }
  .action-button {
    width: 100%;
    margin-top: 3vh;
    .yes, .second {
      margin-top: 0px;
      flex:1;
    }
    .no, .first {
      flex:1;
      margin-top: 0px;
    }
    .position-select {
      .no {
        width: 100%;
      }
    }
    .action-button-inner {
      width: 100%;
      margin-bottom:3vh;
    }
  }
  .component-card {
    width: 70vw;
  }
}


</style>
