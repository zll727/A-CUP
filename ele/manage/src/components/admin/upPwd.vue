<template>
	<!--绑定loginForm   双向绑定-->
	<el-form :model="upForm" class="login-containter" status-icon :rules="rules" ref="upForm">
		<h3>修改密码</h3>
		<el-form-item prop="adminName">
			<el-input type="text" v-model="upForm.adminName" placeholder="请输入账号"></el-input>
		</el-form-item>
		<el-form-item prop="adminPwd">
			<el-input type="password" v-model="upForm.adminPwd" placeholder="请输入旧密码"></el-input>
		</el-form-item>
		<el-form-item prop="newPwd">
			<el-input type="password" v-model="upForm.newPwd" placeholder="请输入新密码"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" style="width:40%" @click="submitForm('upForm')">修改</el-button>
			<el-button type="primary" style="width:40%" @click="resetForm('upForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
    export default {
        name: "update-admin",
        data() {
            //输入账号
            var checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }else {
                    callback();
                }
            }
            //旧密码
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {//如果有密码要通过账号跟本地存储的密码比较 匹配的话可以修改 不匹配无法修改
                    if (this.upForm.pass !== '') {
                        this.$refs.upForm.validateField('newPwd');
                    }
                    callback();
                }
            };
            //新密码
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if(value.length<4 || value.length>10){
                    callback(new Error('请输入4-10位字符'))
                } else {
                    callback();
                }
            };
            return {
                upForm: {
                    adminName:localStorage.adminName,
                    adminPwd: '',
                    newPwd: ''
                },
                rules: {
                    adminName: [
                        { validator: checkName,  trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            //提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {//查找信息
                        this.$axios.put('/upAdminPwd',{
                        	adminId:localStorage.adminId,
                            adminName:localStorage.adminName,
                            adminPwd:this.upForm.adminPwd,
                            newPwd:this.upForm.newPwd,
                        }).then((data)=>{
                            console.log(localStorage.adminName);
                            if(data.ok===1){
                                this.$message({
                                    message: "密码已失效，请重新登录",
                                    type: 'success'
                                })
                                this.$store.commit('OUT_LOGIN')
                            }else{
                                this.$message({
                                    message: data.msg,
                                    type: 'error'
                                })
                            }
                        })
                    }else{
                        this.$message({
                            message: data.msg,
                            type: 'error'
                        })
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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