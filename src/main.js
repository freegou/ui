// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.config.productionTip = false

let key = localStorage.getItem('token')
Vue.http.options.headers = {
  'Authorization': 'JWT' + ' ' + key
}
Vue.http.options.emulateJSON = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
