// pages/WaitTaskModule/Merchant/IntendedAlter/AddressPicker/AddressPicker.js

const app = getApp()

Component({
  maskAnimation: null,
  animation: null,
  maskAnimation: null,
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否展示
    show: {
      value: false,
      type: Boolean,
      observer: 'showChange'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    maskAnimationData: {},
    animationData: {},
    provinceData: [],
    cityData: [],
    areaData: [],
    province: {},
    city: {},
    area: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击省
     */
    onClickProvince: function (evt) {
      let item = evt.currentTarget.dataset.item
      this.setData({
        province: item
      })
      this.getData(item.addressId, 'CITY', (list)=>{
        this.setData({
          cityData: list,
        })
      })
    },
    /**
     * 点击市
     */
    onClickCity: function (evt) {
      let item = evt.currentTarget.dataset.item
      this.setData({
        city: item
      })
      this.getData(item.addressId, 'AREA', (list) => {
        this.setData({
          areaData: list,
        })
      })
    },
    /**
     * 点击区
     */
    onClickArea: function (evt) {
      let item = evt.currentTarget.dataset.item
      this.setData({
        area: item
      }, ()=>{
        let province = Object.assign({}, this.data.province)
        province.addressId = province.addressId + ''
        let city = Object.assign({}, this.data.city)
        city.addressId = city.addressId + ''
        let area = Object.assign({}, this.data.area)
        area.addressId = area.addressId + ''
        this.triggerEvent('choose', { province: province, city: city, area: area})
        this.hideModal()
      })
    },
    /**
     * 获取地址列表
     * enum CCityPickerRequestType: String {
      case PROVICE = "PROVINCE"
    case CITY = "CITY"
    case AREA = "AREA"
    }
     */
    getData: function (addressId, type, callBack) {
      let url = app.urlInfo.channelUrl + 'common/address'
      let options = {
        path: url,
        params: {
          addressId: addressId,
          type: type
        },
        header: {

        },
        complete: ({ error, inData })=>{
          if (inData && inData.resultList) {
            callBack(inData.resultList)
          } else {
            app.makeHint('获取失败')
          }
        }
      }
      app.request(options)
    },
    /**
     * 是否展示属性值更改
     */
    showChange: function (show) {
      if (show) {
        this.showModal()
      }
    },
    /**
     * 弹出
     */
    showModal: function (e) {
      var that = this
      // 遮罩的动画
      var maskAnimation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-in'
      })
      maskAnimation.opacity(0.65).step()
      this.maskAnimation = maskAnimation

      // 弹出框的动画
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-in-out'
      })
      that.animation = animation
      animation.bottom(0).step()

      // 更新
      this.setData({
        maskAnimationData: maskAnimation.export(),
        animationData: animation.export(),
        provinceData: [],
        cityData: [],
        areaData: [],
        province: {},
        area: {},
        city: {}
      })
      this.getData(null, 'PROVINCE', (list) => {
        this.setData({
          provinceData: list,
        })
      })
    },
    /**
     * 隐藏弹框
     */
    hideModal: function (e) {

      var that = this;

      // 遮罩的动画
      var maskAnimation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-in'
      })
      maskAnimation.opacity(0).step()
      this.maskAnimation = maskAnimation

      // 弹框动画
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-in-out'
      })
      that.animation = animation
      animation.bottom('-600rpx').step()

      // 更新
      that.setData({
        maskAnimationData: maskAnimation.export(),
        animationData: animation.export()
      })

      // 回调取消
      var timer = setTimeout(function () {
        clearTimeout(timer)
        that.triggerEvent("cancel")
      }, 200)
    },
    /**
     * 拦截滑动事件，防止向下传递
     */
    onMove: function () {

    },
  }
})
