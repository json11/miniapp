// pages/StoreModule/Store/StoreBoard/StoreData/StoreData.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    },
    category: {
      type: String
    },
    storeId: {
      type: String
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
    onTap(event) {
      let num= event.currentTarget.dataset.num;
      if(num > 0) {
          wx.navigateTo({
              url: '../WaitPay/WaitPay?storeId=' + this.data.storeId + '&category=' + this.data.category
          })
      }
    },
  }
})
