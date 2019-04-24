<template>
	<el-dialog title="添加商品" :visible="GoodVisible" @update:visible="v=>$emit('update:GoodVisible',v)">
	
	  <el-form>
	    <el-form-item label="商品名称">
	      <el-input ref="goodName" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="商品图片">
	      <el-upload
			  class="upload-demo"
			  ref="upload"
			  action=""
			  :limit="1"
			  :on-change="upChange"
			  :on-exceed="exceed"
			  :auto-upload="false">
			  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
			 <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		  </el-upload>
		  <img v-if="goodPic.length>0" :src="goodPic" />
	    </el-form-item>
	    <el-form-item label="商品价格">
	      <el-input ref="price" autocomplete="off"></el-input>
	    </el-form-item>
	    
	    
	    <el-form-item label="店铺类别名">
    	  <el-select v-model="shopTypeId" @change="getShop(shopTypeId)" placeholder="请选择">
		    <el-option
		      v-for="item in shopTypeList"
		      :key="item._id"
		      :label="item.shopTypeName"
		      :value="item._id">
		    </el-option>
		  </el-select>
	    </el-form-item>
	    
	    <el-form-item label="店铺名">
    	  <el-select v-model="shopId" placeholder="请选择">
		    <el-option
		      v-for="item in shopList"
		      :key="item._id"
		      :label="item.shopName"
		      :value="item._id">
		    </el-option>
		  </el-select>
	    </el-form-item>
	    
	    
	  </el-form>
	  
	  <div slot="footer" class="dialog-footer">
	    <!--<el-button @click="$emit('changevisible',false)">取 消</el-button>-->
	    <el-button @click="$emit('update:GoodVisible',false)">取 消</el-button>
	    <el-button type="primary" @click="addGood">提交</el-button>
	  </div>
	</el-dialog>

</template>

<script>
	export default{
		props:["GoodVisible","shopid","getGoodList","goodId"],
		name:"add-goods",
		data(){
			return{
				shopId:"",
				shopList:[],
				goodPic:"",
				shopTypeList:[],
				shopTypeId : ""
			}
		},
		methods:{
			//改变上传图片
			upChange(file){
                this.$refs.upload.clearFiles();
                var reader=new FileReader();
                reader.readAsDataURL(file.raw);
                //转为base64
                var _this=this;
                reader.onload=function(){
                    _this.goodPic=this.result;
                }
            },
//          //获取店铺类别列表
			getShopType(){
            	this.$axios.get("/getShopType")
	            .then(data=>{
	            	this.shopTypeList=data.shopTypeList;
	            })
           },

			getShopList(){
				this.$axios.get("/getShopList")
					.then(data=>{
						this.shopList=data.shopList
					})
			},
			
            //获取一条店铺信息
			getShop(shopTypeId){
				console.log(shopTypeId,2222);
            	this.$axios.get("/getShop",{
            		params:{
            			shopTypeId
            		}
            	}).then(data=>{
	            	this.shopList=data.shopInfo;
	            })
           },
			addGood(){
				var formdata=new FormData();
				formdata.set("goodName",this.$refs.goodName.$data.currentValue);
				//图片是文件，所以加files[0],不然会报错size<0
				formdata.set("goodPic",document.querySelector(".el-upload__input").files[0]);
				formdata.set("shopId",this.shopId);
				formdata.set("shopTypeId",this.shopTypeId);
				formdata.set("price",this.$refs.price.$data.currentValue);
				
				if(this.goodId.length>0){//修改
					formdata.set("goodId",this.goodId);
					this.$axios.put("/addGood",formdata)
					.then(data=>{

						if(data.ok===1){
							this.$emit("update:GoodVisible",false);
							this.$message({
								message:data.msg,
								type:"success"
							});
							if(this.getGoodList){
								this.getGoodList();
							}
							else{
								this.$router.push("/goodManage");
							}
						}else{
							this.$message.error(data.msg);
						}
					})
				}
				else{
					this.$axios.post("/addGood",formdata)
					.then(data=>{
						this.$emit("update:GoodVisible",false);
						this.getGoodList();
						if(data.ok===1){
							this.$message({
								message:data.msg,
								type:"success"
							});
							this.getGoodList();
						}else{
							this.$message.error(data.msg);
						}
					})
				}
				
			},
			//获取一条商品信息
            getGoodInfo(){
		   		this.$axios.get("/getGoodInfo",{
		   			params:{
		   				goodId:this.goodId
		   			}
		   		}).then(data=>{
		   			this.goodInfo=data.goodInfo;
		   			this.$refs.goodName.$data.currentValue=data.goodInfo.goodName;
		   			this.shopTypeId=data.goodInfo.shopTypeId;
		   			this.shopId=data.goodInfo.shopId;
		   			this.goodPic=data.goodInfo.goodPic;
		   			this.shopId=data.goodInfo.shopId;
		   		
		   		})
		   	},
			//限制图片数量
			exceed(){
				this.$message.error("你已经上传了图片")
			},
		},
		mounted(){
			this.getShopType();
			this.getShopList();
			//this.getGoodInfo();
			this.shopId=this.shopid;
			if(this.goodId.length>0){
				this.getGoodInfo();
			}
			
		}
	}
</script>

<style>
</style>