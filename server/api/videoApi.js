var express = require('express')
var router = express.Router()
var $sql = require('../sqlMap')
const fs = require('fs')
var multer  = require('multer')
// var ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const url = require('url')
var mysql = require('mysql')
var models = require('../db')
var conn = mysql.createConnection(models.mysql);
conn.connect();

var uploadVideo = multer({ dest: 'file/video' }) //视频文件存储位置
var uploadImg = multer({ dest: 'file/images' }) //视频封面文件存储位置

//上传视频文件
router.post('/uploadVideo', uploadVideo.single('files'), (req, res) => {  
  //获取文件的信息
  let file = req.file
  console.log(req.file)
  if(file) {
    //解析文件名
    var fileNameArr = file.originalname.split('.');
    var suffix = fileNameArr[fileNameArr.length - 1];
    //文件重命名
    fs.renameSync('file/video/' + file.filename, `file/video/${file.filename}.${suffix}`)
    file['newVideoName'] = `${file.filename}.${suffix}` 
  }
  res.json({
    state: '1', msg: '上传视频成功', file
  })
})

//上传的视频文件信息
router.post('/uploadVideoInfo', (req, res) => {
  let sql = $sql.video.info
  let params = req.body 
  let array = []
  for(let key in params) {
    array.push(params[key])
  }
  array.push('进行中')
  conn.query(sql, array, (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '上传失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '上传成功', data
      })
    }
  })
})

// //删除视频文件
// router.post('/deleteVideo', (req, res) => {
//   // let sql = $sql.root.deleteCarousel
//   let params = req.body

//   res.json({
//     state: '1', msg: '删除成功', file
//   })
// })

//上传视频封面
router.post('/uploadCover', uploadImg.single('img'), (req, res) => {  
  //获取文件的信息
  let file = req.file
  console.log(req.file)
  if(file) {
    var fileNameArr = file.originalname.split('.');
    // var suffix = fileNameArr[fileNameArr.length - 1];
    //文件重命名(二进制文件转化为上传视频格式文件)jpg格式
    fs.renameSync('file/images/' + file.filename, `file/images/${file.filename}.jpg`)
    file['newImgName'] = `${file.filename}.jpg`
  }
  res.json({
    state: '1', msg: '上传封面成功', file
  })
})

//删除视频信息内容
router.post('/deleteVideo', (req, res) => {
  let sql = $sql.video.delete
  let params = req.body
  fs.unlinkSync('./file/video/' + params.name + '.mp4'); //删除视频文件
  if(params.src) {
    fs.unlinkSync('./file/images/' + params.src + '.jpg'); //删除视频缩略图文件
  }
  conn.query(sql, [params.vID], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '删除失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '删除成功', data
      })
    }
  })
})

//获取视频类型
router.post('/getVideoType', (req, res) => {
  let sql = $sql.video.type
  conn.query(sql,{}, (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '查询失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询成功', data
      })
    }
  })
})


//获取视频标签
router.post('/getVideoLabel', (req, res) => {
  let sql = $sql.video.label
  let params = req.body
  conn.query(sql, [params.type], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '查询失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询成功', data
      })
    }
  })
})

//获取不同标签的视频数据
router.post('/getLabelVideoData', (req, res) => {
  let sql = $sql.video.labelData
  let params = req.body
  conn.query(sql, [params.label], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '查询失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询成功', data
      })
    }
  })
})

//推广数据
router.post('/getPopularizeData', (req, res) => {
  let sql = $sql.video.popularizeData
  let params = req.body
  conn.query(sql, [params.num], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '查询失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询成功', data
      })
    }
  })
})

//类型推广数据
router.post('/getTypeData', (req, res) => {
  let sql = $sql.video.typeData
  let params = req.body
  conn.query(sql, [params.type], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '查询失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询成功', data
      })
    }
  })
})

//播放视频
router.post('/getVideoUrl', (req, res) => {
  let sql = $sql.video.url
  let params = req.body
  conn.query(sql, [params.vID], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '查询失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询成功', data
      })
    }
  })
})

//获取用户视频信息
router.post('/getUserInfo', (req, res) => {
  let sql = $sql.video.userInfo
  let params = req.body
  conn.query(sql, [params.ID], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '查询失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询成功', data
      })
    }
  })
})

//插入视频附加信息
router.post('/getUserInfo', (req, res) => {
  let sql = $sql.video.userInfo
  let params = req.body
  conn.query(sql, [params.ID], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '插入信息失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '插入信息成功', data
      })
    }
  })
})

//更新视频一个信息数据(播放量，信息量，弹幕量)
router.post('/updateVideoNum', (req, res) => {
  // let sql = $sql.video.updateOne
  let params = req.body
  let sql = 'update video set ' + params.name + ' = ' + params.name + ' + 1 where vID = ?'
  // [params.name, params.name, params.vID]
  conn.query(sql, [params.vID] ,(err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '更新失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '跟新成功'
      })
    }
  })
})

//修改视频息数据
router.post('/updateVideoInfo', (req, res) => {
  let sql = $sql.video.updateAll
  let params = req.body
  params.state = '进行中'
  params.reason = '修改信息'
  conn.query(sql, [params.title, params.synopsis, params.type, params.label, params.state, params.reason, params.vID], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '更新失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '更新成功', data
      })
    }
  })
})

//视频申诉
router.post('/appealVideo', (req, res) => {
  let sql = $sql.video.appealVideo
  let params = req.body
  conn.query(sql, [params.reason, params.vID], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '申诉失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '申诉成功', data
      })
    }
  })
})

//更新视频信息
router.post('/userVideo', (req, res) => {
  let sql = $sql.video.userVideo
  let params = req.body
  params.state = '进行中'
  conn.query(sql, [params.ID], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '更新失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '更新成功', data
      })
    }
  })
})

//获取轮播图图片
router.post('/getCarouselImg', (req, res) => {
  let sql = $sql.video.carouselImg
  let params = req.body
  conn.query(sql, [params.team], (err, data) => {
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

//获取背景图图片
router.post('/getBackgroundImg', (req, res) => {
  let sql = $sql.video.backgroundImg
  let params = req.body
  conn.query(sql, [params.team], (err, data) => {
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

module.exports = router