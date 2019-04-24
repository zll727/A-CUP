const db=require("../modules/db");
const md5=require("md5");
const myEnum=require("../modules/Enum");
const common=require("../modules/common");
const {upPic} =require("../modules/upPic");
module.exports.adminLogList=function(req,res){
	console.log(req.query);
	db.deleteOneById("adminLog",req.query.id,
		function(err,results){
			console.log(req.query.id);
		res.json({
			ok:1,
			msg:"删除成功"
		})
	})
}

//module.exports.getAdminLogList=function(req,res){
//	db.getAdminList(function(err,adminLogList){
//		setTimeout(()=>{
//			res.json({
//				ok:1,
//				adminLogList,
//				adminLogEnum:myEnum.adminLogEnum
//			})
//		},1000)
//	})
//}
module.exports.getAdminLogList=function(req,res){
	var pageIndex=req.query.pageIndex/1;
	var pageSum=1;
	var pageNum=2;
	db.count("adminLog",{},function(count){
		var pageSum=Math.ceil(count/pageNum);
		if(pageSum<0){
			pageSum=1;
		}
		if(pageIndex>pageSum){
			pageIndex=pageSum;
		}
		db.getAdminList((pageIndex-1)*pageNum,pageNum,
		   function(err,adminLogList){
			res.json({
				ok:1,
				adminLogList,
				pageSum,
				//adminLogEnum:myEnum.adminLogEnum
			})
		})
	})
}

module.exports.login=function(req,res){
	console.log(req.body);
	db.findOne("adminList",{
		adminName:req.body.adminName,
		adminPwd:md5(req.body.adminPwd+"@!Ele.Com")
	},function(err,adminInfo){
		if(adminInfo){
			db.insertOne("adminLog",{
				adminId:adminInfo._id,
				loginType:1,
				addTime:Date.now(),
				details:adminInfo.adminName+"于"+common.getNowTime()+"登陆了"
			},function(err,results){
				res.json({
					ok:1,
					adminId:adminInfo._id,
					adminName:adminInfo.adminName,
					msg:"登陆成功"
				})
			})
			
		}else{
			res.json({
				ok:2,
				msg:"用户名或密码错误"
			})
		}
	})
}

////删除
//app.get("/delLog",function(req,res){
//	var id=req.query.id;//与调用里面的id保持一致
//	db.deleteOneById("adminLog",id,
//	function(err,results){
//		res.json({
//			ok:1,
//			msg:'删除成功'
//		})
//	})
//})

//获取一条管理员信息
module.exports.getAdminInfo=function(req,res){
	db.findOneById("adminList",req.query.adminId,
	function(err,adminInfo){
		res.json({
			ok:1,
			adminInfo
		})
	})
}

module.exports.upAdminPwd=function(req,res){
	var adminId=req.body.adminId;
	var adminName=req.body.adminName;
	var oldPwd=req.body.adminPwd;
	var newPwd=req.body.newPwd;
	
	db.findOneById('adminList',adminId,function(err,adminInfo){
		if(md5(oldPwd+'@!Ele.Com')===adminInfo.adminPwd){
			db.updateOneById("adminList",adminId,{
				$set:{
					adminPwd:md5(newPwd+'@!Ele.Com')
				}
			},function(err,results){
				res.json({
					ok:1,
					msg:"修改成功"
				})
			})
		}else{
			res.json({
				ok:2,
				msg:"密码错误"
			})
		}
	})
}

//获取管理员列表
module.exports.getAdminList=function(req,res){
	db.find("adminList",{},function(err,adminList){
		res.json({
			ok:1,
			adminList
		})
	})
}
//添加管理员
module.exports.addAdmin=function(req,res){
    upPic(req,"adminPic",function(obj){
        console.log(obj);
        if(obj.ok===1){
            db.insertOne("adminList",{
                adminName:obj.params.adminName,
                adinPic:obj.newPicName,
                adminPwd:md5(obj.params.adminPwd+'@!Ele.Com'),
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


//module.exports.addAdmin=function(req,res){
//  db.insertOne("adminList",{
//      adminName:req.body.adminName,
//      adminPwd:req.body.adminPwd
//  },function(){
//      res.json({
//          ok:1,
//          msg:"添加成功"
//      })
//  })
//}

//删除
module.exports.delAdmin=function(req,res){
	db.deleteOneById("adminList",req.query.id,
	function(err,results){
		res.json({
			ok:1,
			msg:"删除成功"
		})
	})
}