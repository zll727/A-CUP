import adminLog from '@/components/admin/adminLog'
import addAdmin from '@/components/admin/addAdmin'
import upPwd from '@/components/admin/upPwd'
import addaAdmin from "@/components/admin/addaAdmin"
export default [
	{
      path: '/adminLog',
      name: 'adminLog',
      component: adminLog
    },
    {
      path: '/addaAdmin',
      name: 'addaAdmin',
      component: addaAdmin
    },
    {
    	path:"/addAdmin",
    	name:"addAdmin",
    	component:addAdmin,
//  	children:[
//  		{
//		    	path:'addaAdmin',
//		    	component:addaAdmin
//		    }
//  	]
    },
    {
    	path:'/upPwd',
    	component:upPwd
    }
]
