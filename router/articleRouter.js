//导入express模块
var express = require('express');
//创建一个路由对象
var router = express.Router();

var articleCtrl = require('../controller/articleCtrl.js');

router
    .get('/article/add', articleCtrl.showAddArticlePage) //展示文章页面cls
    .post('/article/add', articleCtrl.addNewArticle) //添加新文章
    .get('/article/info', articleCtrl.showArticleInfoPage) //展示文章详情页面
    .get('/article/edit', articleCtrl.showEditPage) //展示编辑页面 
    .post('/article/edit', articleCtrl.editArticle) //修改文章 
    .post('/article/delete', articleCtrl.deleteArticle) //删除文章




module.exports = router;