import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'
import vantConfig from './vant.config'
import elementConfig from './element.config';
import 'element-ui/lib/theme-chalk/index.css';
import VueTouch from 'vue-touch'
Vue.config.productionTip = false
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueAxios, axios)
Vue.use(vantConfig)
Vue.use(elementConfig)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
