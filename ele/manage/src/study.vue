<template>
	<div>
		学习
		<mySlot>
			<p>啦啦啦</p>
			<p slot="one">one</p>
			<p slot="two">two</p>
			<!--slot-scope="item"，卡槽的域，item可以任意起名-->
			<!--卡槽里面的属性都作为item这个对象的属性来用-->
			<div slot="three" slot-scope="item">
				我的名字自是three {{item.userName}}
				<p v-for="v in item.arr">{{v}}</p>
			</div>
			
		</mySlot>
	</div>
</template>

<script>
	import mySlot from '@/components/mySlot'
	export default{
		name:"study",
		components:{
			mySlot
		}
	}
</script>

<style>
</style>