// pages/StoreModule/Store/Cooperate/Cooperate.js
import {request, URLDefines} from "../../client";

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
    showCategory: '',
    curCategory: '',
    categorys: [{ name: "高速", type: "HIGH" }, { name: "低速", type: "LOWER" }],
    highCategory: [], // 高速
    lowerCategory: [] // 低速
  },

  ready() {
    this.getData();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData() {

      request(URLDefines.carModelList, {
          params: {
              storeId: this.data.storeId
          },
          autoDealError: true,
          complete: ({inData}) => {


              this.setData({
                  showCategory: inData.showCategory,
                  curCategory: inData.showCategory === 'LOWER' ? 'LOWER' : 'HIGH',
                  highCategory: inData.highCategory || [],
                  lowerCategory: inData.lowerCategory || []
              })
          }
      });
    },
    onCategoryTap(event) {
      let category = event.currentTarget.dataset.category;
      this.setData({
        curCategory: category
      })
    },
  }
})
