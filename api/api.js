import fly from './fly'
import qs from './lib/qs'
import CONFIG from './config'
export default {
  // 获取sessionKey
  getSessionKey(params) {
    return fly.get('/login/getSessionKey', params)
  },
  // 获取手机号(form-data格式)
  getPhone(params) {
    return fly.post(`/login/getPhone?${qs.stringify(params)}`)
  },
  // 上传单张图片
  uploadFile(filePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: CONFIG.URL_UPLOAD,
        name: 'file',
        filePath,
        success: (res) => {
          console.log('uploadFile success===>', res.data)
          const data = JSON.parse(res.data)
          if (data.code === 0) {
            resolve(data.data)
          } else {
            reject(data)
          }
        },
        fail: (err) => {
          console.log('uploadFile fail===>', err)
          reject(err)
        }
      })
    })
  },
  // 上传多张图片
  uploadfiles(filePaths) {
    let urls = []
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < filePaths.length; i++) {
        await this.uploadFile(filePaths[i]).then((url) => {
          urls[i] = url
        }).catch((err) => {
          reject(err)
        })
      }
      resolve(urls)
    })
  }
}