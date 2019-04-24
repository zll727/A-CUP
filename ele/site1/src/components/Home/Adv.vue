<template>
	<!--<div class="adv" v-model="goodInfo">-->
	<div class="adv">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<meta name="format-detection" content="telephone=no" />
		<meta name="format-detection" content="email=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<div class="adv1" >
			<!--<img :src="goodInfo.goodPic | imgUrl"/>-->
				<img v-for="info in goodInfo" :src="info.goodPic | imgUrl"/>
			<!--{{goodInfo.goodName}}-->
		</div>
		<mt-swipe :auto="4000" :speed="2000">
			<mt-swipe-item class="adv2" v-for="item in goodList">
				<img :src="item.goodPic | imgUrl"/>
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	import axios from "axios"
	export default{
		name:"adv",
		data(){
			return{
				//goodInfo:{},
				goodInfo:[],
				goodList:[],
				
			}
		},
		methods:{
			//根据准确ID获取一条
//			getGoodInfo(){
//				axios.get("http://127.0.0.1/getGoodInfo",{
//					params:{
//						goodId:"5bfff761aadc05449cf61dc3"
//					}
//				}).then(({data})=>{
//						this.goodInfo=data.goodInfo;
//						console.log(data);
//					})
//			},
            //实际是一个列表（2条信息）
			getGoodInfo(){
				axios.get("http://127.0.0.1/getGoodInfo")
				.then(({data})=>{
						this.goodInfo=data.goodInfo;
					})
			},
		},
		mounted(){
			this.getGoodInfo();
			axios.get("http://127.0.0.1/getGoodList")
				.then(({data})=>{
					this.goodList=data.goodList;
				})
		}
	}
</script>

<style>
	*{margin:0;
	 padding:0;}
	 html{font-size:26.66vw;}      /*根目录字体大小*/
	 body{font-size:16px;}
	.adv{
		width:100%;
		height:2.8rem;
		background:#fff;
	}
	.adv1{
		width:100%;
		height:1.6rem;
		background:#fff;
		
	}
	.adv1 img{
		display:inline-block;
		width:45%;
		height:1.4rem;
		margin:0.1rem 0.08rem;
		box-sizing: border-box;
		border:1px solid #ccc;
	}
	.adv2{
		background:#fff;
		height:1.2rem;
	}
	.adv2 img{
		width:100%;
		height:1.2rem;
		margin:0;
		box-sizing: border-box;
	}
</style>