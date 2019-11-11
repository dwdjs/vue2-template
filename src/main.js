import Vue from 'vue'
import App from './App'
import router from '@/router'

import '@/registerServiceWorker'
import '@/permission'

import env from '@/config/env'

import mini from '@/utils/mini'

Object.keys(mini).forEach(key => {
  Vue.prototype[`$${key}`] = mini[key]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
