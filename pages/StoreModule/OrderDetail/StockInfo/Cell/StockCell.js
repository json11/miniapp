// pages/StoreModule/OrderDetail/StockInfo/Cell/StockCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    },
    currentIndex: {
      type: Number,
      value: -1
    },
    index: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect() {
      this.triggerEvent('select', { index: this.data.index })
      this.setData({
        show: !this.data.show
      });
    }
  }
})
