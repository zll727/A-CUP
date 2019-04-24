<template>
	<div>
		<div class="toolbar">
			<el-form :inline="true" class="demo-form-inline">
			  <el-form-item label="搜索">
			    <el-input placeholder="类别"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary">查询</el-button>
			  </el-form-item>
			  <el-form-item>
			    <!--<el-button type="primary" @click="$refs.shoptype.$data.dialogFormVisible=true">添加店铺类别</el-button>-->
			 	<el-button type="primary" @click="dialogFormVisible=true">添加店铺类别</el-button>
			  </el-form-item>
			</el-form>
		</div>
		
		<div class="shopTypeList">
			<el-table  :data="shopTypeList" border>
				<!--<el-table-column label="ID" prop="_id"></el-table-column>-->
				<el-table-column label="店铺类别名称" prop="shopTypeName"></el-table-column>
				<el-table-column label="店铺类别图片">
					<template slot-scope="scope">
						<!--<div>{{scope.row.shopTypePic}}</div>-->
						<div>
							<!--<img width="100":src="'http://127.0.0.1/'+scope.row.shopTypePic"/>-->
							<img width="100":src="scope.row.shopTypePic | imgUrl"/>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作">
			      <template slot-scope="scope">
			      	<el-button size="mini" type="primary">编辑</el-button>
			      	<!--<el-button size="mini" type="primary" @click="ShopVisible=true">添加店铺</el-button>-->
			      	<el-button size="mini" type="primary" @click="openShop(scope.row._id)">添加店铺</el-button>
			        <el-button  size="mini" type="danger" @click="delShopType(scope.row._id)">删除</el-button>
			      </template>
			 	</el-table-column>
			</el-table>
			<div class="toolbar">
				<el-pagination
				  background
				  :current-page.sync="pageIndex"
				  @current-change="getShopType"
				  layout="prev, pager, next"
				  :page-count="pageSum">
				</el-pagination>
				<!--:current-page.sync:"pageIndex"
					当前页发生变化时，pageIndex也会发生变化(关联)
				  :current-page.sync:"pageIndex"
				  @current-change="getaLogList"-->
		    </div>
			
		</div>
		<!--方法1：@click="$refs.shoptype.$data.dialogFormVisible=true"
			点击添加商品类别时执行该函数，不能加this-->
		<!--<addShopType ref="shoptype"></addShopType>-->
		
		<!--方法2：子向父传值-->
		<!--<addShopType :dialogFormVisible="dialogFormVisible" @changevisible="v=>dialogFormVisible=v"></addShopType>-->
		<!--简写  :getShopType="getShopType"传递方法 :dialogFormVisible.sync~传递数据-->
		<addShopType :getShopType="getShopType" :dialogFormVisible.sync="dialogFormVisible"></addShopType>
		<addShop :shopId="''" v-if="ShopVisible" :typeId="typeId" :ShopVisible.sync="ShopVisible"></addShop>
	</div>
</template>

<script>
	import addShopType from "./addShopType";
	import addShop from "./addShop"
	export default{
		name:"shop-type",
		data(){
			return {
				typeId:"",
				dialogFormVisible:false,
				ShopVisible:false,
				shopTypeList:[],
				pageIndex:1,
				pageSum:1
			}
		},
		components:{
			addShopType,
			addShop
		},
		methods:{
			
			//获取店铺类别列表
			getShopType(pageIndex){
				this.$axios.get("/getShopType",{
					params:{
						pageIndex
					}
				}).then(data=>{
					this.shopTypeList=data.shopTypeList;
					this.pageSum=data.pageSum;
				})
			},
//			delShopType(id){
//				this.$axois.get("delShopType",{
//					params:{
//						id
//					}
//				}).then(data=>{
//					this.shopTypeList=data.shopTypeList;
//					this.getShopType();
//				})
//			},

			delShopType(id){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$axios.delete("/delShopType",{
		          	params:{
		          		id
		          	}
		          }).then(data=>{
		          	if(data.ok===1){
		          		this.getShopType(this.pageIndex);
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
			
			openShop(id){
				this.typeId=id;
				this.ShopVisible=true;
			}
		},
		mounted(){
			this.getShopType(1);
		}
	}
</script>

<style>
	.el-table th>.cell {
	text-align: center;
}
.el-table td{
	text-align: center;
}
</style>