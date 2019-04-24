const {upPic} =require("../modules/upPic");
const db=require("../modules/db")
const mongodb=require("mongodb");

//添加商品
module.exports.addGood=function(req,res){
	upPic(req,"goodPic",function(obj){
		console.log(obj);
		if(obj.ok===1){
			db.insertOne("goodList",{
				price:obj.params.price,
				goodName:obj.params.goodName,
				goodPic:obj.newPicName,
                shopId:mongodb.ObjectId(obj.params.shopId),
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
				msg:"obj.msg"
			})
		}
	})
}

//修改商品
module.exports.upGood=function(req,res){
	upPic(req,"goodPic",function(obj){
		console.log(obj);
		if(obj.ok===1){
			res.json({
				ok:2,
				msg:obj.msg
			})
		}else{
			var upObj={
				$set:{
					price:obj.params.price,
					goodName:obj.params.goodName,
					shopId:mongodb.ObjectID(obj.params.shopId),
				}
			}
			if(obj.newPicName){
				upObj.$set.goodPic=obj.newPicName;
			}
			db.updateOneById("goodList",obj.params.goodId,upObj,
			function(err,results){
				res.json({
					ok:1,
					msg:"成功"
				})
			})
		}
	})
}



//获取商品列表
//module.exports.getGoodList=function(req,res){
//	db.find("goodList",{},function(err,goodList){
//		res.json({
//			ok:1,
//			goodList
//		})
//	})
//}

//加分页的获取商品列表
//module.exports.getGoodList=function(req,res){
//	var pageIndex=req.query.pageIndex/1;
//	var pageSum=1;//总页数
//	var pageNum=3;//每页数量
//	var goodName=req.query.goodName;
//	var whereObj={
//		goodName:new RegExp(goodName)
//	}
//	db.count("goodList",{},function(count){
//		pageSum=Math.ceil(count/pageNum);
//		if(pageSum<1){
//			pageSum=1;
//		}
//		if(pageIndex>pageSum){
//			pageIndex=pageSum;
//		}
//		if(pageIndex<1){
//			pageindex=1;
//		}
//		db.find("goodList",{
//			sortObj:{addTime:-1},
//			skipNum:(pageIndex-1)*pageNum,
//			limitNum:pageNum,
//			whereObj
//		},function(err,goodList){
//			res.json({
//				ok:1,
//				goodList,
//				pageSum,
//				pageIndex
//			})
//		})
//	})
//}

//可以实现店铺名显示在页面
module.exports.getGoodList=function(req,res){
	var pageIndex=req.query.pageIndex/1;
	var pageSum=1;
	var pageNum=5;
	var goodName=req.query.goodName
	var whereObj={
		goodName:new RegExp(goodName)
	}
	db.count("goodList",{},function(count){
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
		db.getGoodList(
			whereObj,
		    (pageIndex-1)*pageNum,
			pageNum,
		   function(err,goodList){
			res.json({
				ok:1,
				goodList,
				pageSum,
				pageIndex
			})
		})
	})
}

//获取一条商品信息
module.exports.getGoodInfo=function(req,res){
	db.findOneById("goodList",req.query.goodId,
	function(err,goodInfo){
		res.json({
			ok:1,
			goodInfo
		})
	})
}

//删除商品
module.exports.delGood=function(req,res){
	db.deleteOneById("goodList",req.query.id,
	function(err,results){
		res.json({
			ok:1,
			msg:"删除成功"
		})
	})
}
