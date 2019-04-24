<template>
	<div>
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<meta name="format-detection" content="telephone=no" />
		<meta name="format-detection" content="email=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />

		<h3 class="title1">我的订单</h3>
		<ul class="goods">
			<li v-for="item in carList">
				<div>
					<p style="color:#cc6f25">商品名称：{{item.goodName}}</p>
					<div class="item-img">
						<img width="0.5rem" :src="item.goodPic | imgUrl"/>
					</div>
					<p>价格：{{item.price | currency}}</p>
					<p>添加时间：{{item.buyTime | date}}</p>
					<p>订单数量： 
						<button @click="updateNum(item._id,0)">-</button>
						<span>{{item.buyNum}} </span>
						<button @click="updateNum(item._id,1)">+</button>
					</p>
					<p style="color:#008000">小计：{{item.price*item.buyNum | currency}}</p>
					
				</div>
				<hr />
			</li>
			<div style='margin-top:50px;'>
				<span style="color:#cc6f25;font-size:0.14rem;margin:0.1rem 0 0 1rem">
					总价：{{sumPrice | currency}}
				</span>
				<span class='subPrice'
					  @click=''>提交订单
				</span>
			</div>
		</ul>
		<Foot></Foot> 
	</div>
</template>

<script>
	import axios from "axios";
	import Foot from "../common/Footer";
	export default{
		name:"order",
		components:{
			Foot
		},
		data(){
			return{
				carList:[]
			}
		},
		methods:{
			joinCar(id){
				//加入购物车
				axios.get("http://127.0.0.1/joinCar",{
					params:{
						id
					}
				}).then(({data})=>{
					console.log(data);
					if(data.ok===1){
						this.getGoodList();
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
					console.log(22222,data);
				})
			},
			getCarList(){
				axios.get("http://127.0.0.1/getCarLists").
				then(({data})=>{
					this.carList=data.carList;
					console.log(11111,this.carList);
				})
			},
			changeCarInfo(id,isOk){//改变
				axios.get("http://127.0.0.1/changeCarInfo",{
					params:{
						id,
						isOk
					}
				}).then(({data})=>{
					this.getCarList();
				})
			},
			
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
			}
			
		},
		
		mounted(){
			this.getCarList();
		}
	}
</script>

<style>
html{font-size:31.25vw;}  
body{ font-size:16px;}
.title1{
	width:100%;
	height:0.5rem;
	background:#cc6f25;
	color:#fff;
	text-align:center;
	line-height:0.5rem;
	font-size:0.2rem;
	position:fixed;
	z-index:99;
}
.goods {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0.5rem;
    margin-bottom: 2rem;
}
.goods li{
	line-height:0.2rem;
	color:#333333;
	font-size:0.1rem;
	margin-left:0.1rem;
}
.goods span{
	color:#cc6f25;
}
.goods button{
	width:30px;
	height:30px;
	background:#cc6f25;
}
.subPrice{
	display:inline-block;
	background:orange;
	width:200px;height:50px;
	color:#cc6f25;
	font-size:0.14rem;
	text-align:center;
	margin-left:50px;
}
</style>