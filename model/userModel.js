//导入服务器模块
var Db = require('./baseDb.js');
module.exports = {
    getUserByUsername(username, callback) {
        var sqlStr = 'select * from users where username =?';
        Db.query(sqlStr, [username], callback);
    },
    addNewUser(user, callback) {
        var sqlStr = 'insert into users set ?';
        Db.query(sqlStr, user, callback);
    },
    getUserByUsernameAndPwd(user, callback) {
        var sqlStr = 'select * from users where username = ? and password = ?';
        Db.query(sqlStr, [user.username, user.password], callback);
    }
}