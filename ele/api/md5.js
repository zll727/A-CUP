const md5=require("md5");

const pwd="123"
console.log(md5(pwd));
//为了保证安全，加入盐料
console.log(md5(pwd+"@!Ele.Com"));
//24c84661384e4868d4debf9e658f7a62