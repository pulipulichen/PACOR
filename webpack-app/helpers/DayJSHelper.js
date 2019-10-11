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
  }
}

export default DayJSHelper