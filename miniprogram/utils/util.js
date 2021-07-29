const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const numberFormat = (num) =>{
  return num >= 1e3 && num < 1e4 ? (num / 1e3).toFixed(1) + 'k' : num >= 1e4 ? (num / 1e4).toFixed(1) + 'w' : num
}
const getKV = (kvKey,a) =>{
  let c = {}
  const kv = a.map((item)=>{
    c[item[kvKey]] = {...item, star: numberFormat(item.star)}
    return null
  })
  return c
}
module.exports = {
  getKV,
  formatTime
}
