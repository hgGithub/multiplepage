// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './config/routers'
import FastClick from 'fastclick'
import { AlertPlugin } from 'vux'
import '../static/scripts/flexiblefit'

Vue.config.productionTip = false
FastClick.attach(document.body)
Vue.use(AlertPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
