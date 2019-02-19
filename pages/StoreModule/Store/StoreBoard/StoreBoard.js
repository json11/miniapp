// pages/StoreModule/Store/StoreBoard/StoreBoard.js
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
    curCategory: 'ALL',
    categorys: [{ name: "全部", type: "ALL" }, { name: "高速", type: "HIGH" }, { name: "低速", type: "LOW" }],
    total: {}, // 全部
    high: {},  // 高速
    low: {}    // 低速
  },

  ready() {
    this.getData();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCategoryTap(event) {
      let category = event.currentTarget.dataset.category;
      this.setData({
        curCategory: category
      })
    },
    /**
     *  获取数据
     */
    getData(toggle) {

      request(URLDefines.kanban, {
            params: {
                storeId: this.data.storeId
            },
            autoDealError: true,
            complete: ({inData}) => {


                this.setData({
                    total: inData.total,
                    high: inData.high,
                    low: inData.low
                })
            }
        });
    },
  }
})



