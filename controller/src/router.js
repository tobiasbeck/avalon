import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './views/Welcome.vue'
import Join from './views/Join.vue'
import Game from './views/Game.vue'
import End from './views/End.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/join',
      name: 'Join',
      component: Join
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/end',
      name: 'End',
      component: End
    }
  ]
})
