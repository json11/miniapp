// pages/StoreModule/Store/StoreInfo/StoreInfo.js
import { request, URLDefines } from '../../client.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    storeId: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    storeInfo: {}
  },

  ready() {
    this.getData();
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    /**
   *  获取数据
   */
    getData() {

      request(URLDefines.storeInfo, {
          params: {
              storeId: this.data.storeId
          },
          autoDealError: true,
          complete: ({inData}) => {

              let data = inData || {};
              this.setData({
                  storeInfo: data
              })
          }
      });
    },

    /**
     *  拨打电话
     */
    tel(event) {
      let tel = event.currentTarget.dataset.tel;
      wx.makePhoneCall({
        phoneNumber: tel
      });
    }
  }
})
