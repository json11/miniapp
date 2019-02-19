// pages/LoginModule/ForgetPWD/ForgetPWD.js

import * as Check from '../../../utils/check.js';

import { request, URLDefines } from '../client.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneEditing: false,
    PWDEditing: false,
    phoneNum: null,
    pwd: null,
    contentValid: false,
    codeText: '获取验证码',
    leftTime: 60
  },

  /**
   * 登录
   */
  onClickLogin: function () {
    if (!this.data.contentValid) {
      return
    }
    app.makeActivity()
    request(URLDefines.resetPWD, {
      params: { 
        telephone: this.data.phoneNum,
        verifyCode: this.data.pwd
      },
      autoDealError: true,
      complete: () => {
        app.makeHint('新密码已经发送到您的手机')
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  /**
   * 点击发送验证码
   */
  onClickSendCode: function () {
    if (!(this.data.phoneNum || '').length) {
      app.makeHint('请输入手机号码')
      return;
    }
    if (this.data.leftTime !== 60) {
      return
    }
    app.makeActivity()
    request(URLDefines.sendCode, {
      params: { 
        telephone: this.data.phoneNum,
        type: 'EV_COMMON_CODE'
      },
      autoDealError: true,
      complete: () => {
        app.makeHint('验证码已经发送，请注意查收')
        this.beginTimer()
      }
    })
  },

  /**
   * 开始定时器
   */
  beginTimer: function (res) {
    if (this.data.leftTime === 1) {
      this.setData({
        leftTime: 60,
        codeText: '获取验证码'
      })
      return
    }
    this.setData({
      leftTime: this.data.leftTime - 1,
      codeText: (this.data.leftTime - 1) + 's后重发'
    })
    let timer = setTimeout(()=>{
      clearTimeout(timer)
      this.beginTimer()
    }, 1000)
  },

  /**
   * 输入手机号
   */
  onPhoneChangeText: function (res) {
    this.setData({
      phoneNum: res.detail.value
    }, function () {
      this.checkContentValid()
    })
  },

  /**
   * 输入验证码
   */
  onPWDChangeText: function (res) {
    this.setData({
      pwd: res.detail.value
    }, function () {
      this.checkContentValid()
    })
  },

  /**
   * 检查内容是否合法，判断登陆按钮是否可用
   */
  checkContentValid: function () {
    let valid = Check.checkMobilePhone(this.data.phoneNum) && Check.checkEmpty(this.data.pwd)
    this.setData({ contentValid: valid })
  },
  // 密码开始编辑
  onPWDBeginEdit: function () {
    this.setData({ PWDEditing: true })
  },
  // 密码开始编辑
  onPWDEndEdit: function () {
    this.setData({ PWDEditing: false })
  },
  // 手机号开始编辑
  onPhoneBeginEdit: function () {
    this.setData({ phoneEditing: true })
  },
  // 手机号开始编辑
  onPhoneEndEdit: function () {
    this.setData({ phoneEditing: false })
  },
})