import {baseURL} from './config.js'
// 封装网络请求
export default function(options) {
  return new Promise((resolve,reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'get',
      data: options.data || null,
      success:resolve,
      fail:reject
    })
  })
}