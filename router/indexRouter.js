//导入express模块
var express = require('express');
//创建一个路由对象
var router = express.Router();
//导入index相关的业务处理逻辑模块
var indexCtrl = require('../controller/indexCtrl.js')
    // 客户端请求/根路径时候， 返回index首页
router.get('/', indexCtrl.showIndexPage) //展示首页页面

module.exports = router;