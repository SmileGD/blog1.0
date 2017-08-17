//导入express模块
var express = require('express');
//创建一个路由对象
var router = express.Router();
//导入index相关的业务处理逻辑模块
var userCtrl = require('../controller/userCtrl.js')

router
// 客户端请求/register路径时候， 表示请求注册页面
    .get('/register', userCtrl.showRegisterPage) //展示注册页面
    // 客户端请求/login路径时候， 表示请求登录页面
    .get('/login', userCtrl.showLoginPage) //展示登录页面
    .post('/register', userCtrl.registerNewUser) //注册新用户
    .post('/login', userCtrl.login) // 用户登录
    .get('/logout', userCtrl.logout) //注销登录


module.exports = router;