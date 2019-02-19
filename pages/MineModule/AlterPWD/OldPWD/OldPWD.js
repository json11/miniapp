// pages/MineModule/AlterPWD/OldPWD/OldPWD.js

import * as Check from '../../../../utils/check.js'

import { md5 } from '../../../../utils/md5.js'

import { request, URLDefines } from '../../client.js'

const app = getApp()

Page({
 
  /**
   * 组件的初始数据
   */
  data: {
    showPWD: false,
    PWDEditing: false,
    pwd: null,
    // 内容是否合法
    contentValid: false
  },

  // 点击登陆按钮
  onEnsure: function () {
    if (!this.data.contentValid) {
      return
    }
    app.makeActivity()
    request(URLDefines.verifyOldPwd, {
      params: {
        oldPwd: md5(app.userInfo.telephone + this.data.pwd).toUpperCase()
      },
      autoDealError: true,
      complete: () => {
        app.hiddenActivity()
        wx.navigateTo({
          url: '../NewPWD/NewPWD',
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
    let valid = Check.checkEmpty(this.data.pwd)
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
})
