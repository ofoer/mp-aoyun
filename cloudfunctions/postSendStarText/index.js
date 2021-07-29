// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { t, userInfo } = event
  const re = await db.collection('dj_star_txt').where({openid: userInfo.openId}).count()
  if(re.total >= 3){
    return {msg: "最多喝彩三条！"}
  }
  const res = await db.collection('dj_star_txt').add({data:{t,openid: userInfo.openId}})
  return {
    event,
    re:re,
    item: res,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}