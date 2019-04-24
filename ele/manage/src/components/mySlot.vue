<template>
	<div>
		slot插槽{{num}}
		<!--<input type="button" value="aa" @click="$emit('changenum',13)"/>-->
		<!--<input type="button" value="aa" @click="$emit('update:changenum',13)"/>-->
		<input type="button" value="aa" @click="$emit('update:num',13)"/>
		
			
		<!--没有名字的插槽叫做匿名插槽   （ 有name 属性的）有名字的插槽叫做具名插槽 -->
		<!--写在父组件里的      以子组件作为模板的里面的内容       在子组件里面显示出来-->
		<!--匿名插槽-->
		<!--具名插槽-->
		<!--userName是卡槽的一个属性-->
		<!--<slot></slot>
		<slot name="one"></slot>
		<slot name="two"></slot>
		
		<slot name="three" userName="abc" :arr="arr"></slot>-->
	</div>
</template>

<script>
	export default{
		name:"my-slot",
		props:["num"],
		data(){
			return{
				arr:[1,2,3,4]
			}
		},
	}
</script>

<style>
</style>