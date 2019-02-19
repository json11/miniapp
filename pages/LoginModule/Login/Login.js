// pages/Login/Login.js

import { getShareInfo } from '../../../utils/share.js'

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前状态 0: 未知 1: 待授权(包括拒绝) 2: 已授权
    state: 0,
    code: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (!res.authSetting.hasOwnProperty('scope.userInfo') || res.authSetting['scope.userInfo']) {
          this.setData({ state: 1 })
        } else {
          this.setData({ state: 2 })
        }
      }
    })
  },

  /**
   * 已经授权
   */
  onAuth: function (res) {
    if (res.detail.userInfo) {
      // 已经获取到用户信息
      this.onGetUserInfo(res.detail.userInfo)
    } else {
      // 用户未绑定或者调用后台查询绑定接口失败
      this.setData({ state: 2 })
    }
  },

  onLogin: function (res) {
    this.onGetUserInfo(res.detail.userInfo)
  },

  onGetUserInfo: function (userInfo) {
    app.userInfo = userInfo
    wx.reLaunch({
      url: '/pages/HomeModule/Home/Home',
    })
  },
  onShareAppMessage: function () {
    return getShareInfo('storeList')
  }
})
