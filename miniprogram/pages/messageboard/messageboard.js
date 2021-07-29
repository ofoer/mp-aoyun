// miniprogram/pages/messageboard/messageboard.js
import { postSendStarText, loadMessages } from '../../api/index'
Page({

  data: {
    InputBottom: 0,
    t: '',
    isFetching:false,
    err: null,
    items: []
  },
  onLoad(){
    wx.startPullDownRefresh()
  },
  onPullDownRefresh: function () {
    this.fetchItems()
  },
  fetchItems(){
    this.setData({isFetching: true})
    loadMessages((err, items)=>{
      wx.stopPullDownRefresh()
      if(err){
        this.setData({err: err, isFetching: false})
        return
      }
      this.setData({items: items.reverse(), isFetching: false})
    })
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  bindKeyInput(e){
    this.setData({t: e.detail.value})
  },
  handleSendStarText(){
    const { t } = this.data
    const a = t.trim()
    if(!a){
      wx.showToast({title: '请输入喝彩内容',icon: "none"})
      return
    }
    this.fetchSendStarText(a)
  },
  fetchSendStarText(t){
    postSendStarText({t: t},(err, items)=>{
      if(err){
        wx.showToast({
          title: String(err),icon: 'none'
        })
        return
      }
      wx.showToast({title: '留言喝彩成功',icon: 'none'})
      this.setData({t:''})
      this.fetchItems()
    })
  }
})