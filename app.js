//app.js

import { request } from './utils/SMAPI.js';

App({
  // APP登录成功
  onLaunch: function () {
    wx.login({
      success: res => {
        console.log(res)
      }
    })
  },
  urlInfo: {
    ossUrl: 'https://oss-api.pajr.com/oss/api/entry/',
    channelUrl: 'https://ev-server.pajr.com/ev-server/',
    baseUrl: 'https://ev-cpss-server.pajr.com/ev-cpss-server/'
  },
  // 全局用户信息
  userInfo: {
    token: null,
    telephone: null
  },
  // 网络请求
  request: request,
  // 提示语
  makeHint: function (msg) {
    wx.showToast({
      icon: 'none',
      mask: true,
      title: msg,
    })
  },
  // loading
  makeActivity: function (msg) {
    wx.showLoading({
      icon: 'none',
      mask: true,
      title: msg || ' ',
    })
  },
  // 隐藏 loading
  hiddenActivity: function () {
    wx.hideLoading()
  },
})