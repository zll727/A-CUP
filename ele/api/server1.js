const express=require("express");
const bodyParser=require("body-parser");

const db=require("./modules/db")
const mongodb = require("mongodb");

const app=express();
app.use(express.static("./upload"));

app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","DELETE");
    res.header("Access-Control-Allow-Headers","content-type");
    next();
})
//获取店铺类别
app.get("/getShopType",function(req,res){
	db.find("shopTypeList",{
		sortObj:{
			addTime:-1
		}
	},function(err,results){
		var num=Math.ceil(results.length/10);
		var shopTypeList=[];
		for(var i=0;i<num;i++){
			shopTypeList[i]=[];
			for(var j=i*10; j<i*10+10 && j<results.length;j++){
				shopTypeList[i].push(results[j]);
			}
		}
	    //console.log(shopTypeList);
		res.json({
			ok:1,
			shopTypeList
		})
	})
})

//获取广告（先调用商品）
app.get("/getGoodList",function(req,res){
	db.find("goodList",{},function(err,goodList){
		res.json({
			ok:1,
			goodList
		})
	}) 
})

//获取广告（先调用商品）
//goodInfo实际是一个列表
app.get("/getGoodInfo",function(req,res){
	db.find("goodList",{},function(err,results){
		var goodInfo=[];
		for(var i=0;i<2;i++){
			goodInfo.push(results[i]);
		}
		res.json({
			ok:1,
			goodInfo
		})
	}) 
})



//获取店铺列表
app.get("/getShopList",function(req,res){
	db.find("shopList",{},function(err,shopList){
		res.json({
			ok:1,
			shopList
		})
	}) 
})

app.get('/getShopLists',function(req,res){
    var id = req.query.shopId;
    var goodName=req.query.goodName
	var whereObj={
		goodName:new RegExp(goodName)
	}
    db.find('shopList',{
        whereObj:
            { 
                _id:mongodb.ObjectId(id)
            }
    },function(err,shopList){
        res.json({
            ok:1,
            shopList
        })
    })
   
})



//通过商品类别查找商品 getShopListByshopId
app.get('/getGoodLists',function(req,res){
    var id = req.query.shopId;
    //.log(id,111)
    db.find('goodList',{
        whereObj:
            {
                shopId:mongodb.ObjectId(id)
            }
    },function(err,goodList){
        res.json({
            ok:1,
            goodList
        })
    })
    
})

app.get('/getGoodLis',function(req,res){
  
    var goodName=req.query.goodName;
    db.find('goodList',{
        whereObj:
            {
                goodName:new RegExp(goodName)
            }
    },function(err,goodList){
        res.json({
            ok:1,
            goodList
        })
    })
    
})



/***********************购物车模块*************************/
//获取一条信息
app.get("/getCarInfo",function(req,res){
	var id=req.query.id;
	db.findOne("carList",{
		whereObj:
            {
                goodId:mongodb.ObjectId(id)
            }
	},function(err,carInfo){
		res.json({
			ok:1,
			carInfo
		})
	})
})
//加入购物车
app.get("/joinCar",function(req,res){
	var goodId=req.query.id;
	console.log(goodId,"1111");
	var shopId=req.query.shopId1;
	console.log(shopId,"2222");
	db.findOneById("goodList",goodId,function(err,goodInfo){
		db.findOne("carList",{
			goodId
		},function(err,carInfo){
			if(carInfo){//如果购物车里有此商品信息
				db.updateOne("carList",{_id:carInfo._id},{
					$inc:{//商品数量加1
						buyNum:1
					}
				},function(err,results){
					res.json({
						ok:1,
						msg:"加入购物车成功"
					})
				})
			}else{//购物车没有此类商品
				db.insertOne("carList",{//插入的商品信息
					shopId,
					goodId,
					goodName:goodInfo.goodName,
					goodPic:goodInfo.goodPic,
					price:goodInfo.price,
					buyNum:1,
					buyTime:Date.now(),
					isOk:1,
					type:1,
				},function(err,results){
					res.json({
						ok:1,
						msg:"加入购物车成功wu"
					})
				})
			}
		})
	})
})


//获取购物车里面的数据
app.get("/getCarList",function(req,res){
	var id = req.query.shopId;
    db.find('carList',{
        whereObj:
            {
               shopId:id
            }
    },function(err,carList){
		res.json({
			ok:1,
			carList
		})
		console.log(carList,"rrrr");
	})
})

app.get("/getCarLists",function(req,res){
	db.find("carList",{},function(err,carList){
		res.json({
			ok:1,
			carList
		})
	})
})


//购物车所有商品是否被选中
app.get("/changeAllIsOk",function(req,res){
	var allIsOk=req.query.allIsOk;//获取是否全部被选中
	db.updateMany("carList",{},{
		$set:{
			isOk:allIsOk/1===0?1:0
		}
	},function(err,carList){
		res.json({
			ok:1,
			msg:"成功"
		})
	})
})
//改变一条购物车里的记录
app.get("/changeCarInfo",function(req,res){
	var isOk=req.query.isOk/1;
	var id=req.query.id
	db.updateOneById("carList",id,{
		$set:{
			isOk:isOk===1?0:1
		}
	},function(err,results){
		res.json({
			ok:1,
			msg:"成功"
		})
	})
})
//增加和减少
app.get('/updateNum',function(req,res) {
    var id = req.query.id;
    var type = req.query.type / 1;
    db.findOneById('carList',id,function(err,carInfo){
        if(type === 0){//这里的id是前端传过来的id(即点击的商品的id)
            //购买数量-1 库存+1
            db.updateOneById('carList',id,{//根据这个id改变数量
                $inc:{
                    buyNum:-1
                }
            },function(err){//所有的goodsId是商品的id
                db.findOneById('goodList',carInfo.goodId,function(err,goodInfo){
                    db.updateOneById('goodList',goodInfo._id,{},function(err){
                    	
                        if(carInfo.buyNum <=1){
                            db.deleteOneById('carList',carInfo._id,function(err,results){
                            	
                                res.json({
                                    ok:3,
                                    msg:'删除成功'
                                })
                            })
                        }else{
                            res.json({
                                ok:1,
                                msg:'成功'
                            })
                        }
                    })
                })
            })
        }
        else if(type === 1){//+1
            db.updateOneById('carList',id,{
                $inc:{
                    buyNum:1
                }
            },function(err){
                db.findOneById('goodList',carInfo.goodId,function(err,goodInfo){//通过购物车页的商品id来查找商品页的id
                   
                    db.updateOneById('goodList',goodInfo._id,{
                    },function(err){
                        res.json({
                            ok:1,
                            msg:'成功'
                        })
                    })
                })
            })
        }
    })
})





















app.listen(80,function(){
    console.log("success");
})
