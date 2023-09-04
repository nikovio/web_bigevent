const db = require("../core/mysql.js");
const moment = require("moment")
const md5 = require('md5')
//json web token 
const jwt = require('jwt-simple') //token
class UserController{

    //注册的 post请求
    async register(req,res,next){
        let insertSql = 'Insert into myuser(`id`,`username`,`password`) values(?,?,?)';
        let params= [
            req.body.id,
            req.body.username,
            md5(req.body.password+require('../config/index').key),
            // 年月日，时分秒 日期格式化
            moment().format("YYYY-MM-DD HH:mm:ss")
        ];
        try{
            let result =  await db.exec(insertSql,params)
            if(result && result.affectedRows >= 1 ){
                res.json({
                    code:200,
                    mag:'注册成功',
                })
            }else{
                res.json({
                    code:200,
                    msg:"注册失败"
                })
            }
        }catch(error){
            res.json({
                code:-200,
                msg:'服务器异常',
                error
            })
        }
        
    }
    //登录的
    async login(req,res,next){
        let loginSql ='select `id`,`username` from myuser where username = ? and password = ?'
        let params = [
            req.body.username,
            // md5二次加密
            md5(req.body.password+require('../config/index').key),
        ]
        try{
            let result =  await db.exec(loginSql,params)
            if(result && result.length >= 1 ){
                res.json({
                    code:200,
                    mag:'登录成功',
                    data:result[0],
                    token:createToken(result[0])
                })

                function createToken(data){
                   return jwt.encode({
                        exp:Date.now()+(1000*60*60*24),
                        info:data
                    },require('../config/index').tokenKey)
                }
            }else{
                res.json({
                    code:-200,
                    msg:"登录失败"
                })
            }
        }catch(error){
            res.json({
                code:-200,
                msg:'服务器异常',
                error
            })
        }
    } 
}

module.exports = new UserController()

