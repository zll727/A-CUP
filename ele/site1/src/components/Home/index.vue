<template>
<div>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<meta name="format-detection" content="telephone=no" />
		<meta name="format-detection" content="email=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<!--<input type="button" value="弹出" @click="fn" />-->
	<NavBar></NavBar>
	<ShopType></ShopType>
	<Adv></Adv>
	<Shop></Shop>
	<Footer></Footer>
</div>
</template>

<script>
	import ShopType from "./ShopType";
	import NavBar from "../common/NavBar"
	import Adv from "./Adv"
	import Shop from "./Shop"
	import Footer from "../common/Footer"
	export default{
		name:"index",
		components:{
			NavBar,
			ShopType,
			Adv,
			Shop,
			Footer
		},
		
	}
</script>

<style>
@charset "utf-8";
/* CSS Document */
/*
rem
根元素字体大小
1rem=根元素字体大小

----------
vw
1vw=视窗宽度的1% 
窗口640px    原图的一半320px  iphone5
1vw=3.2px
31.25vw=100px


vw
1vw=视窗宽度的1% 
窗口750px    原图的一半是375px   iphone6
1vw=3.75px
26.66vw=100px

*/
/*html{font-size:31.25vw;}      /*根目录字体大小*/

/*样式重置*/
body,ul,li,dl,dt,dd,p,ol,h1,h2,h3,h4,h5,h6,form,input,
img,table,fieldset,legend,a,p,span,em,i{margin:0; padding:0;}
ul,li,ol{list-style:none;}
img,fieldset{border:0; }
img{display:block;}
a{text-decoration:none; color:#333;}
h1,h2,h3,h4,h5,h6{font-weight:100;}
body{ font-family:"微软雅黑"; font-size:16px;}
input,a{outline:none;}
</style>