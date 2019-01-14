export const StateMixin = {
  computed: {
    gameState () {
      return this.$store.state.game.state
    },
    gameStateState () {
      if (this.$store.state.game.state !== null && this.$store.state.game.state.state !== null) {
        return this.$store.state.game.state.state
      }
      return 'unknown'
    },
    isGameBoard () {
      return this.$store.state.player.id == -1
    }
  }
}
