<template>
	<!--绑定loginForm   双向绑定-->
	<el-form :model="loginForm" class="login-containter" ref="loginForm" :rules="rules">
		<h3>A CUP后台管理系统</h3>
		<el-form-item prop="adminName">
			<el-input type="text" ref="adminName" v-model="loginForm.adminName" placeholder="请输入账号"></el-input>
		</el-form-item>
		<el-form-item prop="adminPwd">
			<el-input type="password" ref="adminPwd" v-model="loginForm.adminPwd" placeholder="请输入密码"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" :loading="isLoading" style="width:100%" @click="submitForm('loginForm')">登录</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	//也可以在main里面作为vuede原型对象引入
	//import axios from "axios";
	export default{
		name:"login",
		data(){
			var validatePass2 = (rule, value, callback) => {
		        if (value.length<4 || value.length>10) {
		          callback(new Error('密码长度为4~10位'));
		        }else {
		          callback();
		        }
	      	};
			return {//加载中（即登录按钮上面出现加载图标）
				isLoading:false,
				rules:{
					adminName:[
						 { required: true, message: '请输入管理员账号', trigger: 'blur' },
					],
					adminPwd:[
						 { required: true, message: '请输入您的密码', trigger: 'blur' },
						 //{ min:4,max:10, message: '密码长度为4~10位', trigger: 'blur' },
						 //也可以自己定义校验规则，在data(){}里面设置，然后调用方法validatePass2（方法名）
						  { validator: validatePass2, trigger: 'blur' }
						 
					]
				},
				loginForm:{//loginForm对象里面有两个元素
					adminName:"",
					adminPwd:""
				}
			}
		},
		methods:{
	        submitForm(formName) {
	        	console.log(this.$refs.adminName.value);
	        	this.$refs[formName].validate((valid) => {
	        		//valid验证(true或false)
	          		//console.log(valid);
	          		if(valid){
	          			//验证成功之后
	          			this.isLoading=true;//有加载的图标
	          			//vuex
	          			console.log(this);
	          			//记录this,直接用this，作用域不一样，会出现this是undefined
	          			var _this=this;
	          			this.$store.dispatch("login",{
	          				adminName:this.loginForm.adminName,
	          				adminPwd:this.loginForm.adminPwd,
	          				success(msg){
	          					//console.log(2222,this);
	          					_this.$message({
	          						message:msg,
	          						type:'success'
	          					})
	          					_this.isLoading=false;
	          				},
	          				error(msg){
	          					//console.log(1111,this);
	          					_this.$message.error(msg);
	          					_this.isLoading=false;
	          				}
	          			});
	          			
	          			
	          			//post url
//	          			this.$axios({
//	          			//axios({
//	          				url:"http://127.0.0.1/post",
//	          				method:'post',
//	          				//方法是get是在params里面，是post是在dada里面
//	          				data:"a=4&b=5",
//	          				headers:{
//	          					"content-type":"application/x-www-form-urlencoded"
//	          				}
//	          			}).then(({data})=>{
//	          				//得到数据后，加载图标消失
//	          				this.isLoading=false;
//	          				console.log(data);
//	          			})
	          			
	          			
	          			
	          			
	          			//post json格式
//	          			axios({
//	          				url:"http://127.0.0.1/post",
//	          				method:'post',
//	          				//方法是get是在params里面，是post是在dada里面
//	          				data:{
//	          					a:3,
//	          					b:4
//	          				}
//	          			}).then(({data})=>{
//	          				console.log(data);
//	          			})
	          			
	          			
	          			
	          			//get  url格式
//	          			axios({
//	          				url:"http://127.0.0.1/get",
//	          				method:'get',
//	          				//方法是get是在params里面，是post是在dada里面
//	          				params:{
//	          					a:1,
//	          					b:2
//	          				}
//	          			}).then(({data})=>{
//	          				console.log(data);
//	          			})
	          			
	          			
	          			//post urlencodeed
//	          			axios.post("http://localhost/post","a=1&b=2",{
//	          				headers:{
//	          					"content-type":"application/x-www-form-urlencoded"
//	          				}
//	          			}).then(({data})=>{
//	          				console.log(data);
//	          			})
	          			
	          			
	          			//post json
//	          			axios.post("http://localhost/post",{
//	          				adminName:this.loginForm.adminName,
//		          			adminPwd:this.loginForm.adminPwd
//	          			},{
//	          				headers:{
//	          					"content-type":"application/x-www-form-urlencoded"
//	          				}
//	          			}).then(({data})=>{
//	          				console.log(data);
//	          			})
//	          			
	          			
	          			//get json
//	          			axios.get("http://localhost/get",{
//		          			params:{
//		          				adminName:this.loginForm.adminName,
//		          				adminPwd:this.loginForm.adminPwd
//		          			}
//		          		}).then(({data})=>{
//		          			console.log(data)
//		          		})
	          		}
	        	});
	        }
	    }
	}
</script>
	
<style>
	.login-containter{
		width:350px;
		margin:100px auto;
		border:1px solid #0099FF;
		box-shadow: 0 0 20px aquamarine;
		padding:30px 30px 15px;
	}
	.login-containter h3{
		text-align: center;
	}
</style>