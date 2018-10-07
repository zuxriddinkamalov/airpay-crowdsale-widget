import Vue from 'vue'
/* ============
 * Plugins
 * ============
 *
 * Import plugins.
 */
import './plugins/vuex'
import './plugins/font-awesome'
import './plugins/element-ui'
import './plugins/vuex-router-sync'
import './plugins/vue-ramda'
import './plugins/vue-qriously'
import './plugins/vue-clipboard'
import { router } from './plugins/vue-router'
import { apolloProvider } from './plugins/vue-apollo'

/* ============
 * Main App
 * ============
 *
 * Last but not least, we import the main application.
 */
import App from './App.vue'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider,
  store,
  render: h => h(App)
}).$mount('#app')
