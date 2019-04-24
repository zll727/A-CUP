<template>
	<div>
		<div class="toolbar">
			<el-form :inline="true" class="demo-form-inline">
			  <el-form-item label="搜索">
			    <el-input type='text' placeholder="商品" ref="goodName"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="getGoodList">查询</el-button>
			  </el-form-item>
			  <!--<el-form-item>
			 	<el-button type="primary" @click="editGood('')">添加商品</el-button>
			  </el-form-item>-->
			</el-form>
		</div>
		
		<el-table :data="goodList" border>
			<!--<el-table-column label="ID" prop="_id"></el-table-column>-->
			<el-table-column label="商品名称" prop="goodName"></el-table-column>
			<el-table-column label="店铺名称" prop="shopInfo[0].shopName"></el-table-column>
			<el-table-column label="添加时间">
				<template slot-scope="scope">
	      			{{scope.row.addTime | date}}
				</template>
			</el-table-column>
			<el-table-column label="商品图片">
				<template slot-scope="scope">
					<img width="100":src="scope.row.goodPic | imgUrl"/>
				</template>
			</el-table-column>
			<el-table-column label="价格">
				<template slot-scope="scope">
					{{scope.row.price | currency}}
				</template>
			</el-table-column>
			
			<el-table-column label="操作">
				<template slot-scope="scope">
			      	<el-button size="mini" @click="editGood(scope.row._id)">编辑</el-button>
			        <el-button  size="mini" type="danger" @click="delGood(scope.row._id)">删除</el-button>
			    </template>
			</el-table-column>
		</el-table>
		
		<!--分页-->
	   <div class="toolbar">
			<el-pagination
			  background
			  :current-page.sync="pageIndex"
			  @current-change="getGoodList"
			  layout="prev, pager, next"
			  :page-count="pageSum">
			</el-pagination>
	    </div>
	    
	    <addGoods v-if="GoodVisible" :goodId="goodId" :getGoodList="getGoodList" :GoodVisible.sync="GoodVisible"></addGoods>
	    
	</div>
</template>

<script>
	import addGoods from "./addGoods"
	export default{
		name:"good-manage",
		data(){
			return{
				GoodVisible:false,
				goodList:[],
				pageSum:1,
				pageIndex:1,
				goodId:""
			}
		},
		components:{
			addGoods
		},
		methods:{
			//获取商品列表
			getGoodList(pageIndex){
				this.$axios.get("/getGoodList",{
					params:{
						pageIndex,
						goodName:this.$refs["goodName"].$data.currentValue
					}
				}).then(data=>{
						console.log(this.goodList);
						this.goodList=data.goodList;
						this.pageSum=data.pageSum;
						console.log(data,343434);
				})
			},
			//删除商品
			delGood(id){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$axios.delete("/delGood",{
		          	params:{
		          		id
		          	}
		          }).then(data=>{
		          	//console.log(data);
		          	if(data.ok===1){
		          		this.getGoodList(this.pageIndex);
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
			
			//编辑(添加)商品
			editGood(id){
				console.log(id);
				this.GoodVisible=true;
				this.goodId=id;
			},
		},
		mounted(){
			this.getGoodList(1);
		}
		
	}
</script>

<style>
</style>