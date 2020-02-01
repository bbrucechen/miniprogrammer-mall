// pages/home/home.js
// http://123.207.32.32:8000/api/hy/home/multidata
import {getMultiData} from '../../network/home.js'
import {getGoodsData} from '../../network/home.js'

const TOP_DISTANCE = 1000
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommends:[],
    currentIndex:0,
    goods:{
      'pop':{
        page:0,
        list:[]
      },
      'new': {
        page: 0,
        list: []
      },
      'sell': {
        page: 0,
        list: []
      }
    },
    goodsType:['pop','new','sell'],
    isShow:false,
    isTabFixed:false,
    tabScrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.请求轮播图以及推荐数据
    this._getMultiData()

    // 2.请求商品数据
    this._getGoodsData('pop')
    // this._getGoodsData('new')
    // this._getGoodsData('sell')
  },
    // ------网络请求函数------
  _getGoodsData(type) {
    // 获取页码
    const page = this.data.goods[type].page + 1
    // 取出数据
    getGoodsData(type,page).then(res => {
      // 提取原来的数据
      const list = res.data.data.list
      // 提取旧数据
      const oldList = this.data.goods[type].list
      // 进行数据合并
      oldList.push(...list)
      // 通过字符串属性名可以对某个数据直接进行修改
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]:oldList,
        [pageKey]:page
      })
    })
  },
  _getMultiData() {
    getMultiData().then((res) => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    })
  },
  // -------end----------
  tabClick(obj) {
    const currentIndex = obj.detail.currentIndex
    this.setData({
      currentIndex
    })
    this._getGoodsData(this.data.goodsType[this.data.currentIndex])
  },
  onReachBottom() {
    this._getGoodsData(this.data.goodsType[this.data.currentIndex])
  },
  onPageScroll(options) {
    const scrollTop = options.scrollTop
    // 防抖
    let flag = scrollTop >= TOP_DISTANCE
    if(flag != this.data.isShow) {
      this.setData({
        isShow:flag
      })
    }

    // 修改istabfixed属性
    const flag2 = scrollTop >= this.data.tabScrollTop
    if(flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed:flag2
      })
    }
  },
  imageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  }
})