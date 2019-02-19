// pages/StoreModule/OrderDetail/OrderDetail.js
import {request, URLDefines} from "../client";
import {formatTimeTimeStamp } from '../../../utils/util.js';
import { getOrderStatusDesc, getLogisticsStatus, getOrderCategoryDesc} from '../../../utils/ordertool.js';

Page({
  orderNo: '', // 订单号
  /**
   * 页面的初始数据
   */
  data: {
    detail: {}  // 详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.orderNo = options.orderNo;
    this.getData();
  },

  /**
   *  
   */
  getConfigInfo(data) {
    let _configInfo = '';
    let configInfo = JSON.parse(data);

    configInfo &&
      configInfo.map((item, index) => {
        if (index === configInfo.length - 1) {
          _configInfo = _configInfo + item.secondParts.secondPartsName;
        } else {
          _configInfo = _configInfo + item.secondParts.secondPartsName + ';';
        }
      });

    return _configInfo;
  },

  /** 
   *  处理数据
   */
  processData(data) {
    let res = Object.assign({}, data);
    res.createTimeDesc = data.createTime ? formatTimeTimeStamp(data.createTime) : '';
    res.orderCategoryDesc = getOrderCategoryDesc(data.category);
    res.yellowHorseOrderStatusDesc = getOrderStatusDesc(data.yellowHorseOrderStatus);
    res.yellowHorseLogisticsStatusDesc = getLogisticsStatus(data.yellowHorseLogisticsStatus);
    
    let commodities = res.commodities || [];
    for (let commoditie of commodities) {
      commoditie.skuInfo = this.getConfigInfo(commoditie.skuInfo)
    }
    console.log('结果', res);
    this.setData({
      detail: res
    })
  },

  /**
   *  获取数据
   */
  getData() {

      request(URLDefines.orderdetail, {
          params: {
              orderNo: this.orderNo
          },
          autoDealError: true,
          complete: ({inData}) => {

              let data = inData || {};
              this.processData(data);
          }
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})