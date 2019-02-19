// pages/StoreModule/Store/QueryOrder/QueryOrder.js
import {request, URLDefines} from "../../client";
import {formatTimeTimeStamp } from '../../../../utils/util.js';
import { getOrderStatusColor } from '../../../../utils/ordertool.js';

Component({
  lifetimes: {
    created() {
      this.page = 1;
      this.pageSize = 10;
      this.completed = false;
    }
  },

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
    empty: false,
    orderlist: []
  },

  ready() {
    this.getData(true);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData(refresh) {
      if (!refresh && this.completed) {
        return;
      }
      let page = refresh ? 1 : (this.page + 1);

      request(URLDefines.orderlist, {
          params: {
            storeId: this.properties.storeId,
            page: page,
            pageSize: this.pageSize
          },
          autoDealError: true,
          complete: ({ inData }) => {
              this.page = page;
              let data = inData || [];
              this.completed= data.length < this.pageSize;

              for (let item of data) {
                  if (!item.orderModels) {
                      item.orderModels = []
                  }
                  item.orderTimeDesc = item.orderTime ? formatTimeTimeStamp(item.orderTime) : '';
                  item.orderStatusColor = getOrderStatusColor(item.orderStatus);
              }

              let resultData = refresh ? data : this.data.orderlist.concat(data);
              this.setData({
                  empty: !resultData.length,
                  orderlist: resultData
              });
          }
      });
    },
    onToDetail(event) {
      let orderNo = event.currentTarget.dataset.orderno;
      wx.navigateTo({
        url: '../OrderDetail/OrderDetail?orderNo=' + orderNo
      })
    },
    /**
   *  滚动到顶部
   */
    backTop: function () {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
})
