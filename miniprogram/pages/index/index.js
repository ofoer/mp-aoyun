import { loadGoldMedal, loadStars, loadActionStars } from '../../api/index'
import { getKV } from "../../utils/util"

Page({
  data: {
    isFetching:false,
    err: null,
    userStarTotal: 5,
    stars: {},
    items: []
  },
  onLoad(){
    wx.startPullDownRefresh()
    this.fetchItems()
    this.fetchStarItems()
  },
  onPullDownRefresh: function () {
    this.fetchItems()
  },
  handleStar(e){
    const { userStarTotal } = this.data
    const {star} = e.currentTarget.dataset
    if(star.isStar){
      wx.showToast({title: '您已经喝彩过啦！',icon: "none"})
      return
    }
    if(userStarTotal <= 2){
      wx.showToast({
        title: '今日喝彩次数用完啦，点击下方分享和朋友一起喝彩吧！',icon: "none"})
      return
    }
    
    const { _id } = star
    this.fetchActionStar(_id, star)
  },
  fetchItems(){
    this.setData({isFetching: true})
    loadGoldMedal((err, items)=>{
      wx.stopPullDownRefresh()
      if(err){
        this.setData({err: err, isFetching: false})
        return
      }
      this.setData({items: items, isFetching: false})
    })
  },
  fetchStarItems(){
    loadStars((err, items)=>{
      // wx.stopPullDownRefresh()
      if(err){
        // this.setData({err: err, isFetching: false})
        return
      }
      this.setData({stars: getKV("nocId",items)})
    })
  },
  fetchActionStar(id, item){
    this.handleActionStarChangeData(item)
    loadActionStars({id: id},(err, items)=>{
      if(err){
        return
      }
      this.setData({stars: getKV("nocId",items)})
    })
  },
  handleActionStarChangeData(item){
    const { userStarTotal, stars } = this.data
    const a = {...stars, [item.nocId]: {...stars[item.nocId], isStar: true}}
    this.setData({
      userStarTotal: userStarTotal - 1,
      stars: a
    })
    wx.showToast({title: '喝彩成功',icon: "none"})
  },
  onShareAppMessage(){
    return {
      title: "2020东京奥运会奖牌榜"
    }
  },
  onShareTimeline(){
    return {
      title: "2020东京奥运会奖牌榜"
    }
  }
})
