var express = require('express')
var router = express.Router()
var $sql = require('../sqlMap')
var models = require('../db')
var mysql = require('mysql')
const fs = require('fs')
var multer  = require('multer')
var conn = mysql.createConnection(models.mysql);
conn.connect();

var uploadImg = multer({ dest: 'file/portrait' }) //用户头像文件存储位置

//用户登录验证
router.post('/userLogin', (req, res) => {
  let sql = $sql.user.login;
  let params = req.body
  conn.query(sql, [params.account, params.password], (err, data) => {
    if (err || data.length === 0) {
      return res.json({
        state: '0', msg: '登录失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '登录成功', data
      })
    }
  })
})

//用户注册
router.post('/userRegister', (req, res) => {
  let sql = $sql.user.register;
  let params = req.body
  conn.query(sql, [params.account, params.password, params.username, params.phone], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '注册成功', data
      })
    }
  })
})

//用户个人信息
router.post('/getUserInfo', (req, res) => {
  let sql = $sql.user.info;
  let params = req.body
  conn.query(sql, [params.username], function (err, data) {
    if (err) {
      return res.json({
        state: '0', msg: '失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询信息成功', data
      })
    }
  })
})

//修改用户信息
router.post('/updateUserInfo', (req, res) => {
  let sql = $sql.user.update;
  let params = req.body
  let array = []
  for(let key in params) {
    array.push(params[key])
  }
  conn.query(sql, array, function (err, data) {
    if (err) {
      return res.json({
        state: '0', msg: '失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '更新信息成功'
      })
    }
  })
})

//查询用户视频
router.post('/getUserVideo', (req, res) => {
  let sql = $sql.user.video
  let params = req.body
  // let query = req.query
  // let sql = 'select * from ' + params.table + ' where ID = ? order by time desc limit ?, 10'
  conn.query(sql,[params.ID] ,function (err, data) {
    if (err) {
      return res.json({
        state: '0', msg: '失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询视频信息成功', data
      })
    }
  })
})

//上传头像图片
router.post('/uploadAvatar', uploadImg.single('avatar'), (req, res) => {  
  //获取文件的信息
  let file = req.file
  console.log(req.file)
  if(file) {
    var fileNameArr = file.originalname.split('.');
    // var suffix = fileNameArr[fileNameArr.length - 1];
    //文件重命名(二进制文件转化为上传视频格式文件)jpg格式
    fs.renameSync('file/portrait/' + file.filename, `file/portrait/${file.filename}.jpg`)
    file['newImgName'] = `${file.filename}.jpg`
  }
  res.json({
    state: '1', msg: '上传头像成功', file
  })
})

//删除弹幕
router.post('/deleteBarrage', (req, res) => {
  let sql = $sql.user.deleteBarrage
  let params = req.body
  conn.query(sql,[params.bID] ,function (err, data) {
    if (err) {
      return res.json({
        state: '0', msg: '删除弹幕失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '删除弹幕成功'
      })
    }
  })
})

//更新密码
router.post('/updatePsw', (req, res) => {
  let sql = $sql.user.updatePsw
  let params = req.body
  conn.query(sql,[params.password, params.ID] ,function (err, data) {
    if (err) {
      return res.json({
        state: '0', msg: '更新失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '更新成功'
      })
    }
  })
})

//判断原密码
router.post('/judgePsw', (req, res) => {
  let sql = $sql.user.judgePsw
  let params = req.body
  conn.query(sql,[params.ID, params.password] ,function (err, data) {
    if (err) {
      return res.json({
        state: '0', msg: '失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '成功', data
      })
    }
  })
})


module.exports = router;