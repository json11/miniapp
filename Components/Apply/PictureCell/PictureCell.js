// Components/Apply/PictureCell/PictureCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 驱动模式
    // 1. 支持从本地选择
    // 2. 单纯的展示
    driveMode: {
      value: '1',
      type: String
    },
    // 图片类型，也可称为唯一id。选择照片后，回调时，将会回调 type。用来区分图片
    type: {
      value: 'default',
      type: String
    },
    // 标题
    title: {
      value: '图片',
      type: String,
    },
    // 占位图片
    phImage: String,
    // 远端图片资源
    src: String,
    // 本地路径
    local: null,
    // 图片宽度
    imageWidth: {
      value: '192rpx',
      type: String,
    },
    // 图片高度
    imageHeight: {
      value: '110rpx',
      type: String
    },
    // 是否可以从相册选取照片
    album: {
      value: '1',
      type: String,
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
    /**
     * 点击
     */
    onClick: function () {
      var that = this
      // 支持从相册相机选择
      if (this.properties.driveMode === '1') {
        let itemList = [] 
        if (this.properties.src || this.properties.local) {
          itemList.push('预览')
        }
        if (this.properties.album === '1') {
          itemList.push('相册')
        }
        itemList.push('相机')
        wx.showActionSheet({
          itemList: itemList,
          success: res => {
            let index = res.tapIndex
            let title = itemList[index]
            // 预览
            if (title === '预览') {
              wx.previewImage({
                urls: [(this.properties.local || this.properties.src)],
              })
            } 
            // 相册
            else if (title === '相册') {
              this.chooseImage('album')
            } else if (title === '相机') {
              this.chooseImage('camera')
            }
          },
        })
      } else if (this.properties.local || this.properties.src) {
        wx.previewImage({
          urls: [(this.properties.local || this.properties.src)],
        })
      }
    },
    chooseImage: function (type) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: [type],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0]
          this.triggerEvent('update', { type: this.properties.type, local: tempFilePath })
        },
      })
    }
  }
})
