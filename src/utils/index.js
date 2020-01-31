import moment from 'moment'

export const isFunc = v => typeof v === 'function'
export const assert = (condition, msg) => {
  if (!condition) throw new Error(`[dashboard]${msg}`)
}
export const toThousands = num => {
  let number = (num || 0).toString(),
    result = ''

  while (number.length > 3) {
    result = ',' + number.slice(-3) + result

    number = number.slice(0, number.length - 3)
  }

  if (number) {
    result = number + result
  }
  return result
}

export const timingFun = (
  func = () => {},
  interval = 1,
  defaultCall = true
) => {
  assert(isFunc(func), `${func} is not function`)
  const m = interval * 60 * 1000
  if (defaultCall) func()
  const time = window.setInterval(() => {
    func()
    console.log(func + 'is call')
  }, m)
}

export const isChinese = str => {
  if (escape(str).indexOf('%u') < 0) return false
  return true
}

export const emoj2str = str => {
  return unescape(escape(str).replace(/\%uD.{3}/g, ''))
}

export const handleText = str => {
  let res = emoj2str(str)
  if (isChinese(res)) {
    res = res.length > 4 ? res.slice(0, 6) + '...' : res
  } else {
    res = res.length > 7 ? res.slice(0, 7) + '...' : res
  }
  return res
}

//echarts 获取相对字号
export const getFontSize = () => {
  const screenWidth = document.documentElement.offsetWidth
  return (screenWidth * 12) / 1920
}

//获取最近14天日期
export const getDate = (date = new Date(), count = 14) => {
  let now = moment(date)
  let res = []
  let len = count
  while (len--) {
    res.unshift(now.format('MM-DD'))
    now = now.add(-1, 'day')
  }
  return res
}

// 设置Token
export const setStorage = (key, value) => {
  return localStorage.setItem(key, value)
}
// 获取Token
export const getStorage = key => {
  if (!key || key !== 'undefined') {
    return localStorage.getItem(key)
  }
}
export const removeStorage = key => {
  return localStorage.removeItem(key)
}

export const getQueryString = (name, url) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const query = url.substr(1).match(reg)
  if (query != null) return unescape(query[2])
  return null
}

export const formatDate = sortedDateList => {
  var arr = []
  sortedDateList.forEach(function(item, i) {
    var tmpDate = new Date(item.createTime)
    var day = tmpDate.getDate()
    var month = tmpDate.getMonth() + 1
    var year = tmpDate.getFullYear()

    // 首先取第一个时间戳（也是最小的时间戳）
    if (i === 0) {
      var tmpObj = {}
      tmpObj.date = year + '-' + month + '-' + day // 时间戳对应的日期
      tmpObj.dataList = [] // 存储相同时间戳日期的数组
      tmpObj.dataList.push(item)
      arr.push(tmpObj)
    } else {
      // 判断两个时间戳对应的日期是否相等，相等就加进去，不相等就另开辟新的时间戳日期
      if (arr[arr.length - 1].date === year + '-' + month + '-' + day) {
        arr[arr.length - 1].dataList.push(item)
      } else {
        var tmpObj = {}
        tmpObj.date = year + '-' + month + '-' + day
        tmpObj.dataList = []
        tmpObj.dataList.push(item)
        arr.push(tmpObj)
      }
    }
  })
  return arr
}
