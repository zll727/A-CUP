const {upPic} =require("../modules/upPic");
const db=require("../modules/db")
const mongodb = require("mongodb");
//添加店铺类别
module.exports.addShopType=function(req,res){
    upPic(req,"shopTypePic",function(obj){
        console.log(obj);
        if(obj.ok===1){
            db.insertOne("shopTypeList",{
                shopTypeName:obj.params.shopTypeName,
                shopTypePic:obj.newPicName,
                addTime:Date.now()
            },function(){
                res.json({
                    ok:1,
                    msg:"上传成功"
                })
            })
        }else{
            res.json({
                ok:2,
                msg:obj.msg
            })
        }
    })
}

//获取店铺类别
//module.exports.getShopType=function(req,res){
//	db.find("shopTypeList",{
//		sortObj:{
//			addTime:-1
//		}
//	},
//	function(err,shopTypeList){
//		res.json({
//			ok:1,
//			shopTypeList
//		})
//	})
//}

//获取店铺类别
module.exports.getShopType=function(req,res){
	var pageIndex=req.query.pageIndex/1;//当前页
	var pageSum=1;//总页数
	var pageNum=5;//每页的数量
	db.count("shopTypeList",{},function(count){
		pageSum=Math.ceil(count/pageNum);
		if(pageSum<1){
			pageSum=1;
		}
		if(pageIndex>pageSum){
			pageIndex=pageSum;
		}
		if(pageIndex<1){
			pageIndex=1;
		}
		db.find("shopTypeList",{//find是db里模块里的函数名
			sortObj:{addTime:-1},
			skipNum:(pageIndex-1)*pageNum,
			limitNum:pageNum
		},function(err,shopTypeList){
			res.json({
				ok:1,
				shopTypeList,
				pageSum,//总页数
				pageIndex//当前页
			})
		})
	})
}
//删除店铺类别
module.exports.delShopType=function(req,res){
	db.deleteOneById("shopTypeList",req.query.id,
	function(err,results){
		res.json({
			ok:1,
			msg:"删除成功"
		})
	})
}



//添加店铺
module.exports.addShop=function(req,res){
	//console.log(shopTypeId);
    upPic(req,"shopPic",function(obj){
        if(obj.ok===1){
            db.insertOne("shopList",{
                shopName:obj.params.shopName,
                shopPic:obj.newPicName,
                //将字符串转换为ObjectId ,用mongodb
                shopTypeId:mongodb.ObjectId(obj.params.shopTypeId),
                addTime:Date.now()
            },function(){
                res.json({
                    ok:1,
                    msg:"上传成功"
                })
            })
        }else{
            res.json({
                ok:2,
                msg:obj.msg
            })
        }
    })
}

//获取店铺列表
/*module.exports.getShopList=function(req,res){
	var pageIndex=req.query.pageIndex/1;//当前页
	var pageSum=1;//总页数
	var pageNum=5;//每页的数量
	var shopName=req.query.shopName;
    var whereObj={
        shopName:new RegExp(shopName)
    }
	db.count("shopList",{},function(count){
		pageSum=Math.ceil(count/pageNum);
		if(pageSum<1){
			pageSum=1;
		}
		if(pageIndex>pageSum){
			pageIndex=pageSum;
		}
		if(pageIndex<1){
			pageIndex=1;
		}
		db.find("shopList",{//find是db里模块里的函数名
			sortObj:{addTime:-1},
			skipNum:(pageIndex-1)*pageNum,
			limitNum:pageNum,
			whereObj
		},function(err,shopList){
			res.json({
				ok:1,
				shopList,
				pageSum,//总页数
				pageIndex//当前页
			})
		})
	})
}*/
module.exports.getShopList=function(req,res){
	var pageIndex=req.query.pageIndex/1;
	var pageSum=1;
	var pageNum=5;
	var shopName=req.query.shopName
	var whereObj={
		shopName:new RegExp(shopName)
	}
	db.count("shopList",{},function(count){
		var pageSum=Math.ceil(count/pageNum);
		if(pageSum<0){
			pageSum=1;
		}
		if(pageIndex>pageSum){
			pageIndex=pageSum;
		}
		if(pageIndex<1){
			pageindex=1;
		}
		db.getShopList(
			whereObj,
		    (pageIndex-1)*pageNum,
			pageNum,
		   function(err,shopList){
			res.json({
				ok:1,
				shopList,
				pageSum,
				pageIndex
			})
		})
	})
}

//根据店铺类别的id获取店铺
module.exports.getShop = function(req,res){
	var shopTypeId = req.query.shopTypeId;
	console.log(shopTypeId);
	var whereObj = {
		shopTypeId:mongodb.ObjectID(shopTypeId)
	}
	console.log(whereObj);
	db.find("shopList",{whereObj},function(err,shopInfo){
		res.json({
			ok : 1,
			shopInfo
		})
	})
}



//获取一条店铺信息
module.exports.getShopInfo=function(req,res){
	db.findOneById("shopList",req.query.shopId,
	function(err,shopInfo){
		res.json({
			ok:1,
			shopInfo
		})
	})
}

//修改店铺
module.exports.upShop=function(req,res){
    upPic(req,"shopPic",function(obj){
        console.log(obj);
        if(obj.ok===2){
            res.json({
                ok:2,
                msg:obj.msg
            })
        }else{
            var upObj={
                $set:{
                    shopName:obj.params.shopName,
                    shopTypeId:mongodb.ObjectID(obj.params.shopTypeId),
                }
            }
            if(obj.newPicName){// 上传了图片
                upObj.$set.shopPic=obj.newPicName;
            }
            db.updateOneById("shopList",obj.params.shopId,upObj,function(err,results){
                res.json({
                    ok:1,
                    msg:"成功"
                })
            })
        }

    })
}



//删除店铺列表
module.exports.delShop=function(req,res){
	db.deleteOneById("shopList",req.query.id,
	function(err,results){
		res.json({
			ok:1,
			msg:"删除成功"
		})
	})
}
