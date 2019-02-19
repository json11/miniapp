// pages/WaitTaskModule/TaskList/TaskList.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // all 或者 wait
    type: '',
    barIndex: '0',
    bars: [
      {
        name: '招商类',
        id: '0'
      },
      {
        name: '订单类',
        id: '1'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      type: options.type,
      barIndex: options.barIndex || '0'
    })
    wx.setNavigationBarTitle({
      title: this.data.type === 'all' ? '全部任务' : '待办任务',
    })
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
})