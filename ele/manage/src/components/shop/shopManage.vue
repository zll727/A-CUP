<template>
	<div>
		<div class="toolbar">
			<el-form :inline="true" class="demo-form-inline">
			  <el-form-item label="搜索">
			    <el-input type='text' placeholder="店铺搜索" ref="shopName"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="getShopList">查询</el-button>
			  </el-form-item>
			  <!--<el-form-item>
			 	<el-button type="primary" @click="editShop('')">添加店铺</el-button>
			  </el-form-item>-->
			</el-form>
		</div>
		
		<el-table :data="shopList" border>
			<!--<el-table-column label="ID" prop="_id"></el-table-column>-->
			<el-table-column label="店铺名称" prop="shopName"></el-table-column>
			<el-table-column label="店铺类别" prop="typeInfo[0].shopTypeName"></el-table-column>
			<el-table-column label="添加时间">
				<template slot-scope="scope">
	      			{{scope.row.addTime | date}}
				</template>
			</el-table-column>
			<el-table-column label="店铺图片">
				<template slot-scope="scope">
					<img width="100":src="scope.row.shopPic | imgUrl"/>
				</template>
			</el-table-column>
			
			<el-table-column label="操作">
				<template slot-scope="scope">
			      	<el-button size="mini" @click="editShop(scope.row._id)">编辑</el-button>
			      	<!--<el-button size="mini" type="primary" @click="ShopVisible=true">添加店铺</el-button>-->
			      	<el-button size="mini" type="primary" @click="addGoods(scope.row._id)">添加商品</el-button>
			        <el-button  size="mini" type="danger" @click="delShop(scope.row._id)">删除</el-button>
			    </template>
			</el-table-column>
		</el-table>
		
		<!--分页-->
		<div class="toolbar">
			<el-pagination
			  background
			  :current-page.sync="pageIndex"
			  @current-change="getShopList"
			  layout="prev, pager, next"
			  :page-count="pageSum">
			</el-pagination>
	    </div>
 	   
	    <addShop v-if="ShopVisible" :shopId="shopId" :getShopList="getShopList" :ShopVisible.sync="ShopVisible"></addShop>
		<addGoods :goodId="''" v-if="GoodVisible" :shopid="shopId"  :GoodVisible.sync="GoodVisible"></addGoods>
	</div>
	
	
</template>

<script>
	import addShop from "./addShop"
	import addGoods from "../good/addGoods"
	export default{
		name:"shop-manage",
		data(){
			return {
				GoodVisible:false,
				ShopVisible:false,
				shopList:[],
				pageSum:1,
				pageIndex:1,
				shopId:"",
				
			}
		},
		components:{
			addShop,
			addGoods
		},
		methods:{
			//获取店铺列表
			getShopList(pageIndex){
				this.$axios.get("/getShopList",{
					params:{
						pageIndex,
						shopName:this.$refs["shopName"].$data.currentValue
					}
				}).then(data=>{
					this.shopList=data.shopList;
					this.pageSum=data.pageSum
				})
			},
			
			//删除店铺
			delShop(id){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$axios.delete("/delShop",{
		          	params:{
		          		id
		          	}
		          }).then(data=>{
		          	//console.log(data);
		          	if(data.ok===1){
		          		this.getShopList(this.pageIndex);
		          		this.$message({
				            type: 'success',
				            message: '删除成功!'
				          });
		          	}else{
		          		this.$message({
				            type: 'info',
				            message: '删除失败'
				        });
		          	}
		        })
		    }).catch(() => {
	                this.$message({
	                type: 'info',
	                message: '已取消删除'
	            });
	       });
		   },
		   	
		   	//搜索店铺
		   	
		    //编辑店铺
		    editShop(id){
		    	console.log(111111,id);
		    	this.shopId=id;
		   		this.ShopVisible=true;
		   		this.getShopInfo();
		   	},
		    
		    //添加商品
		    addGoods(id){
		    	this.shopId=id;
		    	this.GoodVisible=true;
		    	console.log(id);
		    },
		    
		    
		    
		    //获取一条店铺记录
		   	getShopInfo(){
		   		this.$axios.get("/getShopInfo",{
		   			params:{
		   				shopId:this.shopId
		   			}
		   		}).then(data=>{
		   			this.shopInfo=data.shopInfo;
		   			this.$refs.shopName.$data.currentValue=data.shopInfo.shopName;
		   			//this.shopId=data.shopInfo.shopId;
		   			this.shopPic=data.shopInfo.shopPic;
		   			this.shopTypeId=data.shopInfo.shopTypeId;
		   			
		   			console.log(12,data.shopInfo.shopName);
		   			
		   		})
		   	},
		},
		mounted(){
			this.getShopList(1);
		}
	}
</script>

<style>
</style>