<template>
	<div>
		<!--父子，子父传值练习-->
		<!--<my :num="num"></my>-->
		<!--<my :num="num" @changenum="function(v){num=v}"></my>-->
		<!--<my :num="num" @changenum="v=>num=v"></my>-->
		<!--<my :num="num" @update:changenum="v=>num=v"</my>-->
		<!--<my :num="num" :change.sync="num"></my>-->
		<!--<my :num.sync="num"></my>-->
		

	<div class="toolbar">
	  	<el-form :inline="true" class="demo-form-inline">
		  <el-form-item label="审批人">
		    <el-input placeholder="审批人"></el-input>
		  </el-form-item>
		  <el-form-item label="活动区域">
		    <!--<el-select placeholder="活动区域">
		      <el-option label="区域一" value="shanghai"></el-option>
		      <el-option label="区域二" value="beijing"></el-option>
		    </el-select>-->
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary">查询</el-button>
		  </el-form-item>
		</el-form>
	  </div>
	  <el-table
		v-loading="loading"
	    :data="adminLogList"
	    style="width: 100%"
	    border>
	    <el-table-column
	      label="id">
	      <template slot-scope="scope">
	        <i class="el-icon-time"></i>
	        <span style="margin-left: 10px">{{ scope.row._id }}</span>
	      </template>
	    </el-table-column>
	    <el-table-column
	      label="添加时间"
	    >
	    <!--prop="addTime"，这样不能加过滤器       写在label下面-->
	      <template slot-scope="scope">
	      	{{scope.row.addTime | date}}
	      </template>
	    </el-table-column>
	    <el-table-column
	      label="管理员账号"
	    >
	   	 <!--prop="adminInfo[0].adminName"  写在label下面-->
	      <template slot-scope="scope">
	      	{{scope.row.adminInfo[0].adminName}}
	      </template>
	    </el-table-column>
	    
	    <el-table-column label="类型">
	    	<template slot-scope="scope">
	    		{{scope.row.logInfo[0].typeName}}
	    		<!--{{adminLogEnum[scope.row.loginType]}}-->
	    	</template>
	    </el-table-column>
	    
	    <el-table-column label="说明">
	    	<template slot-scope="scope">
	    		{{scope.row.details}}
	    	</template>
	    </el-table-column>
	    <el-table-column label="操作">
	      <template slot-scope="scope">
	        <el-button
	          size="mini"
	          type="danger"
	          @click="handleDelete(scope.row._id)">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <div class="toolbar">
			<el-pagination
			  background
			  :current-page.sync="pageIndex"
			  @current-change="getLogList"
			  layout="prev, pager, next"
			  :page-count="pageSum">
			</el-pagination>
			<!--:current-page.sync:"pageIndex"
				当前页发生变化时，pageIndex也会发生变化(关联)
			  :current-page.sync:"pageIndex"
			  @current-change="getaLogList"-->
	  </div>
	  
	</div>
  

</template>

<script>
	import my from "@/components/mySlot"
	export default{
		name:"admin-log",
		data(){
			return{
				adminLogList:[],
				pageSum:1,
				adminLogEnum:{},
				loading:true,
				//num:11111,
				pageIndex:1
			}
		},
//		components:{
//			my
//		},
		methods:{
			getLogList(pageIndex){
				this.loading=true;
				this.$axios.get("/getAdminLogList",{
					params:{
						pageIndex
					}
				}).then(data=>{
					this.loading=false;
					this.adminLogList=data.adminLogList;
					this.pageSum=data.pageSum;
					//this.adminLogEnum=data.adminLogEnum;
				})
			},
//			handleDelete(id){//删除
//	//				console.log(id);
//	  			this.$axios.get("/delLog",{
//	      			params:{
//	      				id
//	      			}
//		      }).then(data=>{
//		  				console.log(data);
//		  				this.getLogList();
//		  		})
//				}
//			},

			handleDelete(id){
				console.log(this.pageIndex);
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$axios.delete("/adminLogList",{
		          	params:{
		          		id
		          	}
		          }).then(data=>{
		          	//console.log(data);
		          	if(data.ok===1){
		          		//this.getLogList();
		          		this.getLogList(this.pageIndex);
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
        	}
		},
		mounted(){
			this.getLogList(1);
		}
	}
</script>

<style>
	.el-table th,.el-table td{
		text-align:center;
	}
	.toolbar{
		background:#F3F8FD;
		margin:10px 0;
		padding:10px;
	}
	.toolbar .el-form-item{
		margin-bottom:0;
	}
</style>