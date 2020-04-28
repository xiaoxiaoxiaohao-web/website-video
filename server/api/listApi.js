var express = require('express')
var router = express.Router()
var $sql = require('../sqlMap')
var models = require('../db')
var mysql = require('mysql')
var conn = mysql.createConnection(models.mysql);
conn.connect();


//首页影视排行
router.post('/moviesList', (req, res) => {
  let sql = $sql.list.moviesList;
  let params = req.body
  conn.query(sql, [params.type, params.num], (err, data) => {
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

//弹幕列表
router.post('/danmuList', (req, res) => {
  let sql = $sql.list.danmuList;
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

//增加弹幕列表
router.post('/addDanmuList', (req, res) => {
  let sql = $sql.list.addDanmuList;
  let params = req.body
  let array = []
  for(let key in params) {
    array.push(params[key])
  }
  conn.query(sql, array, (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '增加失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '增加成功', data
      })
    }
  })
})

//增加评论列表
router.post('/addCommentList', (req, res) => {
  let sql = $sql.list.addCommentList;
  let params = req.body
  let array = []
  for(let key in params) {
    array.push(params[key])
  }
  conn.query(sql, array, (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '增加失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '增加成功', data
      })
    }
  })
})

//评论列表
router.post('/commentList', (req, res) => {
  let sql = $sql.list.commentList;
  let params = req.body
  conn.query(sql, [params.vID], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '查询评论列表失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '查询评论列表成功', data
      })
    }
  })
})

//排行榜
router.post('/labelList', (req, res) => {
  let sql = $sql.list.labelList;
  let params = req.body
  conn.query(sql, [params.label], (err, data) => {
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

//获取用户前三视频数据
router.post('/frontList', (req, res) => {
  let sql = $sql.list.frontList;
  let params = req.body
  conn.query(sql, [params.ID], (err, data) => {
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

//获取用户发布视频的最新评论
router.post('/messageList', (req, res) => {
  let sql = $sql.list.messageList;
  let params = req.body
  conn.query(sql, [params.ID], (err, data) => {
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

//获取用户发布视频的最新弹幕
router.post('/barrageList', (req, res) => {
  let sql = $sql.list.barrageList;
  let params = req.body
  conn.query(sql, [params.ID], (err, data) => {
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

//获取活动列表
router.post('/actList', (req, res) => {
  let sql = $sql.list.actList;
  // let params = req.body
  conn.query(sql, [], (err, data) => {
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

module.exports = router