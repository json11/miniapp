// pages/StoreModule/Store/Component/NavBar/NavBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentIndex: {
      type: Number,
      value: 0
    },
    navBars: {
      type: Array,
      value: []
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
    onSelect(event) {
      let index = event.currentTarget.dataset['index'];
      this.triggerEvent("select", {currentIndex: index})
    }
  }
})
