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

export const loadStars = (callback) =>{
  wx.cloud.callFunction({name: 'loadStars'})
  .then((resp) => {
    const { items } = resp.result
    if(items){
      callback(null, items)
      return
    }
    callback("数据加载失败,请重试")
  }).catch(() => {
    callback("数据加载失败,请重试")
  })
}

export const loadActionStars = (params, callback) =>{
  wx.cloud.callFunction({name: 'loadActionStars', data: params})
  .then((resp) => {
    const { items } = resp.result
    if(items){
      callback(null, items)
      return
    }
    callback("数据加载失败,请重试")
  }).catch(() => {
    callback("数据加载失败,请重试")
  })
}

export const postSendStarText = (params, callback) =>{
  wx.cloud.callFunction({name: 'postSendStarText', data: params})
  .then((resp) => {
    const { item, msg } = resp.result
    if(item){
      callback(null, item)
      return
    }
    if(msg){
      callback(msg)
      return 
    }
    callback("留言失败")
  }).catch(() => {
    callback("留言失败")
  })
}
export const loadMessages = (callback) =>{
  wx.cloud.callFunction({name: 'loadStarTxt', data: {}})
  .then((resp) => {
    const { items } = resp.result
    if(items){
      callback(null, items)
      return
    }
    callback("数据加载失败,请重试")
  }).catch(() => {
    callback("数据加载失败,请重试")
  })
}

export default loadGoldMedal