// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import Login from "./Login"
import axios from "axios";
import store from "./vuex"
import filter from "./filter"


import study from "./study"


Vue.prototype.$axios=axios//作为原型对象
Vue.config.productionTip = false
Vue.use(ElementUI)


// 全局过滤器
//filter遍历（对象遍历）
for(var key in filter){
	Vue.filter(key,filter[key]);
}


//拦截器（拦截头部请求信息）
axios.interceptors.request.use((config)=>{//这个回调函数决定要不要继续
	//这里是拦截下来之后做的事情，这里拦截的是将所有的axios请求都拦截下来
	//config.url="http://127.0.0.1"+config.url;
	//config.url="/ele"+config.url;
	config.url=config.url;
	return config;//config就是你要请求的信息，例如config.url就是你要请求的路径
});

//拦截响应信息
axios.interceptors.response.use(({data})=>{//data是完整对象信息  {data}是自己只想要的信息
	return data;//即只出现  {ok: 1, msg: "post方法"}
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App,Login,study},
 // template: '<Login/>'
 
 //页面跳转
   template:`
   	<components :is="$store.state.admin.adminId?'App':'Login'"/>
   `
// template:`
// 	<components is="study"/>
// `
})
