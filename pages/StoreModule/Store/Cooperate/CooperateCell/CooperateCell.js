// pages/StoreModule/Store/Cooperate/CooperateCell/CooperateCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    carModelList: {
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
    // 预览图片
    onClickImage: function (res) {
      let list = res.currentTarget.dataset.list
      let url = res.currentTarget.dataset.url
      if (list && url) {
        let urls = []
        for (let item of list) {
          urls.push(item.url)
        }
        wx.previewImage({
          urls: urls,
          current: url
        })
      }
    }
  }
})
