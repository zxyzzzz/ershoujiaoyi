// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueBus from 'vue-bus';
import {sendRequest} from "./utils/requestUtils";
import Result from "./utils/Result";
import dayjs from 'dayjs'
 
// 定义全局过滤器
Vue.filter('dateFormat', date => {
  return dayjs(date).format('YYYY-MM-DD')
})
Vue.use(VueBus);


Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$eventBus = new Vue()
Vue.prototype.sendRequest = sendRequest;
Vue.prototype.Result = Result;
export const eventBus=new Vue()
/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  render: h => h(App),
 
})

