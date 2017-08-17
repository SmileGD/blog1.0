//导入mysql模块
var mysql = require('mysql');
// 创建服务器链接
//mysql默认不支持多条sql语句
//如果想要人为在一次查询中，执行多条SQL语句 需要手动开启
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'blog',
    // 开启一次查询执行多条sql语句功能
    multipleStatements: true
});
module.exports = connection;