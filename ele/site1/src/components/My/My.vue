<template>
<div class="my">
	<header>
		<dl id='myTitle'>
			<dd><img src="../../../../../myapp1/src/assets/img/bg.jpg"></dd>
			<dt style='width:0.8rem;padding-left:0.2rem;color:#333333;font-size:0.2rem'>zll</dt>
		</dl>
	</header>
	<ul id='content'>
		<li>
			<dl>
				<dt>⭐</dt>
				<dd>收藏</dd>
			</dl>
		</li>
		<li>
			<dl>
				<dt>✉</dt>
				<dd>评价</dd>
			</dl>
		</li>
		<li>
			<dl>
				<dt>⏰</dt>
				<dd>最近浏览</dd>
			</dl>
		</li>
	</ul>
	<div id='main'>
		<h5 style='line-height:0.3rem;font-size:0.1rem;padding-left:0.2rem;'>热门服务</h5>
		<img src='../../assets/IMG_20190407_154526.jpg'>
	</div>
	<Foot></Foot>
</div>
</template>

<script>
	import Foot from "../common/Footer";
	export default{
		name:"my",
		components:{
			Foot
		}
	}
</script>

<style>
	.my{
		font-size:60px;
	}
	header{
		width:100%;
		height:1rem;
		background:#cc6f25;
	}
	#myTitle{
		margin-top:-0.1rem;
		width:2rem;
		position:relative;
		top:0.6rem;
		left:40%;
	}
	#myTitle img{
		display:block;
		width:0.6rem;
		height:0.6rem;
		border-radius:50%;
	}
	#myTitle dd{
	    width: 0.8rem;
	    text-align: center;
	    font-size: 0.25rem;
	    color: #000;
	}
	
	#content{
		width:100%;
		display:flex;
		justify-content: space-around;
		margin-top:0.55rem;
		padding-bottom:0.2rem;
		border-bottom: 1px solid #CCCCCC;
	}
	#content dt{
		text-align: center;
		font-size:0.2rem;
	}
	#content dd{
		font-size:0.1rem;
		text-align: center;
		color:#333333;
	}
	#main img{
		display:block;
		width:100%;
		height:3rem;
	}
</style>