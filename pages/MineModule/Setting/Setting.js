// pages/MineModule/Setting/Setting.js

import { request, URLDefines } from '../client.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 修改密码
  onAlterPWD: function () {
    wx.navigateTo({
      url: '/pages/MineModule/AlterPWD/OldPWD/OldPWD',
    })
  },

  // 退出登录
  onLoginOut: function () {
    wx.showModal({
      title: '确认退出登录',
      content: '退出登录将解绑此微信账号',
      showCancel: true,
      confirmText: '退出登录',
      confirmColor: '#ff0000',
      success: res => {
        if (res.confirm) {
          app.makeActivity()
          request(URLDefines.logOut, {
            autoDealError: true,
            complete: () => {
              app.hiddenActivity()
              app.userInfo.token = null;
              getApp().userInfo.telephone = null;
              wx.reLaunch({
                url: '/pages/LoginModule/Login/Login',
              })
            }
          })
        }
      }
    })
  }
})