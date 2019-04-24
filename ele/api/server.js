const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const admin=require("./router/admin");
const shop =require("./router/shop");
const good =require("./router/good");
app.use(express.static("./upload"));

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({
//	extended:false
//}));
//app.all("*",function(req,res,next){
//  res.header("Access-Control-Allow-Origin","*");
//  res.header("Access-Control-Allow-Methods","DELETE");
//  res.header("Access-Control-Allow-Headers","content-type");
//  next();
//})


////////////////////管理员相关////////////////
//删除
app.delete("/adminLogList",admin.adminLogList)

//获得管理员日志列表
app.get("/getAdminLogList",admin.getAdminLogList)

//登录相关
app.post("/login",admin.login)
//更改密码
app.put("/upAdminPwd",admin.upAdminPwd)
//添加管理员
app.post("/addAdmin",admin.addAdmin);
//获取管理员列表
app.get("/getAdminList",admin.getAdminList)
//删除管理员
app.delete("/delAdmin",admin.delAdmin)

////////////////////店铺相关////////////////
//店铺管理
//添加店铺类别
app.post("/addShopType",shop.addShopType)
//获取店铺类别
app.get("/getShopType",shop.getShopType)
//删除店铺类别
app.delete("/delShopType",shop.delShopType)
//添加店铺
app.post("/addShop",shop.addShop)
//获取店铺列表
app.get("/getShopList",shop.getShopList)
//根据店铺id获取店铺
app.get("/getShop",shop.getShop)
//删除店铺
app.delete("/delShop",shop.delShop)
//获取一条店铺记录
app.get("/getShopInfo",shop.getShopInfo)
//修改记录
app.put("/addShop",shop.upShop)

////////////////////商品相关////////////////
//添加商品
app.post("/addGood",good.addGood)
//获取商品
app.get("/getGoodList",good.getGoodList)
//获取一条商品信息
app.get("/getGoodInfo",good.getGoodInfo)
//删除商品
app.delete("/delGood",good.delGood)
//更新商品
app.put("/addGood",good.upGood)


app.listen(80,function(){
    console.log("success");
})











//app.all("*",function(req,res,next){
//  res.header("Access-Control-Allow-Origin","*");
//  res.header("Access-Control-Allow-Methods","DELETE");
//  res.header("Access-Control-Allow-Headers","content-type");
//  next();
//})

//练习
//app.get("/get",function(req,res){
//	console.log(req.query);
//	res.json({
//		ok:1,
//		msg:"get方法"
//	})
//})


//app.post("/post",function(req,res){
//	console.log(req.body);
//	res.json({
//		ok:1,
//		msg:'post方法'
//	})
//})





