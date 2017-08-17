 var Db = require('./baseDb.js');
 module.exports = {
     addArticle(article, callback) {
         var sqlStr = 'insert into articles set ?';
         Db.query(sqlStr, [article], callback);
     },
     getArticleById(id, callback) {
         var sqlStr = 'select articles.*,users.nickname from articles LEFT JOIN users on articles.authorId =users.id  where articles.id = ? ';
         Db.query(sqlStr, [id], callback);
     },
     editArticle(article, callback) {
         var sqlStr = 'update articles set ? where id=?';
         Db.query(sqlStr, [article, article.id], callback);

     },
     getAllArticle(callback) {
         var sqlStr = 'select articles.*, users.nickname from articles LEFT JOIN users on  articles.authorId=users.id ORDER BY articles.ctime desc';
         Db.query(sqlStr, callback);
     },
     getArticleByPage(page, pageSize, callback) {
         var offset = (page - 1) * pageSize;
         var sqlStr = 'select articles.*, users.nickname from articles LEFT JOIN users on  articles.authorId=users.id ORDER BY articles.ctime desc limit ?,?;select count(*) as totalCount from articles';
         Db.query(sqlStr, [offset, pageSize], callback);

     },
     deleteArticleById(id, callback) {
         var sqlStr = 'delete from articles where id = ?';
         Db.query(sqlStr, [id], callback);
     }
 }