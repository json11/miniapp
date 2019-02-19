// pages/MineModule/Mine/Mine.js

import { request, URLDefines } from '../client.js'

import { getShareInfo } from '../../../utils/share.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    request(URLDefines.mineInfo, {
      autoDealError: true,
      dataValidate: ({inData}) => inData,
      complete: ({inData}) => {
        this.setData({ data: inData })
      }
    })
  },

  onSelectedHierarchy: function () {
    wx.navigateTo({
      url: '/pages/MineModule/Hierarchy/Hierarchy',
    })
  },

  onSelectedSetting: function () {
    wx.navigateTo({
      url: '/pages/MineModule/Setting/Setting',
    })
  },

  onShareAppMessage(res) {
    return getShareInfo('mine')
  }
})