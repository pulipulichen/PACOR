import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//import 'dayjs/locale/zh-tw' // load on demand
dayjs.extend(relativeTime)

// preload locales
require(`dayjs/locale/zh-tw`).default

let DayJSHelper = {
  setLocale: function (dayjsLocale) {
    if (typeof(dayjsLocale) !== 'string') {
      return this
    }
    
    dayjsLocale = dayjsLocale.toLowerCase()
    
    try {
      //require(`dayjs/locale/${dayjsLocale}`).default // load on demand
      dayjs.locale(dayjsLocale)
    }
    catch (e) {
      console.error(`dayjs locale is error: ${dayjsLocale}`)
    }
    return this
  },
  fromNow: function (timestamp) {
    return dayjs(timestamp).fromNow()
  },
  shortTime: function (timestamp) {
    let intervalTimestamp = (new Date()).getTime() - timestamp
    
    if (intervalTimestamp < 10800000) {
      // 如果是在距離現在三小時內，那就顯示 n分鐘前
      return dayjs(timestamp).fromNow()
    }
    else if (intervalTimestamp < 86400000) {
      // 如果是距離現在1天內，那就顯示 hh:mm
      return dayjs(timestamp).format('HH:mm')
    }
    else if (intervalTimestamp < 31536000000) {
      // 如果距離現在1年內，那就顯示 mm/dd
      return dayjs(timestamp).format('MM-DD')
    }
    else {
      // 如果超過1年，那就顯示2019年
      return dayjs(timestamp).format('YYYY')
    }
  },
  from: function (baseTimestamp, toTimestamp) {
    return dayjs(baseTimestamp).from(dayjs(toTimestamp))
  },
  to: function (baseTimestamp, toTimestamp) {
    return dayjs(baseTimestamp).to(dayjs(toTimestamp))
  }
}

export default DayJSHelper