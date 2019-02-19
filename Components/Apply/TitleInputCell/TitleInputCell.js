// Components/Apply/TitleInputCell/TitleInputCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: String,
    // 输入框内容
    value: {
      value: null,
      type: String,
    },
    // text	文本输入键盘
    // number	数字输入键盘
    // idcard	身份证输入键盘
    // digit	带小数点的数字键盘
    inputType: {
      value: 'text',
      type: String,
    },
    // 最大长度。-1不限制
    maxlength: {
      value: -1,
      type: Number
    },
    // 类型
    // none 右侧无按钮
    // info 右侧有一个详情按钮
    // scan 右侧有一个扫描按钮
    // text 右侧文本
    type: {
      value: 'none',
      type: String
    },
    // 当 type 为 text 时使用
    text: String,
    // 占位字符
    placeholder: {
      value: '请输入',
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
    onChangeText: function (value) {
      this.triggerEvent('input', value.detail)
    },
    onBeginEdit: function () {
      this.triggerEvent('beginEdit')
    },
    onEndEdit: function () {
      this.triggerEvent('endEdit')
    }
  }
})
