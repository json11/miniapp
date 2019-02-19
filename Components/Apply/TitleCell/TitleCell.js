// Components/Apply/TitleCell/TitleCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: String,
    // 内容
    value: {
      value: null,
      type: String,
    },
    // 是否禁用本身的点击事件的回调。如果为 1，则本身不会处理任何点击事件，0 将会拦截点击事件
    disableTap: {
      value: '0',
      type: String,
    },
    // 类型
    // none 右侧无按钮
    // info 右侧有一个详情按钮 未实现
    // scan 右侧有一个扫描按钮 未实现
    // arrowright 右侧有一个向右的箭头
    // phone 右侧有一个电话符号
    // text 右侧文本
    type: {
      value: 'none',
      type: String
    },
    // 右侧的图片是否挨着文本
    imageSideValue: {
      value: '0',
      type: String
    },
    // 图片左边距
    imageMarginLeft: {
      value: '40rpx',
      type: String
    },
    // 当 type 为 text 时使用
    text: String,
    // 是否需要分割线 0 1，此分割线指 value 下方的分割线
    sep: {
      value: '1',
      type: String
    },
    // 底部分割线。指底部的分割线，整行存在
    bottomBorderSep: {
      value: '0',
      type: String
    },
    // 最左侧黄色分割线是否显示
    sideSep: {
      value: '0',
      type: String
    },
    // 高度
    height: {
      value: '70rpx',
      type: String
    },
    // 占位字符
    placeholder: {
      value: null,
      type: String
    },
    // 标题颜色
    titleColor: {
      value: '#9b9b9b',
      type: String,
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
    // 内容到标题的距离
    valueMarginLeft: {
      value: '20rpx',
      type: String
    },
    // 右边距
    marginRight: {
      value: '40rpx',
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
    onClickCell: function () {
      this.triggerEvent('clickcell')
    }
  }
})
