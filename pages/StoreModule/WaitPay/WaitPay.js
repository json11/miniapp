// pages/StoreModule/WaitPay/WaitPay.js
import {request, URLDefines} from "../client";
import { formatTimeTimeStamp } from '../../../utils/util.js';
import { getOrderStatusColor } from '../../../utils/ordertool.js';

Page({

  page: 1,

  pageSize: 10,

  loading: false,

  completed: false,  // 是否加载完成

  category: '', // 品类

  storeId: '',  // 

  /**
   * 页面的初始数据
   */
  data: {
    empty: false,
    orderlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeId = options.storeId;
    this.category = options.category;

    this.getData(true);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.getData(true);
  },

  /**
   *  页面上拉触底
   */
  onReachBottom: function () {
    if (!this.completed) {
      this.getData(false);
    }
  },

  /**
   *  滚动到顶部
   */
  backTop: function () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  /**
   *  待付款订单跳订单详情
   */
  onToDetail(event) {
    let orderNo = event.currentTarget.dataset.orderno;
    wx.navigateTo({
      url: '../OrderDetail/OrderDetail?orderNo=' + orderNo
    })
  },

  /**
   *  获取数据
   */
  getData(refresh) {
    let page = refresh ? 1 : this.page + 1;
    if (this.loading) return;
    this.loading = true;

    request(URLDefines.pendingpaymentList, {
      params: {
        page: page,
        pageSize: this.pageSize,
        storeId: this.storeId,
        category: this.category
      },
      autoDealError: () => {
        this.loading = false
      },
      complete: ({ inData }) => {
        this.loading = false;
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
  }

})