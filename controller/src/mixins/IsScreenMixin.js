export const IsScreenMixin = {
  computed: {
    isScreen () {
      return this.$store.state.player.id === -1
    }
  }
}
