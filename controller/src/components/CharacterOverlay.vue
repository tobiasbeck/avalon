<template>
  <div class="character-overlay">
    <div class="character-container">
        <b-container class="">
          <b-row>
              <b-col  v-for="c of characters" sm="12" md="6" lg="4" xl="3">
                <b-card  class="character text-roll" :title="c.name" :key="c.role" :img-src="'/roles/' + c.role + '.svg'" img-top>
                  <div class="card-text">
                    <div class="descr" v-html="c.description"></div>
                    <b-button @click="toggle(c.role)" :disabled="!me.gameLeader" :variant="enabledRoles.includes(c.role)? 'bronze':'secondary'" block><span v-if="!enabledRoles.includes(c.role)">Disabled</span> <span v-if="enabledRoles.includes(c.role)">Enabled</span></b-button>
                  </div>
                </b-card>
              </b-col>
          </b-row>
      </b-container>
      </div>
      <b-button size="lg" style="flex-shrink: 0;" variant="bronze" class="close-btn" block @click="$emit('close')">I'm done</b-button>
  </div>
</template>

<script>
export default {
  props: {
    enabledRoles: {
      type: Array,
      default:  () => []
    }
  },
  computed: {
    characters () {
      return this.$store.state.game.state.allRoles.filter(val => val.default !== true);
    },
    me () {
      return this.$store.state.player
    }
  },
  methods: {
    toggle(role) {
      this.$emit('update', role);
    }
  }
}
</script>

<style lang="less">
.character-overlay {
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
  flex-direction: column;
  .close-btn {
    border-radius: 0px;
  }
  .character-container{
    overflow:auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-grow: 1;
  justify-content: flex-start;
  flex-wrap: wrap;
  .character {
    display: flex;
    flex-direction: column;
    min-width: auto;
    .card-body {
      flex-grow: 1;
      .descr {
        ul {
          padding-left: 20px;
        }
      }
    }
    .card-img-top {
      width:30%;
      align-self: center;

    }
  }
  }
}
</style>
