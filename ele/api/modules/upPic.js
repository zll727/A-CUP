///*
//* 上传图片
//* cb({
//*   ok://1,成功   2，问题  3,未上传图片
//* })
//* */
//const formidable=require("formidable");
//const fs=require("fs");
//module.exports.upPic=function(req,picName,cb){
//  var form=new formidable.IncomingForm();
//  form.uploadDir="./upload";
//  form.keepExtensions=true;
//  form.encoding="utf-8";
//  form.parse(req,function(err,params,file){
//      if(err){
//          cb({
//              ok:2,
//              msg:"网络连接错误"
//          })
//      }else{
//          var picInfo=file[picName];
//          // 上传了图片
//          if(picInfo){
//          if(picInfo.size>0){
//              var keepArr=[".jpg",".png",".gif"];
//              var keepName=picInfo.name.substr(picInfo.name.lastIndexOf("."));
//              if(keepArr.includes(keepName)){
//                  var newPicName=Date.now()+keepName;
//                  fs.rename(picInfo.path,"./upload/"+newPicName,function(err){
//                      cb({
//                          ok:1,
//                          params,
//                          newPicName
//                      })
//                  })
//              }else{
//                  fs.unlink(picInfo.path,function(err){
//                      cb({
//                          ok:2,
//                          msg:"请上传正确格式的图片：.jpg,.png,.gif"
//                      })
//                  })
//              }
//          }else{// 未上传图片
//              fs.unlink(picInfo.path,function(err){
//                  cb({
//                      ok:3,
//                      params
//                  })
//              })
//          }
//          }else{
//          	cb({
//          		ok:3,
//          		params
//          	})
//          }
//      }
//  })
//}



/*
* 上传图片
* cb({
*   ok://1,成功   2，问题  3,未上传图片
* })
* */
const formidable=require("formidable");
const fs=require("fs");
module.exports.upPic=function(req,picName,cb){
    var form=new formidable.IncomingForm();
    form.uploadDir="./upload";
    form.keepExtensions=true;
    form.encoding="utf-8";
    form.parse(req,function(err,params,file){
        if(err){
            cb({
                ok:2,
                msg:"网络连接错误"
            })
        }else{
            var picInfo=file[picName];
            console.log(picInfo,111);
            // 上传了图片
            if(picInfo){
                console.log(111111111,picInfo);
                if(picInfo.size>0){
                    var keepArr=[".jpg",".png",".gif"];
                    var keepName=picInfo.name.substr(picInfo.name.lastIndexOf("."));
                    if(keepArr.includes(keepName)){
                        var newPicName=Date.now()+keepName;
                        fs.rename(picInfo.path,"./upload/"+newPicName,function(err){
                            cb({
                                ok:1,
                                params,
                                newPicName
                            })
                        })
                    }else{
                        fs.unlink(picInfo.path,function(err){
                            cb({
                                ok:2,
                                msg:"请上传正确格式的图片：.jpg,.png,.gif"
                            })
                        })
                    }
                }else{// 未上传图片
                    fs.unlink(picInfo.path,function(err){
                        cb({
                            ok:3,
                            params
                        })
                    })
                }
            }else{
                cb({
                    ok:3,
                    params
                })
            }




        }
    })
}