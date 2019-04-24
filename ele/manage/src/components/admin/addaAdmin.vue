<template>
<div class="adminForm">
    <el-form>
     	<h3 style="text-align: center;">添加管理员</h3>
	    <el-form-item label="管理员名称" prop='adminName'>
	      <el-input ref="adminName" v-model="adminForm.adminName" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="管理员密码" prop='adminPwd'>
	      <el-input type="password" ref="adminPwd" v-model="adminForm.adminPwd"></el-input>
	    </el-form-item>
	    <el-form-item label="管理员图片">
	      <el-upload
			  class="upload-demo"
			  ref="upload"
			  action=""
			  :limit="1"
			  :auto-upload="false">
			  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
			 <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		  </el-upload>
	    </el-form-item>
	    <el-form-item>
			<el-button type="primary" @click="addAdmin">提交</el-button>
			<el-button @click="resetForm('ruleForm2')">重置</el-button>
		</el-form-item>
    </el-form>
	    <!--<el-button @click="$emit('changevisible',false)">取 消</el-button>-->
    
</div>

</template>

<script>
	export default{
		name:"adda-admin",
		data(){
			 var adminName = (rule, value, callback) => {
		        if (!value) {
		          return callback(new Error('账号不能为空'));
		        }
		        else {
		              callback();
		           }		      
		      };
		      var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else if (value.length<4 || value.length>10) {
		          callback(new Error('密码长度为4~10位'));
		        }else{
		          callback();
		        }
		      };
			return {//加载中（即登录按钮上面出现加载图标）
				isLoading:false,
				rules:{
					adminName:[
						 {  validator: adminName, trigger: 'blur' },
					],
					adminPwd:[
						 { validator: validatePass, trigger: 'blur' },
//						 { min:4,max:10, message: '密码长度为4~10位', trigger: 'blur' },
//						 也可以自己定义校验规则，在data(){}里面设置，然后调用方法validatePass2（方法名）
//						  { validator: validatePass2, trigger: 'blur' }
						 
					]
				},
				adminForm:{//loginForm对象里面有两个元素
					adminName:"",
					adminPwd:""
				}
			}
		},
		methods:{
			//添加店铺类别
			addAdmin(){
				console.log(1)
				//重置
				this.$refs.upload.clearFiles();
				var formdata=new FormData();
				console.log(this.$refs.adminName.$data.currentValue);
				
				formdata.set('adminPwd',this.$refs.adminPwd.$data.currentValue)
				formdata.set("adminName",this.$refs.adminName.$data.currentValue);
				//图片是文件，所以加files[0],不然会报错size<0
				formdata.set("adminPic",document.querySelector(".el-upload__input").files[0]);
				this.$axios.post("/addAdmin",formdata)
					.then(data=>{
						console.log(data,222);
						//this.getAdminList();
						if(data.ok===1){
							this.$message({
								message:data.msg,
								type:"success"
							});
						}else{
							this.$message.error(data.msg);
						}
					})
			},
			
		},
	}
</script>

<style>
	.adminForm{
		width:500px;
		margin:100px auto;
		border:1px solid #0099FF;
		padding:30px 30px 15px;
	}
	.el-table th>.cell {
	text-align: center;
}
.el-table td{
	text-align: center;
}
	
</style>