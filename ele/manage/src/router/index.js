import Vue from 'vue'
import Router from 'vue-router'
import shop from "./shop"
import admin from "./admin"
import good from "./good"

Vue.use(Router)

export default new Router({
	routes:[].concat(shop,admin,good)
	//routes:shop.concat(admin)
//routes: [
//  {
//    path: '/adminLog',
//    name: 'adminLog',
//    component: adminLog
//  },
//  {
//  	path:"/addAdmin",
//  	name:"addAdmin",
//  	component:addAdmin
//  }
//  ]
})
