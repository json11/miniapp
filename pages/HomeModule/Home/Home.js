// pages/HomeModule/Home/Home.js

import { getHomeInfo, getWaitTaskInfo } from '../client.js';

import { getShareInfo } from '../../../utils/share.js';

const app = getApp();

// 代办任务的菜单
const WaitSessionMenu = {
  order: {
    id: 'order',
    name: '订单类'
  },
  business: {
    id: 'business',
    name: '招商类'
  },
  store: {
    id: 'store',
    name: '建店类'
  }
};

// 菜单配置
const Menu = {
  high: {
    id: 'high',
    name: '高速',
    leftClass: 'yellow',
    rightClass: 'black',
    centerClass: 'black'
  },

  all: {
    id: 'all',
    name: '全部',
    leftClass: 'black',
    rightClass: 'black',
    centerClass: 'yellow'
  },

  low: {
    id: 'low',
    name: '低速',
    leftClass: 'yellow',
    rightClass: 'black',
    centerClass: 'black'
  },
};

// 我的服务菜单
const ServiceMenu = {
  yewu: {
    id: 'yewu',
    title: '业务统计',
    src: './Source/icon_yewutongji.png',
  },
  daiban: {
    id: 'daiban',
    title: '全部任务',
    src: './Source/icon_daibanrenwu.png',
  },
  storemanager: {
    id: 'storemanager',
    title: '管理门店',
    src: './Source/icon_mendianguanli.png',
  },
  myMerchant: {
    id: 'mymerchant',
    title: '招商管理',
    src: './Source/icon_business.png',
  }
}

Page({

  // 待办任务-接口是否正在请求
  waitTaskRequesting: false,

  // 我的数据是否正在网络请求
  requesting: false,

  // 我的数据网络请求返回来的数据
  originalData: {},

  // 我的数据-选中的条目
  selectedItem: null,

  /**
   * 页面的初始数据
   */
  data: {
    // 代办任务模块的数据
    waitSelectedId: WaitSessionMenu.business.id,
    waitMenuList: [WaitSessionMenu.order, WaitSessionMenu.business, WaitSessionMenu.store],
    waitData:{
      intentionNum: 0,
      standardNum: 0,
      todayIntentionNum: 0,
      todayStandardNum: 0
    },

    // 我的数据模块的数据
    myDataMenuList: [ Menu.all, Menu.high, Menu.low],
    data: {},
    selectedId: Menu.all.id,

    // 服务模块
    services: [ServiceMenu.yewu, ServiceMenu.daiban, ServiceMenu.myMerchant, ServiceMenu.storemanager]
  },

  onLoad: function () {
    this.getWaitTaskData();
    this.getData()
  },

  onReady: function () {
    // 默认选中项
    this.onClickMenu(Menu.all.id)
  },

  onShow: function () {
    this.getData()
    this.getWaitTaskData()
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.getData()
    this.getWaitTaskData()
  },

  // 获取数据
  getData() {
    if (this.requesting) {
      return;
    }
    this.requesting = true;
    getHomeInfo({
      autoDealError: () => {
       this.requesting = false 
      },
      dataValidate: ({ inData, error }) => {
        return inData && inData.high && inData.low && inData.total
      },
      complete: ({ inData, error }) => {
        this.requesting = false
        this.originalData = inData
        this.onClickMenu(this.data.selectedId || Menu.all.id)
      }
    })
  },

  /**
   *  待办任务
   */
  getWaitTaskData() {
    if (this.waitTaskRequesting) {
      return
    }
    this.waitTaskRequesting = true
    getWaitTaskInfo({
      autoDealError: () => {
        this.waitTaskRequesting = false
      },
      dataValidate: ({ inData, error }) => {
        return inData && inData.investment
      },
      complete: ({ inData }) => {
        this.waitTaskRequesting = false
        let waitData = {}
        // 订单类
        if (this.data.waitSelectedId === WaitSessionMenu.order.id) {} 
        // 招商类
        else if (this.data.waitSelectedId === WaitSessionMenu.business.id) {
          waitData = inData.investment
        }
        this.setData({
          waitData: waitData
        })
      }
    })
  },

  // 代办任务，切换 pagebar
  onSelectedWaitPageBar: function (evt) {
    let id = evt.detail.id
    this.setData({
      waitSelectedId: id
    })
  },

  // 跳转到代办列表
  toWaitTask() {
    wx.navigateTo({
      url: '/pages/WaitTaskModule/TaskList/TaskList?type=wait',
    })
  },

  // 我的数据，切换 pagebar
  onSelectedMyDataPageBar: function (evt) {
    let id = evt.detail.id
    this.onClickMenu(id)
  },

  // 点击菜单
  onClickMenu: function (id) {
    // 点击高速
    if (id === Menu.high.id) {
      this.setData({
        left: { class: Menu.high.leftClass },
        center: { class: Menu.high.centerClass, titleClass: 'dataCenterItemBlack' },
        right: { class: Menu.high.rightClass },
        data: this.getShowData(id),
        selectedId: id,
      })
    } else if (id === Menu.all.id) {
      this.setData({
        left: { class: Menu.all.leftClass },
        center: { class: Menu.all.centerClass, titleClass: 'dataCenterItemWhite' },
        right: { class: Menu.all.rightClass },
        data: this.getShowData(id),
        selectedId: id,
      })
    } else if (id === Menu.low.id) {
      this.setData({
        left: { class: Menu.low.leftClass },
        center: { class: Menu.low.centerClass, titleClass: 'dataCenterItemBlack' },
        right: { class: Menu.low.rightClass },
        data: this.getShowData(id),
        selectedId: id,
      })
    }
  },
  getShowData: function (id) {
    if (id === Menu.high.id) {
      return this.originalData.high || {}
    } else if (id === Menu.low.id) {
      return this.originalData.low || {}
    } else if (id === Menu.all.id) {
      return this.originalData.total || {}
    }
  },

  // 点击全部里的待付款
  onClickWaitPay() {
    if (this.data.selectedId === 'all') {
      wx.navigateTo({
        url: '/pages/WaitTaskModule/TaskList/TaskList?type=wait&barIndex=1',
      })
    }
  },

  // 点击服务
  onClickService: function (evt) {
    // 服务
    let service = evt.currentTarget.dataset.service
    this.jumpToService(service.id)
  },

  // 跳转到服务
  jumpToService: function (id) {
    if (id === 'yewu') {
      wx.navigateTo({
        url: '/pages/StatisticModule/Business/Business',
      })
    } else if (id === 'daiban') {
      wx.navigateTo({
        url: '/pages/WaitTaskModule/TaskList/TaskList?type=all',
      })
    } else if (id === 'storemanager') {
      wx.switchTab({
        url: '/pages/StoreModule/StoreList/StoreList',
      })
    } else if (id === 'mymerchant') {
      wx.navigateTo({
        url: '/pages/WaitTaskModule/MyMerchantList/MyMerchantList',
      })
    }
  },

  onShareAppMessage(res) {
    return getShareInfo('home')
  }
})