import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'
import { detect } from 'detect-browser'
import BootstrapVue from 'bootstrap-vue'
import './bootstrap.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style.less';

Vue.use(BootstrapVue)
// https://jhserver.tobibeck.de
Vue.use(VueSocketio, io(process.env.VUE_APP_SERVER_URL), { store })

Vue.config.productionTip = false
let browser = detect();
//document.body.addEventListener('touchmove', (event) => { event.preventDefault() }, { passive: false });
if (browser.name === 'ios') {
  document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) { event.preventDefault() }
  }, { passive: false })
}

/*var lastTouchEnd = 0
document.documentElement.addEventListener('touchend', function (event) {
  var now = (new Date()).getTime()
  if (now - lastTouchEnd <= 800) {
    event.preventDefault()
  }
  lastTouchEnd = now
}, false)*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
