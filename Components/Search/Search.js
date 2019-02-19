// Components/Search/Search.js

import { checkEmpty } from '../..//utils/check.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: '搜索姓名/手机号'
    }
  },

  /*
   * 输入的内容
  */
  text: null,

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 键盘点击完成
    onSearchDone: function () {
      this.onSearch()
    },
    // 点击搜索
    onSearch: function () {
      this.triggerEvent('search', { value: this.text })
    },
    // 内容改变
    onChangeText: function (res) {
      this.text = res.detail.value
    }
  }
})
