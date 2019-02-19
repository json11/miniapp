// pages/StoreModule/Store/StoreCell/StoreCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    store: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onStoreTap(event) {
      let storeId = event.currentTarget.dataset.storeid;
      let storeName = event.currentTarget.dataset.storename; 
      wx.navigateTo({
        url: '../Store/Store?id=' + storeId + '&name=' + storeName
      })
    },
    tel(event) {
      let tel = event.currentTarget.dataset.tel;
      wx.makePhoneCall({
        phoneNumber: tel
      });
    }
  }
})
