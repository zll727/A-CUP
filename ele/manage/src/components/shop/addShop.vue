<template>
	<!--<el-dialog title="收货地址" :visible.sync="dialogFormVisible">-->
	<!--<el-dialog title="添加店铺类别" :visible="dialogFormVisible" @update:visible="v=>$emit('changevisible',v)">-->
	<el-dialog title="添加店铺" :visible="ShopVisible" @update:visible="v=>$emit('update:ShopVisible',v)">
	
	  <el-form>
	    <el-form-item label="店铺名称">
	      <el-input ref="shopName" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="店铺图片">
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
		  <img v-if="shopPic.length>0" :src="shopPic" />
	    </el-form-item>
	    
	    <el-form-item label="店铺类别">
    	  <el-select v-model="shopTypeId" @change="getShop(shopTypeId)" placeholder="请选择">
		    <el-option
		      v-for="item in shopTypeList"
		      :key="item._id"
		      :label="item.shopTypeName"
		      :value="item._id">
		    </el-option>
		  </el-select>
	    </el-form-item>
	    
	  </el-form>
	  
	  <div slot="footer" class="dialog-footer">
	    <!--<el-button @click="$emit('changevisible',false)">取 消</el-button>-->
	    <el-button @click="$emit('update:ShopVisible',false)">取 消</el-button>
	    <el-button type="primary" @click="addShop">提交</el-button>
	  </div>
	</el-dialog>

</template>

<script>
	export default{
		props:["ShopVisible","typeId","getShopList","shopId"],
		name:"add-shop",
		data(){
			return{
				shopTypeId:"",
				shopTypeList:[],
				//shopInfo:{},
				shopPic:"",
				shopList:[]
			}
		},
		methods:{
            //获取店铺列表
			getShopList(){
				this.$axios.get("/getShopList").then(data=>{
					this.shopList=data.shopList;
				})
			},
			upChange(file){
                this.$refs.upload.clearFiles();
                var reader=new FileReader();
                reader.readAsDataURL(file.raw);
                //转为base64
                var _this=this;
                reader.onload=function(){
                    _this.shopPic=this.result;
                    console.log(this.result);
                }
                console.log(2222,file);
            },
			//获取店铺类别列表
			getShopType(){
				this.$axios.get("/getShopType")
					.then(data=>{
						this.shopTypeList=data.shopTypeList;
					})
			},
			
			//添加店铺
			addShop(){
				var formdata=new FormData();
				formdata.set("shopName",this.$refs.shopName.$data.currentValue);
				//图片是文件，所以加files[0],不然会报错size<0
				formdata.set("shopPic",document.querySelector(".el-upload__input").files[0]);
				formdata.set("shopTypeId",this.shopTypeId);
				
				if(this.shopId.length>0){// 修改
                    formdata.set("shopId",this.shopId);
                    this.$axios.put("/addShop",formdata)
                        .then(data=>{
                        if(data.ok===1){
                        this.$emit('update:ShopVisible',false);

                        this.$message({
                            message: data.msg,
                            type: 'success'
                        });
                        if(this.getShopList)
                            this.getShopList();
                        else
                            this.$router.push("/shopManage");
                    }else{
                        this.$message.error(data.msg);
                    }
                    })
                }else{
					this.$axios.post("/addShop",formdata)
					.then(data=>{
						this.$emit("update:ShopVisible",false);
						//this.getShopList();
						if(data.ok===1){
							this.$message({
								message:data.msg,
								type:"success"
							});
							this.getShopList();
						}else{
							this.$message.error(data.msg);
						}
					})
				}
			},
			
			//限制提交图片数量
			exceed(){
				this.$message.error("你已经上传了图片");
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
		   			
		   			console.log(13,this.shopId);
		   			console.log(11,data.shopInfo);
		   			console.log(12,data.shopInfo.shopId);
		   			
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
	            	console.log(this.shopList,77777)
	            })
           },
		   	
		},
		mounted(){
			console.log(this.shopId);
			this.getShopType();
			this.shopTypeId=this.typeId;
			if(this.shopId.length>0){
				this.getShopInfo();
			}
		}
	}
</script>

<style>
</style>