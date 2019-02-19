// pages/StoreModule/OrderDetail/StockInfo/StockInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commodities: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(res) {
      console.log(res.detail.index);
      this.setData({
        currentIndex: res.detail.index
      })
    }
  }
})
