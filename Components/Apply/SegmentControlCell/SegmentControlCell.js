// Components/Apply/SegmentControlCell/SegmentControlCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: String,
    // Array<Object: {code, name}>
    items: {
      value: [],
      type: Array
    },
    value: {
      value: null,
      type: String
    },
    // 标题宽度
    titleWidth: {
      value: '168rpx',
      type: String,
    },
    // 标题到左边的距离
    titleMarginLeft: {
      value: '40rpx',
      type: String
    },
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
    onSelected: function (evt) {
      this.triggerEvent('selected', evt.detail)
    }
  }
})
