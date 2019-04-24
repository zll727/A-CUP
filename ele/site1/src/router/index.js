import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home/index'
import ShopDet from '@/components/Home/shopDetails'
import Index from '@/components/Home/Index'

import Foot from '@/components/common/Footer'


import Order from '@/components/Order/Order'
import My from '@/components/My/My'
import Find from '@/components/Find/Find'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/shopDetails',
      name: 'ShopDet',
      component: ShopDet
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    
     {
      path: '/My',
      name: 'My',
      component: My
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/Find',
      name: 'Find',
      component: Find
    },
     {
      path: '/Footer',
      name: 'Footer',
      component: Foot
    }
  ]
})
