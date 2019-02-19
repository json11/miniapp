// pages/WaitTaskModule/Merchant/Detail/Detail.js

import { request, URLDefines } from '../../client.js'

import { formatTimeTimeStamp } from '../../../../utils/util.js'

import { getMerchantTypeDesc, getMerchantIntentionRankDesc } from '../../../../utils/ordertool.js'

import { prepare } from '../IntendedAlter/IntendedAlterTool.js'

const app = getApp()

Page({

  id: '', // 当前详情ID

  /**
   * 页面的初始数据
   */
  data: {
    bars: [
      { name: '意向信息', id: '0' }, 
      { name: '拜访记录', id: '1' }
    ],
    barIndex: '0',
    merchantInfo: {},
    visitList: [{ id: '1' }, { id: '2' }],
    intendedMerchantId: '' // 意向商户ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id
  },

  onShow: function () {
    this.getData()
  },

  getData: function () {
    request(URLDefines.merchantInfo, {
      params: {
        id: this.id
      },
      dataValidate: ({ inData }) => {
        return inData && inData.merchantInfo && inData.visitList
      },
      autoDealError: true,
      complete: ({ error, inData }) => {
        // 转中文
        inData.merchantInfo.typeName = getMerchantTypeDesc(inData.merchantInfo.type)
        inData.merchantInfo.intentionRankName = getMerchantIntentionRankDesc(inData.merchantInfo.intentionRank)
        // 时间转换
        inData.merchantInfo.createTime = formatTimeTimeStamp(inData.merchantInfo.createTime)
        for (let i = 0; i < inData.visitList.length; i++) {
          inData.visitList[i].index = inData.visitList.length - i
          inData.visitList[i].createTime = formatTimeTimeStamp(inData.visitList[i].createTime)
        }
        // 更新UI
        this.setData({
          merchantInfo: inData.merchantInfo,
          visitList: inData.visitList,
          intendedMerchantId: inData.merchantInfo.id
        })
        wx.setNavigationBarTitle({
          title: inData.merchantInfo.storeName,
        })
      }
    })
  },

  /**
   * 打电话
   */
  onCallPhone: function () {
    if (this.data.merchantInfo.telephone) {
      wx.makePhoneCall({
        phoneNumber: this.data.merchantInfo.telephone,
      })
    }
  },

  // bar 切换
  barChange: function (evt) {
    this.setData({
      barIndex: evt.detail.id
    })
  },

  // 左右滑动
  swiperChange: function (evt) {
    this.setData({
      barIndex: evt.detail.current + ''
    })
  },

  // 点击编辑意向信息
  onClickEditIntention: function () {
    prepare((constant) => {
      wx.navigateTo({
        url: '/pages/WaitTaskModule/Merchant/IntendedAlter/IntendedAlter?action=edit&submitModel=' + JSON.stringify(this.data.merchantInfo) + '&constant=' + JSON.stringify(constant),
      })
    })
  },

  // 增加拜访记录
  onAddVisit: function () {
    wx.navigateTo({
      url: '/pages/WaitTaskModule/Merchant/VisitAlter/VisitAlter?action=add&intendedMerchantId=' + this.data.intendedMerchantId,
    })
  }
})