// Components/SegmentControl/SegmentControl.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // Array<Object: {code, name}>
    items: {
      value: [],
      type: Array
    },
    value: {
      value: null,
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
    onClickItem: function (evt) {
      let item = evt.currentTarget.dataset.item
      this.triggerEvent('selected', item)
    }
  }
})
