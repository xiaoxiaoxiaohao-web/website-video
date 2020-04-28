import axios from 'axios'

var API = {}
API.use = (api, data, callback) => { // 接口的连接
  axios.post('http://localhost:3000/' + api, data).then((response) => {
    callback(response.data)
  }).catch(err => {
    console.log(err)
  })
}

export { API }
