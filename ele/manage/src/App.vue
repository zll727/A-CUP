<template>
  <el-container>
		<el-header>
	  	<el-row>
	  		<el-col class="logo" :span="8" :style="{width:isCollapse?'64px':'240px'}">
	  			<strong style="font-size:16px">{{isCollapse?'A CUP':'A CUP咖啡管理系统'}}</strong>
	  		</el-col>
	  		<el-col class="tools" :span="8" >
	  			<i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" 
	  				 @click="isCollapse=!isCollapse">
	  			</i>
	  		</el-col>
	  		<el-col :span="8" class="admin-info">
			    <el-dropdown>
			      <span class="el-dropdown-link">
			      	<span>{{$store.state.admin.adminName}}</span>
			      	<img src="./img/1.jpg"/>
			      </span>
			      <el-dropdown-menu slot="dropdown">
			      	<el-dropdown-item><span @click="$router.push('/upPwd')">修改密码</span></el-dropdown-item>
			        <el-dropdown-item><span @click="$store.commit('OUT_LOGIN')">退出登录</span></el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
	  		</el-col>
	  	</el-row>
		</el-header>
 
  	<el-container>
  		<el-aside :style="{width:isCollapse?'auto':'240px'}">
  			<!--:collapse-transition="false"关闭动画-->
  			<!--:collapse="isCollapse"是否折叠-->
				<el-menu default-active="1-4-1" 
					class="el-menu-vertical-demo" 
					:collapse-transition="false"
					:collapse="isCollapse">
				 
				  <el-submenu index="1">
		        <template slot="title">
		          <i class="el-icon-location"></i>
		          <span>管理员</span>
		        </template>
		        <el-menu-item index="1-1" @click="$router.push('/addAdmin')">
					    <i class="el-icon-menu"></i>
					    <span slot="title" >添加管理员</span>
					  </el-menu-item>
					  <!--<el-menu-item index="1-2" @click="$router.push('/adminLog')">
					    <i class="el-icon-menu"></i>
					    <span slot="title" >查看管理员日志</span>
					  </el-menu-item>-->
		     </el-submenu>
		     
				  <el-submenu index="2">
		        <template slot="title">
		          <i class="el-icon-location"></i>
		          <span>商品</span>
		        </template>
		        <el-menu-item index="2-1" @click="$router.push('/shopType')">
					    <i class="el-icon-menu"></i>
					    <span slot="title" >店铺类别管理</span>
					  </el-menu-item>
					  
					  <el-menu-item index="2-2" @click="$router.push('/')">
					    <i class="el-icon-menu"></i>
					    <span slot="title" >店铺管理</span>
					  </el-menu-item>
					  
					  <el-menu-item index="2-3" @click="$router.push('/goodManage')">
					    <i class="el-icon-menu"></i>
					    <span slot="title" >商品管理</span>
					  </el-menu-item>
		      </el-submenu>
				  
				  
				</el-menu>
  		</el-aside>
  	
  		<el-main>
  			<!--路由切换  左边的菜单控制中间的内容变化-->
  			<router-view></router-view>
  		</el-main>
  		
  	</el-container>
  </el-container>
  
</template>

<script>
export default {
  name: 'App',
  data(){
  	return{
  		isShow:true,
  		isCollapse:true,//是否折叠
  		
  	}
  },
  methods:{
  	 
  }
}
</script>

<style>
	*{
		margin:0;
		padding:0
	}
	html,body{
		height:100%;
	}
	.el-header{
		padding:0;
		height:60px;
		background:skyblue;
	}
	.logo{
		height:660px;
		width:240px;
		line-height:60px;
		text-align:center;
		border-right:1px solid #42B983;
	}
	
	.tools{
		font-size:30px;
		color:#fff;
		line-height:60px;
	}
	
	.logo strong{
		font-size:30px;
		color:#fff;
	}
	.admin-info{
		padding-right:20px;
		float:right;
		text-align:right;
		vertical-align: middle;
	}
	.admin-info .el-dropdown{
		vertical-align: middle;
	}
	.admin-info span{
		color:#fff;
		line-height: 60px;
		margin-right:10px;
	}
	.admin-info img{
		width:40px;
		height:40px;
		border-radius: 50%;
		vertical-align:middle
	}
	.el-dialog__body img{
		display:block;
		width:400px;
		height:300px;
	}
</style>
