export const loadGoldMedal = (callback) =>{
  wx.request({
    url: 'https://app.sports.qq.com/tokyoOly/medalsList',
    success(res){
      if(res.data.data.data.total){
        callback(null, res.data.data.data.total)
        return
      }
      callback("数据加载失败,请重试")
    },
    fail(){
      callback("数据加载失败,请重试")
    }
  })
}

export const loadGoldMedalByChina = (callback) =>{
  wx.request({
    url: 'https://ugclandpage.pae.baidu.com/api/asyncfullcolumn?srcid=50522&full_column_event=tokyo_olympic_2021&query=%E4%B8%AD%E5%9B%BD%E9%87%91%E7%89%8C',
    success(res){
      if(res.data.data.dataList){
        callback(null, res.data.data.dataList)
        return
      }
      callback("数据加载失败,请重试")
    },
    fail(){
      callback("数据加载失败,请重试")
    }
  })
}

export default loadGoldMedal