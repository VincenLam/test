import CONFIG from './config'
const Fly = require('./lib/wx.umd.min')
const fly = new Fly()
const tokenFly = new Fly()
fly.config.baseURL = CONFIG.URL
tokenFly.config.baseURL = CONFIG.URL

// 检查sessionKey是否过期
function checkSession() {
  return new Promise((resolve) => {
    wx.checkSession({
      success: () => {
        // session_key 未过期，并且在本生命周期一直有效
        resolve(true)
      },
      fail: () => {
        // session_key 已经失效，需要重新执行登录流程
        resolve(false)
      }
    })
  })
}

// 登录获取token
function getToken() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        tokenFly.get('/login/token', {
          code: res.code
        }).then((result) => {
          const {
            code,
            data: {
              token
            }
          } = result.data
          if (code === 0 || code === 200) {
            try {
              wx.setStorageSync('token', token)
            } catch (err) {
              console.log('setStorageSync fail', err)
            }
            resolve(token)
          } else {
            reject(result.data)
          }
        })
      }
    })
  })
}

// 请求拦截器
fly.interceptors.request.use(async (request) => {
  let token = wx.getStorageSync('token')
  request.headers['Content-Type'] = 'application/json;charset=UTF-8'
  const isCheck = await checkSession()
  if (isCheck && token) {
    request.headers['Authorization'] = token
    return request
  } else {
    fly.lock()
    request.headers['Authorization'] = token = await getToken()
    fly.unlock()
    return request
  }
})

// 响应拦截器
fly.interceptors.response.use(async (response) => {
  if (response.data.code === 0 || response.data.code === 200) {
    return Promise.resolve(response.data)
  } else if (response.data.code === 401) { // token过期
    fly.lock()
    await getToken()
    fly.unlock()
    return fly.request(response.request)
  } else { // 其他错误
    console.error('err===>', response.data)
    wx.$util.showToast(response.data.msg)
    return Promise.reject(response.data)
  }
}, (err) => {
  wx.$util.showToast()
  console.error('err===>', err)
  return Promise.reject(err)
})

export default fly