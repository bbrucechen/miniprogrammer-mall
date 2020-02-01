// components/w-tab-control/w-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:Array,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e) {
      this.setData({
        currentIndex:e.currentTarget.dataset.index
      })
      const index = this.data.currentIndex
      this.triggerEvent('tabClick',{currentIndex:index})
    }
  }
})
