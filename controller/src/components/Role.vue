<template>
  <div class="role">
        <img :src="'/roles/' + role.role + '.svg'">
        <div class="role-text">
          <span class="role-title">{{role.name}}</span>
          <span class="role-description" v-html="role.description"></span>
        </div>
      </div>
</template>

<script>
export default {
  computed: {
    role () {
      return this.$store.state.player.role
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
        
      }
      .role-title {
        padding-bottom:0.5em;
        text-align: center;
        display: block;
        font-size:1.4em;
        font-weight: bold;
      }

      .role-description {
        
      }
    }
</style>
