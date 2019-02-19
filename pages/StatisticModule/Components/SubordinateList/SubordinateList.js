// pages/StatisticModule/SubordinateList/SubordinateList.js

import { request, URLDefines } from '../../client.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Boolean,
      value: false,
      observer: 'onSelected'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: [],
    empty: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelected: function (selected) {
      if (selected) {
        this.getData()
      }
    },
    scrollToTop: function (res) {
      this.getData()
    },
    getData: function () {
      request(URLDefines.subgroups, {
        autoDealError: true,
        complete: ({inData}) => {
          let data = inData || [];
          for (let index in data) {
            let intIndex = parseInt(index)
            data[intIndex].index = intIndex + 1 
          }
          this.setData({
            data: data,
            empty: !data.length
          })
        }
      })
    }
  }
})
