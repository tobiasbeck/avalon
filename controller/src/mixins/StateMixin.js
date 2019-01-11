export const StateMixin = {
  computed: {
    gameState () {
      return this.$store.state.game.state
    },
    isGameBoard () {
      return this.$store.state.player.id == -1
    }
  }
}
