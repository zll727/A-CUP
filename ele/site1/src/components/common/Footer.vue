<template>
		<footer>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<meta name="format-detection" content="telephone=no" />
		<meta name="format-detection" content="email=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<a href="javascript:;" @click="$router.push('/Index')">
	    	<em>🏠</em>
	        <span>首页</span>
	    </a>
	    <a class="em2" href="javascript:;" @click="$router.push('/Find')">
	    	<em>🔍</em>
	        <span>发现</span>
	    </a>
	    <a href="javascript:;" @click="$router.push('/Order')">
	    	<em>🛒</em>
	        <span>订单</span>
	    </a>
	    <a href="javascript:;" @click="$router.push('/My')">
	    	<em>📱</em>
	        <span>我的</span>
	    </a>
	  </footer>
</template>

<script>
	export default{
		name:"foot",
	}
</script>

<style>
	*{
	margin:0;
	padding:0;
}
	/*------------------------------footer----------------------------*/
footer{
	width:100%;
	height:0.5rem;
	background:rgb(202, 109, 37);
	display:flex;
	border-top:1px solid #ccc;
	justify-content:space-around;
	position:fixed;
	bottom:0;
	left:0;}	
	
footer a{
	color:#ccc;
	float:left;
	text-align:center;
	position:relative;
	}
 
footer a em{
	margin-top:0.1rem;
	font-family:'iconfont';
	display:block;
	font-size:0.19rem;
	color:#2C3E50;
	font-style:normal;}
footer a span{
	display:block;
	font-size:0.09rem;
	}	
	
footer a:nth-child(2):after{
	content:'';
	display:block;
	width:0.07rem;
	height:0.07rem;
	background:#ff5f00;
	border-radius:50%;
	position:absolute;
	right:0;
	top:0.09rem;
	}	
footer a:nth-child(3){
	color:#F00;}
</style>