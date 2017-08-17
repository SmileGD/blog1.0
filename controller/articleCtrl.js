 var articleModel = require('../model/articleModel');
 var moment = require('moment');
 var mditor = require('mditor');
 module.exports = {
     showAddArticlePage(req, res) {
         if (!req.session.login) { //证明是非法访问该页面 需要他先登录
             res.redirect('/login');
         } else {
             //渲染文章添加页面
             res.render('./article/add', {
                 islogin: req.session.login,
                 user: req.session.user
             });
         }
     },
     addNewArticle(req, res) {
         // 获取文章信息
         var newArticle = req.body;
         // console.log(newArticle);
         //将文章信息保存到数据库中  新建一张文章表 id title content authorid ctime
         // 调用articleModel层 将文章进行保存操作
         //由于现在只有两个参数 所以要补全参数 authorID ctime
         newArticle.ctime = new Date();
         articleModel.addArticle(newArticle, (err, results) => {
             if (err) return res.json({
                 err_code: 1,
                 msg: '保存文章失败，请稍后再试'
             });
             res.json({
                 err_code: 0,
                 id: results.insertId
             })

         })


     },
     showArticleInfoPage(req, res) { //展示文章详情页面
         // 在渲染文章详情页面之前 需要根据文章id 获取文章的详情
         var id = req.query.id;
         articleModel.getArticleById(id, (err, results) => {
             // 如果展示详情页失败 则直接跳到首页
             if (err || results.length !== 1) return res.redirect = '/';
             var articleInfo = results[0];
             // 格式化日期
             articleInfo.ctime = moment(articleInfo.ctime).format('YYYY-MM-DD HH:mm:ss');
             // 把内容从markdown语法转换成html语法            
             articleInfo.content = (new mditor.Parser()).parse(articleInfo.content);
             res.render('./article/info', { //把文章信息传递出去
                 islogin: req.session.login,
                 user: req.session.user,
                 article: articleInfo
             })

         });

     },
     showEditPage(req, res) { //展示编辑页面
         var id = req.query.id;
         articleModel.getArticleById(id, (err, results) => {
             //如果获取文章信息失败， 或者没有登录， 则直接跳转到首页
             if (err || req.session.login !== true) return res.redirect('/');

             //如果 当前登录的用户Id不等于当前文章的作者Id，那么说明当前是非法（通过在地址栏直接输入URL地址）进来的，这直接跳转到 / 首页
             if (req.session.user.id !== results[0].authorId) {
                 return res.redirect('/');
             }

             res.render('./article/edit', {
                 islogin: req.session.login,
                 user: req.session.user,
                 article: results[0]
             });
         });
     },
     editArticle(req, res) { //修改文章
         // 1. 获取post过来的文章信息
         var article = req.body;
         // 由于客户端返回过来时间是一个字符串，所以在保存到服务器之前，需要将时间转成正真的js日期对象，这样就能保存了
         article.ctime = new Date(article.ctime);
         // 2. 调用articleModel的相关方法 保存修改的文章信息
         articleModel.editArticle(article, (err, results) => {
             if (err) return res.json({
                 err_code: 1,
                 msg: '修改文章失败，请稍后再试'
             })
             res.json({
                 err_code: 0
             })
         });

     },
     deleteArticle(req, res) { //删除文章
         var id = req.body.id;
         articleModel.deleteArticleById(id, (err, results) => {
             if (err) return res.json({
                 err_code: 1,
                 msg: '删除文章失败，请稍后再试'
             })
             res.json({
                 err_code: 0
             })
         });
     }
 }