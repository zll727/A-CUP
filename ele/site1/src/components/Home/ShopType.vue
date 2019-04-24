<template>
	<mt-swipe :auto="6000" :speed="1000">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<meta name="format-detection" content="telephone=no" />
		<meta name="format-detection" content="email=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		  <mt-swipe-item v-for="item in shopTypeList">
		  	<div class="shop-type">
			  	<!--<div v-for="info in item">{{info}}</div>-->
			  	<div v-for="info in item">
			  		<dl>
			  			<dt>
							<!--<img width="100":src="'http://127.0.0.1/'+info.shopTypePic"/>-->
							<img width="100":src="info.shopTypePic | imgUrl"/>
			  			</dt>
			  			<dd>
			  				{{info.shopTypeName}}
			  			</dd>
			  		</dl>
			  	</div>
			  	
			</div>
		  </mt-swipe-item>
	</mt-swipe>
	
</template>

<script>
	import axios from "axios";
	export default{
		name:"shop-type",
		data(){
			return {
				shopTypeList:[]
			}
		},
		mounted(){
			axios.get("http://127.0.0.1/getShopType")
				.then(({data})=>{
					this.shopTypeList=data.shopTypeList;
				})
		}
	}
</script>

<style>
	*{margin:0;
	 padding:0;
	 }
	.mint-swipe{
		font-size:0.08rem;
		height:1.6rem;
		background:#fff;
		border-bottom: 1px solid #ccc;
	}
	.shop-type{
		background:#fff;
		display:flex;
		flex-wrap:wrap;
	}
	.shop-type div{
		width:20%;
		height:0.68rem;
		box-sizing: border-box;
	}
	.shop-type div dl{
		text-align: center;
	}
	img{
		width:0.48rem;
		height:0.48rem;
		margin:0.1rem 0.1rem 0 0.1rem;
	}
</style>