/**
 * 二次封装showToast
 * @param {*} message
 */ 
const showToast = message => {
  wx.showToast({
    title: message || '系统异常，请稍后再试~',
    icon: 'none'
  })
}

/**
 * 二次封装showModal
 * @param {*} message 
 */
const showModal = message => {
  wx.showModal({
    title: '提示',
    content: message,
    showCancel: false,
    success: (res) => {
      // console.log('showModal success', res)
      if (res.confirm) {
        // 正常返回上一页，若返回失败则直接回到首页
        wx.navigateBack({
          fail: (err) => {
            console.log('navigateBack fail', err)
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }
        })
      }
    }
  })
}

// 防抖函数
const debounce = (fn, delay = 1000) => {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

// 节流函数
const throttle = (fn, delay = 5000) => {
  let preTime = +new Date()
  return function () {
    const nowTime = +new Date()
    if (nowTime - preTime >= delay) {
      fn.apply(this, arguments)
      preTime = nowTime
    }
  }
}

module.exports = {
  showToast,
  showModal,
  debounce,
  throttle
}