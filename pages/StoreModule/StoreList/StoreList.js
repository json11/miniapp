// pages/StoreModule/StoreList/StoreList.js

import { request, URLDefines } from '../client.js';

import { getShareInfo } from '../../../utils/share.js'

Page({

  page: 1,

  pageSize: 10,

  loading: false,

  completed: false, 

  searchText: null,

  /**
   * 页面的初始数据
   */
  data: {
    empty: false,
    storeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if(!this.completed) {
      this.getData(false);
    }
  },

  /**
   *  搜索回调
   */
  onSearch(res) {
    this.searchText = res.detail.value;
    this.getData(true);
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
   *  获取数据
   */
  getData(refresh) {
    if(this.loading) return;
    this.loading= true;
    let page = refresh ? 1 : (this.page + 1);

    request(URLDefines.storeList, {
        params: {
            page: page,
            pageSize: this.pageSize,
            searchText: this.searchText
        },
        autoDealError: () => {
          this.loading = false

        },
        complete: ({inData}) => {
          this.loading = false;
          this.page = page;

          let data = inData || [];
          let resultData = refresh ? data : this.data.storeList.concat(data)
          this.completed = data.length < this.pageSize;
          this.setData({
            storeList: resultData,
            empty: !resultData.length
          })
        }
    });
  },
  onShareAppMessage: function () {
    return getShareInfo('storeList')
  }
})