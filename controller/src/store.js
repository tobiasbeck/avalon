import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lastRound: {
      id: 0,
      points: 0,
      winners: []
    },
    player: {
      id: -1,
      name: '',
      role: {},
      gameLeader: false
    },
    game: {
      id: '',
      players: [],
      round: {},
      totalRounds: 0,
      fails: 0,
      size: {},
      questWinners: [],
      currentAccepted: 0,
      state: {}
    },
    settings: {
      allRoles: [],
      enabledRoles: []
    },
    io: {},
    connected: false
  },
  getters: {
  },
  mutations: {
    SET_PLAYER (state, value) {
      Vue.set(state, 'player', value)
    },
    SET_GAME (state, value) {
      state.game = value
    },
    SET_PLAYER_LEADER (state, value) {
      state.player.leader = value
    },
    SET_SOCKET: (state, socket) => {
      state.io = socket
    },
    SET_GAME_STATE (state, value) {
      Vue.set(state.game, 'state', value)
    },
    SET_GAME_SIZe (state, value) {
      Vue.set(state.game, 'size', value)
    },
    ADD_PLAYER (state, value) {
      Vue.set(state.game.players, value.id, value)
    },
    SET_GAME_ID (state, value) {
      state.game.id = value
    },
    SET_CONNECTED (state, value) {
      state.connected = value
    },
    SOCKET_GAME_PLAYERS (state, value) {
      state.game.players = value
    },
    SOCKET_GAME_CURRENT_ACCEPTED (state, value) {
      state.game.currentAccepted = value
    },
    SOCKET_ROUND_ANSWERS (state, value) {
      state.game.currentAccepted = value
    },
    SET_PLAYER_ROLE (state, value) {
      state.player.role = value
    },
    SET_QUEST_WINNERS (state, value) {
      Vue.set(state.game, 'questWinners', value)
    },
    SET_GAME_FAILS (state, value) {
      state.game.fails = value
    }
  },
  actions: {
    socket_connect (context) {
      context.commit('SET_CONNECTED', true)
    },
    socket_playerJoin (context, player) {
      context.commit('ADD_PLAYER', player)
    },
    socket_disconnect (context) {
      context.commit('SET_CONNECTED', false)
    },
    socket_setState (context, message) {
      context.commit('SET_GAME_STATE', message)
    },
    socket_gameFails (context, message) {
      context.commit('SET_GAME_FAILS', message)
    },
    after_login (context, message) {
      context.commit('SET_PLAYER', message)
      let storage = window.localStorage
      storage.setItem('rejoin', message.rejoinId)
    },
    socket_rejoinReturn (context, result) {
      if (result.game) {
        context.commit('SET_GAME', result.game)
      }
      if (result.player) {
        context.commit('SET_PLAYER', result.player)
      }
    },
    socket_endGame (context, value) {
      let storage = window.localStorage
      storage.removeItem('rejoin')
      context.commit('SET_LAST_ROUND_WINNERS', value.winners)
      context.commit('SET_LAST_ROUND_POINTS')
      context.commit('SET_LAST_ROUND_ID')
      context.commit('SET_HAND', [])
      context.commit('SET_NAME', 'result.name')
      context.commit('SET_MASTER', false)
      context.commit('SET_PLAYER_ID', 0)
      context.commit('SET_POINTS', 0)
      context.commit('SET_GAME_STATE', 'waitBeforeGame')
      context.commit('SET_GAME_VOTING', false)
      context.commit('SET_GAME_SETS', [])
    },
    socket_noGame (context, value) {
      let storage = window.localStorage
      storage.removeItem('rejoin')
      context.commit('SET_HAND', [])
      context.commit('SET_NAME', '')
      context.commit('SET_MASTER', false)
      context.commit('SET_PLAYER_ID', 0)
      context.commit('SET_POINTS', 0)
      context.commit('SET_GAME_STATE', 'waitBeforeGame')
      context.commit('SET_GAME_VOTING', false)
      context.commit('SET_GAME_SETS', [])
    },
    socket_playerCharacter (context, value) {
      context.commit('SET_PLAYER_ROLE', value.character)
    },
    socket_gameSize (context, value) {
      context.commit('SET_GAME_SIZe', value)
    },
    socket_questWinners (context, value) {
      context.commit('SET_QUEST_WINNERS', value)
    }
  }
})
