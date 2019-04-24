<template>
	<div >
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<meta name="format-detection" content="telephone=no" />
		<meta name="format-detection" content="email=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<h4>- 推荐商家  -</h4>
		<div class="sort">热门店铺</div>
		<!--店铺信息-->
		<ul class="shop"
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="5">
			<li v-for="item in shopList"  @click="openDetail(item._id)" v-model="shopId">
				<div id="shop1">
					<img width="120" :src="item.shopPic | imgUrl"/>
				</div>
				<div id="shop2">
					<div id="shop2-1">
						<p ><span>品牌</span>{{item.shopName}}
						<p>★★★★★    <span>4.7</span></p>
						<p>￥20起送  | 派送费9元</p>
						<!--<p>{{item.shopTypeId}}</p>-->
					</div>
					<div id="shop2-2">
						<p>
							<span>首</span>
							新用户下单立减17元 
							<!--<select placeholder="活动数量">
								<option>3个活动</option>
							</select>-->
						</p>
						<p><span style="background:#f07373">减</span>满20减5，满65减9</p>
					</div>
				</div>
			</li>
		</ul>
		<shopDet v-if="isShow" :shopId="shopId"></shopDet>
	</div>
	
</template>

<script>
	import axios from "axios";
	import shopDet from "./shopDetails"
	export default{
		name:"shop",
		data(){
			return{
				isShow:false,
				shopId:"",
				shopList:[],
				loading:false,
				pageIndex:1,
				shopPic:""
			}
		},
		components:{
			shopDet
		},
		methods:{
			
			//跳转到详情
            openDetail(id){
                this.shopId = id;
                this.$router.push({path:'/shopDetails',query:{id:this.shopId}});
                this.isShow=true;
            },
			
			getShopList(){
				axios.get("http://127.0.0.1/getShopList")
				.then(({data})=>{
					this.shopList=data.shopList;
				})
			},
			loadMore() {
			  this.loading = true;
			  setTimeout(() => {
			    let last = this.shopList[this.shopList.length - 1];
			    for (let i = 1; i <= 5; i++) {
			      this.shopList.push(last + i);
			    }
			    this.loading = false;
			  }, 2500);
			},
//			loadMore(){
//				this.loading=true;
//				axios.get("http://127.0.0.1/getShopList",{
//					params:{pageIndex:1}
//				}).then(({data})=>{
//					this.shopList=this.shopList.concat(data.shopList)
//					this.loading=false;
//				})
//			}
			
		},
		
		mounted(){
			this.getShopList();
		}
		
	}
</script>

<style>
	*{margin:0;
	 padding:0;
	 }
	 html{font-size:26.66vw;}      /*根目录字体大小*/
	 body{font-size:16px;}
	 ul,li{list-style: none;}
	 h4{
	 	height:0.5rem;
	 	line-height:0.5rem;
	 	text-align: center;
	 	font-size:0.1rem;
	 	margin:0.05rem 0 0;
	 }
	.sort{
		height:0.3rem;
		background:#fff;
		line-height:0.2rem;
		border-bottom:1px solid #ccc;
		font-size:5vw;
		color:#cc6f25;
		text-align:center;
	}
	.sort li{
		width:25%;
		font-size:4vw;
		float:left;
		box-sizing: border-box;
		padding:0 15px;
		color:#ccc;
	}
	.sort select{
		font-size:10vw;
		color:#3190E8;
		border:none;
	}
	.shop li{
		height:40vw;
		background:#FFF;
	}
	#shop1{
		width:25vw;
		height:40vw;
		background:#fff;
		float:left;
		text-align:center;
	}
	#shop2{
		width:75vw;
		height:40vw;
		background: #fff;
		float:left;
	}
	#shop2-1{
		width:75vw;
		height:25vw;
	}
	#shop2-1 > p{
		width:75vw;
		height:6vw;
		line-height: 10vw;
		font-size:3vw;
	}
	#shop2-1 > p:first-child{
		font-size:4vw;
		color:#000;
		font-weight:800;
	}
	#shop2-1 > p:first-child span{
		background:#ffeb18;
		display:inline-block;
		width:10vw;
		height:4vw;
		line-height:4vw;
		text-align:center;
		margin-right:2vw;
		color:#6f3f15;
		border-radius:3px;
	}
	#shop2-1 > p:first-child i{
		font-weight:100;
		font-size:3vw;
		margin-left:38vw;
		color:#ccc;
	}
	#shop2-1 > p:nth-child(2){
		font-size:4vw;
		color:#ffd000;
	}
	#shop2-1 > p:nth-child(2) span{
		margin-left:3vw;
		color:#000;
		font-size:3vw;
	}	
	#shop2-2{
		width:75vw;
		height:15vw;
		border:1px solid #CCCCCC;
		box-sizing: border-box;
	}
	#shop2-2 p{
		line-height:6vw;
		color:lightslategray;
		font-size:3vw;
	}
	#shop2-2 span{
		background:#70bc46;
		display:inline-block;
		width:4vw;
		height:4vw;
		line-height:4vw;
		text-align:center;
		margin-right:3vw;
		color:#fff;
		border-radius:3px;
	}
	#shop2-2 select{
		height:5vw;
		margin-left:22vw;
		font-size:2vw;
	}
</style>