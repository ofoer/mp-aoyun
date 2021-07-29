// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { id } = event
  const res = await db.collection('dj_star').doc(id).update({
    data: {
      star: _.inc(1)
    },
  })

  return {
    event
  }
}