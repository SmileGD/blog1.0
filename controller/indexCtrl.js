var articleModel = require('../model/articleModel');
var moment = require('moment');
var config = require('../config.js');

// 加载 moment 的本地化语言
moment.locale('zh-cn');

module.exports = {
    /*
    showIndexPage(req, res) {
        articleModel.getAllArticle((err, results) => {
            // 如果读取首页数据的时候，发生错误，则直接渲染页面
            if (err) return res.render('index', {
                islogin: req.session.islogin,
                user: req.session.user
            });
            // 在渲染页面之前，先格式化时间
            results.forEach(item => {
                item.ctime = moment(item.ctime).format('YYYY-MM-DD HH:mm:ss');
            })

            // 在调用 res.render 之前，需要先指定 express 的默认模板引擎，和 模板页面存储路径
            res.render('index', {
                islogin: req.session.login,
                user: req.session.user,
                list: results
            });

        })
    }
    */
    showIndexPage(req, res) {
        var page = parseInt(req.query.page);
        if (page <= 0) {
            page = 1;
        }
        var nowPage = page || 1;
        var pageSize = config.pageSize;
        articleModel.getArticleByPage(nowPage, pageSize, (err, results) => {
            // 如果读取首页数据的时候，发生错误，则直接渲染页面
            if (err) throw err;
            if (err) return res.render('index', {
                islogin: req.session.islogin,
                user: req.session.user
            });
            // 在渲染页面之前，先格式化时间
            results[0].forEach(item => {
                // item.ctime = moment(item.ctime).format('YYYY-MM-DD HH:mm:ss');
                item.ctime = moment(item.ctime).fromNow();
            })
            var totalCount = results[1][0].totalCount;
            // 在调用 res.render 之前，需要先指定 express 的默认模板引擎，和 模板页面存储路径
            res.render('index', {
                islogin: req.session.login,
                user: req.session.user,
                list: results[0],
                totalPage: Math.ceil(totalCount / pageSize), // 获取总页数
                nowPage: nowPage // 当前的页码值
            });

        })
    }
}