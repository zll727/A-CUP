<template>
	<div>
		<div class="toolbar">
			<el-form :inline="true" class="demo-form-inline">
			  <el-form-item label="搜索">
			    <el-input placeholder="管理员名称"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary">查询</el-button>
			  </el-form-item>
			  <el-form-item>
			    <!--<el-button type="primary" @click="$refs.shoptype.$data.dialogFormVisible=true">添加店铺类别</el-button>-->
			 	<el-button type="primary" @click="addAdmin">添加管理员</el-button>
			  </el-form-item>
			</el-form>
		</div>
		
		<div class="shopTypeList">
			<el-table  :data="adminList" border>
				<!--<el-table-column label="ID" prop="_id"></el-table-column>-->
				<el-table-column label="管理员名称" prop="adminName"></el-table-column>
				<!--<el-table-column label="管理员密码" prop="adminPwd"></el-table-column>-->
				
				
				
				<el-table-column label="添加时间" prop="addTime">
					<template slot-scope='scope'>
						{{scope.row.addTime | date}}
					</template>
				</el-table-column>
				<!--<el-table-column label="管理员头像">
					<template slot-scope="scope">
						<div>{{scope.row.shopTypePic}}</div>
						<div>
							<img width="100":src="'http://127.0.0.1/'+scope.row.shopTypePic"/>
							<img width="40":src="scope.row.adminPic | imgUrl"/>
						</div>
					</template>
				</el-table-column>-->
				<el-table-column label="管理员头像">
					<template slot-scope="scope">
						<img width="100":src="scope.row.adinPic | imgUrl"/>
					</template>
				</el-table-column>
				
				<el-table-column label="操作">
			      <template slot-scope="scope">
			      	<el-button size="mini" type="primary">编辑</el-button>
			      	<el-button size="mini" type="danger" @click="delAdmin(scope.row._id)">删除</el-button>
			      </template>
			 	</el-table-column>
			</el-table>
			<div class="toolbar">
				<el-pagination
				  background
				  :current-page.sync="pageIndex"
				  @current-change="getAdminList"
				  layout="prev, pager, next"
				  :page-count="pageSum">
				</el-pagination>
		   </div>
		</div>
	</div>
</template>
<script>
	export default{
		name:"add-admin",
		data(){
			return{
				dialogFormVisible:false,
				adminVisible:false,
				adminList:[],
				pageSum:1,
				pageIndex:1
			}
		},
		methods:{
			//删除店铺
			delAdmin(id){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$axios.delete("/delAdmin",{
		          	params:{
		          		id
		          	}
		          }).then(data=>{
		          	//console.log(data);
		          	if(data.ok===1){
		          		this.getAdminList();
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
			getAdminList(){
				this.$axios.get("/getAdminList")
					.then(data=>{
						this.adminList=data.adminList;//渲染在页面上
						console.log(data.adminList);
					})
			},
		    addAdmin(){
				if(localStorage.adminName=="admin"){
					this.$router.push('addaAdmin');
					console.log("11111111");
						
				}else{
					this.$message.error("您没有此权限");
				}
			}
		
		},
		mounted(){
			this.getAdminList();
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