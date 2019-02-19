// Components/SMButton/SMButton.js
Component({

  lifetimes: {
    attached() {
      this.setData({
        nowActivity: this.properties.opacity
      })
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: String,
      value: '60rpx'
    },
    backgroundColor: {
      type: String,
      value: 'transparent'
    },
    borderRadius: String,
    state: {
      type: String,
      value: 'normal'
    },
    title: String,
    titleColor: {
      type: String,
      value: 'black'
    },
    fontSize: {
      type: String,
      value: '32rpx'
    },
    opacity: {
      type: Number,
      value: 1
    },
    activityOpacity: {
      type: Number,
      value: 0.6
    },
    display: {
      type: String,
      value: 'inline-flex'
    },
    flex: {
      value: 1,
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    nowActivity: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchStart: function () {
      this.setData({
        nowActivity: this.properties.activityOpacity
      })
    },
    touchEnd: function () {
      this.setData({
        nowActivity: this.properties.opacity
      })
    },
    onpress: function () {
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('onpress', myEventDetail, myEventOption)
    }
  },

})