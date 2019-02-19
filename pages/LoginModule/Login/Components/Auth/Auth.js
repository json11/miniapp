// pages/Login/Components/Auth/Auth.js

import { request, URLDefines } from '../../../client.js'

Component({
  
  lifetimes: {
    attached() {
      wx.login({
        success: (res) => {
          this.onGetCode(res.code)
        },
        fail: () => {
          this.triggerEvent('auth', { userInfo: null })
        }
      })
    },
  },

  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // code 更改
    onGetCode: function (code) {
      wx.getSystemInfo({
        success: (res) => {
          request(URLDefines.tokenByCode, {
            parseSet: {
              success: '200',
              token: []
            },
            params: {
              wxCode: code,
              platform: res.platform
            },
            complete: ({ error, inData }) => {
              if (error || !inData || !inData.token) {
                this.triggerEvent('auth', { userInfo: null })
              } else {
                this.triggerEvent('auth', { userInfo: inData })
              }
            }
          })
        },
        fail: () => {
          this.triggerEvent('auth', { userInfo: null })
        }
      })
    },
  }
})