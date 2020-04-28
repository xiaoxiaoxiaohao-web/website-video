const userApi = require('./api/userApi')
const videoApi = require('./api/videoApi')
const listApi = require('./api/listApi')
const sumApi = require('./api/sumApi')
const rootApi = require('./api/rootApi')
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

//数据库连接设置
app.all("*", function(req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*")
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
  if (req.method.toLowerCase() == 'options')
    res.sendStatus(200); //让options尝试请求快速结束
  else
    next();
})

//文件连接设置
let videoPath = http.createServer(function(req, res){
  //默认文件夹
  var staticPath = path.join(__dirname,'file')
  var pathObj = url.parse(req.url, true)         
  console.log(pathObj)  
  var filePath = path.join(staticPath, pathObj.pathname)                                                      
  var fileContent = fs.readFileSync(filePath,'binary')
  if(pathObj.path.includes('mp4')) {
    const { size } = fs.statSync(filePath); //获取视频长度
    res.status = 206
    //设置视频连接时的请求头部
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Accept-Ranges', 'bytes')
    res.setHeader('Content-Type', 'video/mp4')
    res.setHeader('Content-Range', `byte 200-1000/${size}`)
    res.setHeader('Content-Length', size)
  }
  res.write(fileContent,'binary')
  res.end()
})



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// api路由
app.use('/user', userApi)
app.use('/video', videoApi)
app.use('/list', listApi)
app.use('/sum', sumApi)
app.use('/root', rootApi)

// 监听端口
app.listen(3000) //数据端口
videoPath.listen(3001) //读取文件端口
console.log('success listen at port:3000(数据库端口)......')
console.log('success listen at port:3001(文件端口)......')