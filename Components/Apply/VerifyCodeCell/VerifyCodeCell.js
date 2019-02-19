// Components/Apply/VerifyCodeCell/VerifyCodeCell.js
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
    // 类型
    // none 右侧无按钮
    // info 右侧有一个详情按钮
    // scan 右侧有一个扫描按钮
    type: {
      value: 'none',
      type: String
    },
    // 占位字符
    placeholder: {
      value: '请选择',
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
    leftTime: 60,
    codeText: '获取验证码'
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
    },

    /**
     * 点击发送验证码
     */
    onClickSendCode: function () {
      if (this.data.leftTime !== 60) {
        return
      }
      this.triggerEvent('sendcode', { 
        beginTimer: ()=>{
          this.beginTimer()
        }})
    },

    /**
     * 开始定时器
     */
    beginTimer: function () {
      if (this.data.leftTime === 1) {
        this.setData({
          leftTime: 60,
          codeText: '获取验证码'
        })
        return
      }
      this.setData({
        leftTime: this.data.leftTime - 1,
        codeText: (this.data.leftTime - 1) + 's后重发'
      })
      let timer = setTimeout(() => {
        clearTimeout(timer)
        this.beginTimer()
      }, 1000)
    },
  }
})
