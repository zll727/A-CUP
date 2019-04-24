<template>
<div class="find">
	<h3 class="title2">发现</h3>
	<ul id='findMain'>
		<li><img src='../../assets/timg (1).jpg'/></li>
		<li><img src='../../assets/timg (2).jpg'/></li>
		<li><img src='../../assets/timg (3).jpg'/></li>
		<li><img src='../../assets/timg.jpg'/></li>
		<li><img src='../../assets/timg (4).jpg'/></li>
		<li><img src='../../assets/timg (5).jpg'/></li>
		<li><img src='../../assets/timg (7).jpg'/></li>
		<li><img src='../../assets/timg (8).jpg'/></li>
	</ul>
	<Foot></Foot>
</div>

</template>

<script>
	import Foot from "../common/Footer";
	export default{
		name:"find",
		components:{
			Foot
		}
	}
</script>

<style>
	*{margin:0;padding:0;}
	ul,li{list-style: none;}
	.find{
		font-size:50px;
		color:#FF5F00;
	}
	.title2{
	width:100%;
	height:0.5rem;
	text-align:center;
	line-height:0.5rem;
	font-size:0.2rem;
	position:fixed;
	z-index:99;
	background:#fff;
	color:#cc6f25;
}	
	
	#findMain{
		display:flex;
		flex-direction:row;
		flex-wrap:wrap;
		justify-content: space-around;
		align-content:space-around;
		position: relative;
    	top: 0.6rem;
	}
	#findMain >li{
		width:45%;
		height:2rem;
		border:1px solid #333333;
		margin-bottom:0.1rem;
	}
	#findMain img{
		display:block;
		width:100%;
		height:2rem;
		margin:0;
	}
</style>