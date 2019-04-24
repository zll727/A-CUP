import axios from "axios";
import Vue from "vue";
var vue=new Vue();
export default{
	state:{
		//存储数据到localStorage里面
		adminId:localStorage.adminId || null,
		adminName:localStorage.adminName || null
	},
	mutations:{//修改数据
		//登录
		CHANGE_ADMININFO(state,info){
			state.adminId=localStorage.adminId=info.adminId;
			state.adminName=localStorage.adminName=info.adminName;
		},
		
		//退出登录  清除本地存储
		OUT_LOGIN(state){
			localStorage.clear();
			state.adminId=localStorage.adminId;
			state.adminName=localStorage.adminName;
			vue.$message({
				message:"退出登录成功",
	          	type:'success'
			})
		},

	},
	actions:{//实现异步操作 
		login({commit,state,getter},{adminName,adminPwd,success,error}){
			//axios.post("http://localhost/post".{//没有拦截之前
			axios.post("/login",{
				adminName,
				adminPwd
			//data是返回完整的对象  {data}是返回data属性项
			//}).then((data)=>{//请求拦截
			}).then(data=>{//响应拦截
				//console.log(data);
				if(data.ok===1){
					commit("CHANGE_ADMININFO",data);
					success(data.msg);
				}else{
					error(data.msg);
				}
			})
		}
	},
	getters:{
		
	}
}
