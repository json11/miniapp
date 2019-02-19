// Components/PageBar/PageBar.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // Object<{ id name }>
    items: {
      value: [],
      type: Array
    },
    selectedId: {
      value: null,
      type: String
    },
    height: {
      value: '88rpx',
      type: String
    },
    // 是否展示下分割线 0 1
    sep: {
      value: '1',
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
    onClickItem: function (event) {
      let item = event.currentTarget.dataset.item
      if (item) {
        this.triggerEvent('selected', item)
      }
    }
  }
})
