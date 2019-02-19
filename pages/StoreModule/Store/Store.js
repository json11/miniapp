// pages/StoreModule/StoreList/StoreList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: '',
    currentIndex: 0,  
    navBars: [{ index: 0, title: "门店看板" }, { index: 1, title: "门店信息" }, { index: 2, title: "合作车型"}, { index: 3, title: "订单查询"}],
    storeBoard: {}, // 看板
    storeInfo: {},  // 门店信息
    carModelList: [], // 合作车型
    orderlist: []   // 订单查询
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let storeId = options.id;
    console.log(storeId);
    wx.setNavigationBarTitle({title: options.name}); // 设置头部标题
    this.setData({storeId});
  },

  /**
   *  选择tab 回调
   */
  onSelect(res) {
    // this.backTop();
    let currentIndex = res.detail.currentIndex;
    console.log(currentIndex);
    this.setData({
      currentIndex
    });
  },

  backTop: function () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      wx.stopPullDownRefresh();
      let _index = this.data.currentIndex;
      switch (_index) {
          case 0: 
            this.selectComponent('#storeboard').getData();
            break;
          case 1:
            this.selectComponent('#storeinfo').getData();
            break;
          case 2:
            this.selectComponent('#cooperate').getData();
            break;
          case 3:
            this.selectComponent('#queryorder').getData(true);
            break;
      }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let _index = this.data.currentIndex;
    if(_index === 3) {
      let queryorder = this.selectComponent('#queryorder');
      if (queryorder) {
        queryorder.getData(false);
      }
    }
  }
})