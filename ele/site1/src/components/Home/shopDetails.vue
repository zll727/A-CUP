<template>
	<div>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<meta name="format-detection" content="telephone=no" />
		<meta name="format-detection" content="email=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<body>
			<div class="header" style="height:250px;">
				<span @click="$router.push('/index')"
					  style='color:#7B7B7B'>
					返回首页
				</span>
				<div v-for="item in shopList" style="margin-bottom:30px">
					<img style="width:200px;height:150px;margin:0 auto" :src="item.shopPic | imgUrl"/>
					<h3  style="font-size:30px;color:#666;text-align: center; line-heihgt:60px;">{{item.shopName}}</h3>
				</div>
				
			</div>
			<div class="swiper-container" >
				<ul class="swiper-container-ul">
					<li class="swiper-container-ul-li actives">商品</li>
					<li class="swiper-container-ul-li">店铺介绍</li>
				</ul>
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<div class="content" style="height: 650px;">
							<div id="left" class="left">
								<ul >
									<li class="active" v-for="item in shopList">
										{{item.shopName}}
									</li>
								</ul>
							</div>
							<div id="right" class="right">
								<ul>
									<li v-for="info in goodList">
										<div class="class-title">{{info.goodName}}</div>
										<div>
											<div class="item">
												<div class="item-left">
													<div class="item-img">
														<img  :src="info.goodPic | imgUrl"/>
													</div>
												</div>
												<div class="item-right">
													<div class="title">商品名称：{{info.goodName}}</div>
													<div class="subtitle">上架时间：{{info.addTime | date}}</div>
													<div class="price" style='float:left'>价格：{{info.price | currency}}</div>
													
													<span v-if="carList==''"
														  class='addBtn' 
														  style='float:left;margin-left:200px;margin-top:11px'
														  @click="joinCar(info._id)">+
													</span>
													
													<div class='addNum' v-for='info1 in carList'>
														<span class='addBtn' @click="updateNum(info1._id,0)">-</span>
														<span>{{info1.buyNum}}</span>
														<span class='addBtn' @click="updateNum(info1._id,1)">+</span>
													</div>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="swiper-slide" >
						店铺介绍
					</div>
				</div>
			</div>
			
			<div class="foot">
				<el-popover
				  ref="popover2"
				  placement="top-start"
				  title="购物车"
				  width="700"
				  trigger="click">
				  <ul class='footCar'>
				  		<li v-for='item in carList'>
				  			<span>{{item.goodName}}</span>
				  			<span style='margin-left:100px'>{{item.price}}</span>
				  			<span class='addNum'>
				  				<span class='addBtn'  @click='updateNum(item._id,0)'>-</span>
				  				<span>{{item.buyNum}}</span>
				  				<span class='addBtn'  @click='updateNum(item._id,1)'>+</span>
				  			</span>
				  		</li>
				  		<hr />
				  </ul>
				</el-popover>
				<span class='addTocar'
					  style="margin-left:-70%" 
					  v-popover:popover2>
					  <span class='carSpan'>🛒</span>
					  <span class='buySpan'>{{sumNum}} </span>
					  <span class='priceSpan'>{{sumPrice | currency}}</span>
				</span>
				<i @click="$router.push('/Order')">去结算</i>
			</div>
		</body>
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		name: "shop-details",
		props:['shopId'],
		data(){
			return{
				shopList:[],
				goodList:[],
				carList:[],
				carInfo:{},
				buyNum:'',
			}
		},
		methods:{
			/*--------------------------购物车-------------------------------*/
			joinCar(id){
				//加入购物车
				var shopId1 = this.$router.history.current.query.id;
				console.log(shopId1,'3333');
				axios.get("http://127.0.0.1/joinCar",{
					params:{
						id,
						shopId1
					}
				}).then(({data})=>{
					if(data.ok===1){
						this.getCarList();
					}else{
						alert(data.msg);
					}
				})
			},
			
			updateNum(id,type){
				axios.get("http://127.0.0.1/updateNum",{
					params:{
						id,
						type
					}
				}).then(({data})=>{
					this.getCarList();
				})
			},
			
			getCarInfo(id){
				axios.get("http://127.0.0.1/getCarInfo",{
					params:{id}
				}).then(({data})=>{
					this.carInfo=data.carInfo;
				})
			},
			
			getCarList(goodId){
				var shopId1 = this.$router.history.current.query.id;
				axios.get("http://127.0.0.1/getCarList",{
					params:{
						shopId:shopId1
					}
				}).
				then(({data})=>{
					console.log(data);
					this.carList=data.carList;
					
					if(this.carList!=''){
						$('.foot').css({'background':'#cc6f25'});
					}else{
						$('.foot').css({'background':'gray'});
					}
					
				})
				
			},
			
			changeCarInfo(id,isOk){//改变
				axios.get("http://127.0.0.1/changeCarInfo",{
					id,
					isOk
				}).then(({data})=>{
					this.getCarList();
				})
			},
			
		/*------------------------------------------------------------*/	
			openType(){
		       this.isShow=true;
		    },
			
			getShopLists(){
				var shopId1 = this.$router.history.current.query.id;
				axios.get("http://127.0.0.1/getShopLists",{
					params:{
						shopId:shopId1
					}
				})
				.then(({data})=>{
					this.shopList=data.shopList;
				})
			},
			
			getShopList(){
				axios.get("http://127.0.0.1/getShopList",)
				.then(({data})=>{
					this.shopList=data.shopList;
				})
				
			},
			
			getGoodList(){
				this.shopId1 = this.$router.history.current.query.id; //店铺传过来的shop id
				axios.get("http://127.0.0.1/getGoodLists",{
					params:{
						shopId:this.shopId1,
//						goodName:this.$refs["goodName"].$data.currentValue
					}
				})
				.then(({data})=>{
					this.goodList=data.goodList;
				})
			}
		},
		computed:{
			sumPrice(){
				var sum=0;
				for(var i=0;i<this.carList.length;i++){
					if(this.carList[i].isOk){
						sum+=(this.carList[i].price*this.carList[i].buyNum)
					}
				}
				return sum;
			},
			
			sumNum(){
				var sum=0;
				for(var i=0;i<this.carList.length;i++){
					if(this.carList[i].isOk){
						sum+=(this.carList[i].buyNum*this.carList.length)
					}
				}
				return sum;
			}
		},
		mounted(){
			this.getCarList();
			this.getShopList();
			this.getShopLists();
			this.getGoodList();
			
		}
	}
</script>

<style>
	* {
		padding: 0;
		margin: 0;
	}
	html{font-size:31.25vw;}  
	body{ font-size:16px;}
	.header {
		width: 100%;
		/*height: 150px;*/
		background:#fff;
	}
	.header >span{
		font-size:20px;
		color:lightslategray;
		line-height:50px;
		font-weight:900;
		margin:0 20px;
	}
	
	.swiper-container-ul {
		list-style: none;
		overflow: hidden;
		width: 100%;
		background: #fff;
		top: 0;
	}
	
	.swiper-container-ul-li {
		width: 50%;
		height: 40px;
		line-height: 40px;
		float: left;
		text-align: center;
		font-size:22px;
	}
	
	.actives {
	    font-size: 23px;
	    border-bottom: 1px solid #cc6f25;
	    color: #cc6f25;
	}
	
	.content {
		width: 100%;
		overflow: hidden;
		height:600px;
	}
	
	.left {
		top: 41px;
		float: left;
		width: 25%;
		height: 100%;
		background:#E9E9E9;
	}
	
	.left> ul {
		list-style: none;
	}
	
	.left >ul >li {
		padding: 15px 5px;
		text-align: center;
		font-size:0.09rem;
	}
	
	.active {
		background: #fff;
		border-left: 2px solid #3190e8;
	}
	
	.right {
		float: left;
		width: 75%;
		height: 100%;
		font-size:0.08rem;
	}
	
	.right ul {
		list-style: none;
	}
	
	.class-title {
		padding: 7px 10px;
		background:#F5F7F6;
		height:50px;
		line-height:50px;
	}
	
	.item {
		overflow: hidden;
		width: 100%;
		padding: 10px;
		background: #fff;
		border-bottom: 1px solid #eee;
	}
	
	.item-left {
		float: left;
	}
	
	.item-right {
		float: left;
		padding: 0 10px;
	}
	
	.item-img img{
		display:inline-block;
		width: 100px;
		height: 100px;
		margin:30px;
		
	}
	
	.title {
		height: 50px;
		line-height:60px;
	}
	
	.subtitle {
		height: 50px;
		line-height:50px;
	}
	
	.price {
		height: 50px;
		line-height:50px;
	}
	.price >p{
		display:inline-block;
		margin-left:300px;
	}
	.price> p> span{
		margin:0 10px;
		color:deepskyblue;
		font-size:20px;
	}
	
	.foot{
		width:100%;
		height:100px;
		background:rgb(160, 94, 41);
		display:flex;
		border-top:1px solid #ccc;
		justify-content:space-around;
		position:fixed;
		bottom:0;
		left:0;
		border-radius:30px;
	}	
	.foot >span{
		width:70%;
		line-height:100px;
		font-size:30px;
		color:#CCCCCC;
		text-align: center;
	}
	.foot i{
		width:30%;
		font-size:30px;
		color:#CCCCCC;
		text-align: center;
		line-height:100px;
		font-style: normal;
		border-left:1px solid #ccc;
	}
</style>

<style>
	.addNum{
		margin-left:1rem;
		margin-top:0.04rem;
	}
	.addBtn{
		width:0.1rem;
		height:0.1rem;
		border-radius:50%;
		margin-top:-0.2rem;
		background:#FF8C00;
		color:#000;
		line-height:0.1rem;
		text-align:center;
		display:inline-block;
	}
	.el-popover{
		font-size:0.1rem;
	}
	.footCar>li{
		line-height:0.5rem;
	}
	.buySpan{
		display:inline-block;
		width:30px;
		height:30px;
		border-radius: 50%;
		background:red;
		color:#fff;
		margin-left:-140px;
		margin-top:-10px;
		text-align:center;
		line-height:30px;
	}
	.carSpan{
		position:relative;
		top:0;
		left:-0.45rem;
	}
	.buySpan{
		position:relative;
		top:-0.04rem;;
		left:0.05rem;
	}
	.priceSpan{
		position:relative;
		top:0;
		left:0.55rem;
		color:#000;
	}
/*https://www.lanrenzhijia.com/js/css3/3198.html微信支付*/
</style>