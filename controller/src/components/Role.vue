<template>
  <div class="role">
        <img :src="'/roles/' + role.role + '.svg'">
        <div class="role-text">
          <span :class="['role-title']">{{role.name}}</span>
          <span :class="['role-sub-title', teamClass]">{{role.team}}</span>
          <span class="role-description" v-html="role.description"></span>
        </div>
      </div>
</template>

<script>
export default {
  computed: {
    role () {
      return this.$store.state.player.role
    },
    teamClass () {
      if (this.role.team == 'good') {
        return 'text-good';
      } else {
        return 'text-evil';
      }
    }
  }
}
</script>

<style lang="less">
.role {
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  flex-grow: 0;
  width: auto;
    font-family:'Anir';
      img {
        max-height: 30vh;
      }
      .role-text{
        display: flex;
        flex-direction: column;
      }
      .role-title {
        text-align: center;
        display: block;
        font-size:1.4em;
        font-weight: bold;
      }
      .role-sub-title {
        padding-bottom:0.5em;
        text-align: center;
        font-size:1.4em;
      }

      .role-description {
        
      }
    }
</style>
