// pages/MineModule/Hierarchy/Hierarchy.js

import { request, URLDefines } from '../client.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    higherLevel: [],
    lowerLevel: [],
    noLowerLevel: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.getData()
  },

  getData() {
    request(URLDefines.hierarchy, {
      autoDealError: true,
      complete: ({inData}) => {
        if (inData) {
          this.setData({
            higherLevel: inData.higherLevel || [],
            lowerLevel: inData.lowerLevel || [],
            noLowerLevel: !inData.lowerLevel.length
          })
        }
      }
    })
  },

  onPhoneCall: function (event) {
    let phoneNum = event.currentTarget.dataset.phonenum;
    if (phoneNum) {
      wx.makePhoneCall({
        phoneNumber: phoneNum,
      })
    }
  }
})