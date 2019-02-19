// pages/Login/Components/Login/Login.js

import * as Check from '../../../../../utils/check.js';

import { hexMD5 } from '../../../../../utils/md5.js'

import { request, URLDefines } from '../../../client.js'

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showPWD: false,
    phoneEditing: false,
    PWDEditing: false,
    phoneNum: null,
    pwd: null,
    // 内容是否合法
    contentValid: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击忘记密码
    onClickForgetAction: function () {
      wx.navigateTo({
        url: '/pages/LoginModule/ForgetPWD/ForgetPWD',
      })
    },
    // 输入手机号
    onPhoneChangeText: function (res) {
      this.setData({ 
        phoneNum: res.detail.value 
        }, function () {
          this.checkContentValid()
        })
    },
    // 输入密码
    onPWDChangeText: function (res) {
      this.setData({
        pwd: res.detail.value
      }, function () {
        this.checkContentValid()
      })
    },
    // 检查内容是否合法，判断登陆按钮是否可用
    checkContentValid: function () {
      let valid = Check.checkMobilePhone(this.data.phoneNum) && Check.checkEmpty(this.data.pwd)
      this.setData({ contentValid: valid })
    },
    // 小眼睛点击
    onClickEyeAction: function () {
      this.setData({showPWD: !this.data.showPWD})
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
    // 点击登陆按钮
    onClickLogin: function () {
      if (!this.data.contentValid) {
        return
      }
      // 设备信息
      wx.getSystemInfo({
        success: (systemInfo) => {
          app.makeActivity('登录中...')
          // 定位信息
          this.getLocation(({ latitude, longitude }) => {
            // 微信登录获取 code
            wx.login({
              success: res => {
                let code = res.code
                // 服务器登录
                request(URLDefines.login, {
                  params: {
                    password: hexMD5(this.data.phoneNum + this.data.pwd).toUpperCase(),
                    platform: systemInfo.platform,
                    telephone: this.data.phoneNum,
                    wxCode: code
                  },
                  autoDealError: true,
                  dataValidate: ({ inData }) => {
                    return inData && inData.token
                  },
                  complete: ({ inData }) => {
                    app.hiddenActivity()
                    this.triggerEvent('login', { userInfo: inData })
                  }
                })
              },
              fail: () => {
                app.makeHint('登录失败')
              }
            })
          })
        },
      })
    },
    // 获取定位信息
    getLocation: function (callBack) {
      wx.getSetting({
        success: (res) => {
          if (!res.authSetting.hasOwnProperty('scope.userLocation') || res.authSetting['scope.userLocation']) {
            wx.getLocation({
              type: 'wgs84',
              success: res => {
                const latitude = res.latitude
                const longitude = res.longitude
                const speed = res.speed
                const accuracy = res.accuracy
                callBack({ latitude: latitude, longitude: longitude })
              },
              fail: (res) => {
                console.log(res)
                app.hiddenActivity()
                this.showLocationError()
              }
            })
          } else {
            app.hiddenActivity()
            this.showLocationHint(callBack)
          }
        }
      })
    },
    // 展示定位失败
    showLocationError: function (callBack) {
      wx.showModal({
        title: '测试--饭饭使用你的地理位置',
        content: '请检查定位权限是否开启',
        showCancel: true,
        confirmText: '重新定位',
        success: res => {
          if (res.confirm) {
            this.getLocation(callBack)
          }
        }
      })
    },
    // 展示定位权限没有打开
    showLocationHint: function () {
      wx.showModal({
        title: '测试--饭饭使用你的地理位置',
        content: '请打开定位权限',
        showCancel: true,
        confirmText: '去设置',
        success(res) {
          if (res.confirm) {
            wx.openSetting({
              
            })
          }
        }
      })
    }
  }
})
