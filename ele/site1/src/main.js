// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"

import jsonp from 'jsonp';
//引入mint-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
import filter from "./filter"
import { InfiniteScroll } from 'mint-ui';

//引入element-ui
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'


import jQuery from './jquery'
import jq1 from './jquery/jq.js'

Vue.use(MintUI)
Vue.use(ElementUI)
Vue.prototype.$axios=axios//作为原型对象
Vue.config.productionTip = false
Vue.use(InfiniteScroll);//使用无限加载
Vue.use(jQuery)
Vue.use(jq1)
//filter遍历（对象遍历）
for(var key in filter){
	Vue.filter(key,filter[key]);
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
