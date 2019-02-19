// pages/MineModule/AlterPWD/NewPwd/NewPWD.js

import * as Check from '../../../../utils/check.js'

import { md5 } from '../../../../utils/md5.js'

import { request, URLDefines } from '../../client.js'

const app = getApp()

Page({

  /**
   * 组件的初始数据
   */
  data: {
    // 新密码
    showPWD: false,
    PWDEditing: false,
    pwd: null,

    // 重新输入新密码
    showEnsurePWD: false,
    ensurePWDEditing: false,
    ensurePWD: null,

    // 内容是否合法
    contentValid: false
  },

  // 点击登陆按钮
  onEnsure: function () {
    if (!this.data.contentValid) {
      return
    }
    if (this.data.ensurePWD !== this.data.pwd) {
      app.makeHint('密码不一致')
      return
    }
    app.makeActivity()
    request(URLDefines.updatePwd, {
      params: {
        newPwd: md5(app.userInfo.telephone + this.data.ensurePWD).toUpperCase()
      },
      autoDealError: true,
      complete: () => {
        app.makeHint('密码修改成功')
        wx.navigateBack({
          delta: 2
        })
      }
    })
  },

  // 输入密码
  onPWDChangeText: function (res) {
    this.setData({
      pwd: res.detail.value
    }, () => {
      this.checkContentValid()
    })
  },
  // 检查内容是否合法，判断登陆按钮是否可用
  checkContentValid: function () {
    let valid = Check.checkEmpty(this.data.pwd) && Check.checkEmpty(this.data.ensurePWD)
    this.setData({ contentValid: valid })
  },

  // 小眼睛点击
  onClickEyeAction: function () {
    this.setData({ showPWD: !this.data.showPWD })
  },
  // 密码开始编辑
  onPWDBeginEdit: function () {
    this.setData({ PWDEditing: true })
  },
  // 密码开始编辑
  onPWDEndEdit: function () {
    this.setData({ PWDEditing: false })
  },

  // 输入密码
  onEnsurePWDChangeText: function (res) {
    this.setData({
      ensurePWD: res.detail.value
    }, () => {
      this.checkContentValid()
    })
  },
  // 小眼睛点击
  onClickEnsureEyeAction: function () {
    this.setData({ showEnsurePWD: !this.data.showEnsurePWD })
  },
  // 密码开始编辑
  onEnsurePWDBeginEdit: function () {
    this.setData({ ensurePWDEditing: true })
  },
  // 密码开始编辑
  onEnsurePWDEndEdit: function () {
    this.setData({ ensurePWDEditing: false })
  },
})
