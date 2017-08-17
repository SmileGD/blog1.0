// 导入 express模块
var express = require('express');
var fs = require('fs');
var path = require('path');
// var compression = require('compression');
//调用express得到一个网站服务器
var app = express();

// 托管静态资源
app.use('/node_modules', express.static('node_modules'));

//注册 gzip 压缩中间件
// app.use(compression);

// 在使用res.render之前 需要先指定   express的默认模板引擎和模板页面存储路径

app.set('view engine', 'ejs'); //指定默认模板引擎

app.set('views', './views') //指定当前模板的存储路径

// 注册body-parser中间件处理表单提交数据
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));

//导入express-session模块
var session = require('express-session');
app.use(session({
    secret: '这是一个加密的盐',
    resave: false, // 强制session保存到session store中【session默认是在内存中的，其实也可以保存到数据库中】
    saveUninitialized: false // 强制没有“初始化”的session保存到storage中【创建了session但是并没有修改这个session，就叫做未初始化】
}));

// // 导入indexRouter模块
// var indexRouter = require('./router/indexRouter.js')
// app.use(indexRouter);
// //导入userRouter模块
// var userRouter = require('./router/userRouter.js');
// app.use(userRouter);

//由于将来有很多的路由模块，所以单独的注入和注册模块比较麻烦
//解决方案：读取router文件夹下面的文件，使用foreach自动循环注册路由
fs.readdir(path.join(__dirname, './router'), (err, filename) => {
    if (err) throw err;
    filename.forEach(filename => {
        var routerPath = path.join(__dirname, './router', filename);
        app.use(require(routerPath));
    })
})
app.listen(3003, function() {

    console.log('Express running at http://127.0.0.1:3003');

});