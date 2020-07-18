//app.js
import api from './api/api'
import CONFIG from './api/config'
import log from './utils/log'
import util from './utils/util'
import moment from './utils/moment'
import CONSTANT from './constant/index'

App({
  onLaunch() {
    // 注册全局方法
    wx.$api = api
    wx.$CONFIG = CONFIG
    wx.$log = log
    wx.$util = util
    wx.$moment = moment
    wx.$CONSTANT = CONSTANT
    // 获取当前小程序版本
    this.globalData.version = CONFIG.VERSION
    // 获取系统信息
    const res = wx.getSystemInfoSync()
    // console.log(res)
    const StatusBar = res.statusBarHeight
    this.globalData.CustomBar = 44 + StatusBar
    this.globalData.StatusBar = StatusBar
    // 监听小程序更新
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(() => {
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
  },

  globalData: {
    // develop 开发版 trial 体验版 release 正式版
    version: 'develop',
    CustomBar: 88,
    StatusBar: 44
  }
})