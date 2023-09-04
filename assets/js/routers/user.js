const express = require('express')

let router = express.Router();

//登录
router.post("/login",require("../controller/user").login);
//注册
router.post("/register",require("../controller/user").register);

module.exports =router
