import Vue from 'vue'
import App from './App.vue'
import router from './router'  // 会去找./router下的index.js文件
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css';

import './mock/index.js'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,   //this.$router === router
  store,    //this.$store === store
  render: h => h(App)
}).$mount('#app')