// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/iconfont/iconfont.css"
import axios from 'axios'
import qs from 'querystring'


Vue.config.productionTip = false
Vue.use(ElementUI)

// 引入axiso并注入vue全局对象，使用this.$axiso调用
Vue.prototype.$axios = axios;
// Vue.prototype.qs = qs;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
