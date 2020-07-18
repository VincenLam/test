let ENV = 'prod'
const {
  miniProgram: {
    envVersion = 'develop'
  }
} = wx.getAccountInfoSync()
console.log('envVersion===>', envVersion)
if (envVersion === 'develop') {
  // 工具或者真机 开发环境
  ENV = 'dev'
} else if (envVersion === 'trial') {
  // 测试环境(体验版)
  ENV = 'dev'
} else if (envVersion === 'release') {
  // 正式环境
  ENV = 'prod'
}
const HOST = 'https://cdn.hello4am.com'
const URL_ADMIN = {
  dev: 'https://dev.hello4am.com',
  prod: 'https://prod.hello4am.com'
}
const CONFIG = {
  VERSION: envVersion,
  URL: `${URL_ADMIN[ENV]}`,
  URL_UPLOAD: `${HOST}/api`,
  URL_PREFIX: `${HOST}/web/`
}
export default CONFIG