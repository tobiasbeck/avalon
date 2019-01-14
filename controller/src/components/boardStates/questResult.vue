<template>
  <div class="board-quest-result-state">
    <div class="board-quest-result-state-inner text-cartoon">
      <img class="state-icon" :src="'/icons/' + gameState.icon + '.svg'">
      <div class="quest-result-text"><h1 class="title" v-if="gameState.title != 'unknown'">{{gameState.title}}</h1>
      <div class="result-container">
        <b-table class="result" hover :items="result" bordered head-variant="light">
          <template slot="yes" slot-scope="data">
            <h2>{{data.item.yes}}</h2>
          </template>
          <template slot="no" slot-scope="data">
            <h2>{{data.item.no}}</h2>
          </template>
        </b-table>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import RoundCounter from '../roundCounter.vue'
import {StateMixin} from '../../mixins/StateMixin.js';
export default {
  components: {RoundCounter},
  mixins: [StateMixin],
  computed: {
    result () {
      let res = {
        yes: this.gameState.result.yes,
        no: this.gameState.result.no,
        _cellVariants: { yes: 'good', no: 'evil' }
        }
      return [res];
    }
  }
}
</script>

<style lang="less">
.board-quest-result-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .board-quest-result-state-inner {
    display: flex;
    flex-direction: row;
    min-width:500px;
    .quest-result-text {
      margin-left: 15px;
    }
  }
  .state-icon {
    max-height: 100%;
  }
}
</style>
