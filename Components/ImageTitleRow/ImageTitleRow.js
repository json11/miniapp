// Components/ImageTitleRow/ImageTitleRow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    icon: String,
    title: String,
    // 是否需要箭头
    arrow: {
      type: Boolean,
      value: true,
    },
    // 样式 1: 默认样式 2. 文字在中间
    mode: {
      type: String,
      value: '1'
    },
    // 指定高度
    height: {
      type: Number,
      value: 88
    },
    // 是否需要分割线
    sep: {
      type: Boolean,
      value: true
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
    onClick: function () {
      this.triggerEvent('selected')
    }
  }
})
