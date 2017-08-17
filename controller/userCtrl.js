// 导入userModel模块
var userModel = require('../model/userModel.js');
//导入MD5加密模块
var md5 = require('blueimp-md5');
// 导入config模块
var config = require('../config');

module.exports = {
    showRegisterPage(req, res) { //渲染注册页面
        res.render('./user/register');
    },
    showLoginPage(req, res) { //渲染注册页面
        res.render('./user/login');
    },
    registerNewUser(req, res) { //注册新用户
        // 1.获取到提交过来的表单数据
        var newUser = req.body;
        // 2.先根据当前的用户名去数据检查该用户名是否被注册
        userModel.getUserByUsername(newUser.username, (err, result) => {
            if (err) return res.json({ //表示出错了
                err_code: 1,
                msg: '注册失败，请稍后再试'
            });
            // 没有出错，先判断用户名是否已被注册
            if (result.length !== 0) return res.json({ //表示用户名已存在
                err_code: 1,
                msg: '此用户名已被注册'
            });
            // 在用户注册之前 先对用户密码进行加密
            newUser.password = md5(newUser.password, config.pwdSalt);
            // 表示用户名可用 把数据写入到数据库中
            userModel.addNewUser(newUser, (err, result) => {
                if (err) return res.json({ //表示出错了
                    err_code: 1,
                    msg: '注册失败，请稍后再试'
                });
                res.json({
                    err_code: 0
                })
            })
        })
    },
    login(req, res) { //用户登录
        // 1.先获取表单提交过来的数据，获取用户的信息
        // 2.根据用户填写的信息 调用model层去核对信息
        // 3.如果能找到对应的用户信息，表示登录成功，否则登录失败
        var userInfo = req.body;
        //用户登录的时候也给它的密码加盐处理
        userInfo.password = md5(userInfo.password, config.pwdSalt);
        userModel.getUserByUsernameAndPwd(userInfo, (err, result) => {
            if (err) return res.json({
                err_code: 1,
                msg: '登陆失败 ，请稍后再试'
            });
            if (result.length !== 1) return res.json({
                err_code: 1,
                msg: '用户名或密码错误'
            });
            //在登录结果返回给浏览器之前，需要先把登录状态和用户信息保存到session中
            req.session.login = true;
            req.session.user = result[0];

            res.json({
                err_code: 0
            });
        });
    },
    logout(req, res) { //注销登录
        req.session.destroy((err) => {
            if (err) throw err;
            res.redirect('/login');
        });
    }
}