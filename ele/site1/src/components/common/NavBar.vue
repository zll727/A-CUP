<template>
	<div class="top">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<meta name="format-detection" content="telephone=no" />
		<meta name="format-detection" content="email=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<h3>A Cup</h3>
		<div>
			<input style='width:88%'
				   type="text" ref="goodName" placeholder="搜索A CUP商家、商品名称"  
				   @keyup="getGoodList" @mouseleave="isShow=!isShow"/>
		</div>
		<div id="list" v-show="isShow" >
			<p v-for="item in goodList">{{item.goodName}}</p>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	export default{
		name:"nav-bar",
		data(){
			return{
				isShow:true,
				goodList:[]
			}
		},
		methods:{
			getGoodList(){
				axios.get("http://127.0.0.1/getGoodLis",{
					params:{
						goodName:this.$refs["goodName"].value
					}
				}).then(({data})=>{
						this.goodList=data.goodList;
						console.log(data,455546456);
						console.log(this.goodList,231332424);
						this.isShow=!this.isShow;
				})
			},
		},
		mounted(){
		}
	}
</script>

<style>
	html{font-size:26.66vw;}      /*根目录字体大小*/
	body{font-size:16px;}
	*{
		margin:0;
		padding:0;
	}
	.top{
		width:100%;
		height:0.8rem;
		background:#cc6f25;
	}
	.top h3{
		color:#fff;
		font-size:0.16rem;
		margin:0 0.15rem;
		line-height:0.4rem;
		font-weight:900;
		text-align:center;
	}
	.top > div{
		text-align: center;
	}
	.top input:first-child{
		text-align: center;
		width:3.4rem;
		height:0.3rem;
		border:1px solid #ccc;
		font-size:0.12rem;
		color:#000;
	}
	
	#list{
		position:relative;
		width:3.3rem;
		background:#fff;
		z-index: 1000;
		margin:0 0.22rem;
		opacity:0.9;
	}
	#list p{
		line-height:0.15rem;
		font-size:0.1rem;
		color:#000;
	}
</style>