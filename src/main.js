import Vue from 'vue'
import App from './App.vue'

import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import axios from "axios"
import VueRouter from "vue-router"

Vue.use(Element)
Vue.use(VueRouter)

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

const routes = [
  {
    path:"/login",
    conponent:"Login"
  }
]

const router = new VueRouter({routes})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')