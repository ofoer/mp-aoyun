// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const res = await db.collection('dj_star_txt').limit(30).get()
  return {
    items: res.data
  }
}