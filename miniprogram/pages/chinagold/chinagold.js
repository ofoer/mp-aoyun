// pages/chinagold/chinagold.js
import { loadGoldMedalByChina } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFetching:false,
    err: null,
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.startPullDownRefresh()
    this.fetchItems()
  },
  onPullDownRefresh: function () {
    this.fetchItems()
  },
  fetchItems(){
    this.setData({isFetching: true})
    loadGoldMedalByChina((err, items)=>{
      wx.stopPullDownRefresh()
      if(err){
        this.setData({err: err, isFetching: false})
        return
      }
      this.setData({items: items, isFetching: false})
    })
  },
  onShareAppMessage(){
    return {
      title: "中国金牌得主-2020东京奥运会"
    }
  },
  onShareTimeline(){
    return {
      title: "中国金牌得主-2020东京奥运会"
    }
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})