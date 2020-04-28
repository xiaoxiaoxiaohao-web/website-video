var express = require('express')
var router = express.Router()
var $sql = require('../sqlMap')
var mysql = require('mysql')
var models = require('../db')
const fs = require('fs')
var multer  = require('multer')
var conn = mysql.createConnection(models.mysql);
conn.connect();
var carouselImg = multer({ dest: 'file/carousel' }) //轮播图文件存储位置


//上传轮播图图片
router.post('/uploadCarousel', carouselImg.single('carousel'), (req, res) => {  
  //获取文件的信息
  let file = req.file
  console.log("上传成功了轮播图图片",file)
  if(file) {
    fs.renameSync('file/carousel/' + file.filename, `file/carousel/${file.filename}.jpg`)
    file['newImgName'] = `${file.filename}.jpg`
  }
  res.json({
    state: '1', msg: '上传图片成功', file
  })
})

//上传的轮播图图片存入数据库
router.post('/addCarouselData', (req, res) => {
  let sql = $sql.root.addCarousel
  let params = req.body
  conn.query(sql, [params.name, params.team], (err, data) => { //删除数据库内容
    if (err) {
      return res.json({
        state: '0', msg: '加入数据库失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '加入数据库成功', data
      })
    }
  })
})

//删除轮播图图片
router.post('/deleteCarousel', (req, res) => {
  let sql = $sql.root.deleteCarousel
  let params = req.body
  fs.unlinkSync('./file/carousel/' + params.name + '.jpg'); //删除文件
  conn.query(sql, [params.name, params.team], (err, data) => { //删除数据库内容
    if (err) {
      return res.json({
        state: '0', msg: '删除图片失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '删除图片成功', data
      })
    }
  })
})

//获取轮播图和背景图图片
router.post('/getCarouselImg', (req, res) => {
  let sql = $sql.root.carouselImg
  conn.query(sql, {}, (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '查询图片信息失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询图片信息成功', data
      })
    }
  })
})


//获得用户数据
router.post('/getUserData', (req, res) => {
  let sql = $sql.root.user
  // let params = req.body
  conn.query(sql, [], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '查询用户信息失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询用户信息成功', data
      })
    }
  })
})

//更改用户信息
router.post('/updateUserData', (req, res) => {
  let sql = $sql.root.updateUser
  let params = req.body
  conn.query(sql, [params.power, params.ID], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '更新用户信息失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '更新用户信息成功', data
      })
    }
  })
})

//删除用户信息
router.post('/deleteUserData', (req, res) => {
  let sql = $sql.root.deleteUser
  let params = req.body
  conn.query(sql, [params.ID], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '删除用户信息失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '删除用户信息成功', data
      })
    }
  })
})


//获得视频数据
router.post('/getVideoData', (req, res) => {
  let sql = $sql.root.video
  // let params = req.body
  conn.query(sql, [], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '查询视频信息失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询视频信息成功', data
      })
    }
  })
})

//审核视频是否通过
router.post('/stateVideo', (req, res) => {
  let sql = $sql.root.stateVideo
  let params = req.body
  conn.query(sql, [params.state, params.reason, params.vID], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '查询视频信息失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询视频信息成功', data
      })
    }
  })
})



module.exports = router