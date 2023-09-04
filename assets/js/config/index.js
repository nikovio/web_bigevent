module.exports={
    dev:{
        host:"127.0.0.1", //你本机的ip地址
        user:"root", //数据库用户名
        password:"123456",//数据库密码
        port:3306, //数据库端口号
        database:'wkos' //你创建的数据库名字
    },
    tokenKey:"4514",//，加密的时候要放进去一个 tokenKey，这个相当于是一个密码，这个密码秘密地存储在服务端。
//tokenKey就是在最后第二次加密时加的盐，算是一个秘钥（只保留在服务器），不向外部透露。
    key:'itzhou'
}
