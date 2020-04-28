var express = require('express')
var router = express.Router()
var $sql = require('../sqlMap')
var mysql = require('mysql')
var models = require('../db')
var conn = mysql.createConnection(models.mysql);
conn.connect();

//获得用户播放/信息/弹幕总数
router.post('/getNumSum', (req, res) => {
  let params = req.body
  let sql = 'select sum(' + params.attribute1 + ') as sum1,  sum(' + params.attribute2 + ') as sum2,  sum(' + params.attribute3 + ') as sum3 from video left join user on video.ID = user.ID where state = "已通过" and username = "' + params.username + '"'
  conn.query(sql, [], (err, data) => {
    if (err) {
      return res.json({
        state: '0', msg: '计算总数失败', err
      })
    }
    if (data) {
      res.json({
        state: '1', msg: '计算总数成功', data
      })
    }
  })
})

module.exports = router