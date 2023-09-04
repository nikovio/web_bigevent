const express = require('express')
// const bodyParser = require('body-parser');
//引入我们封装好的mysql文件
const cors = require('cors')
const server = express();

//引入中间件
// server.use(bodyParser.urlencoded({extended:false}));
// server.use(bodyParser.json());

server.use(express.urlencoded({extended:false}));
server.use(express.json());
server.use(cors())
server.use("/user",require("./routers/user"))
server.listen(5000,()=>{
    console.log('服务器已启动。。。');
})
