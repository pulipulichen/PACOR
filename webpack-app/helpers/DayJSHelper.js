import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//import 'dayjs/locale/zh-tw' // load on demand
dayjs.extend(relativeTime)

// preload locales
//require(`dayjs/locale/zh-tw`).default
//import 'dayjs/locale/zh-tw'
import zhTWConf from 'dayjs/locale/zh-tw';
dayjs.locale(zhTWConf)

let DayJSHelper = {
  $t: null,
  setI18N: function ($t) {
    this.$t = $t
  },
  time: function () {
    return (new Date()).getTime()
  },
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
    if (timestamp === null 
            || isNaN(timestamp) === true) {
      return ''
    }
    else if (typeof(timestamp) === 'string') {
      timestamp = parseInt(timestamp, 10)
    }
    return dayjs(timestamp).fromNow()
  },
  toNow: function (timestamp) {
    if (timestamp === null 
            || isNaN(timestamp) === true) {
      return ''
    }
    else if (typeof(timestamp) === 'string') {
      timestamp = parseInt(timestamp, 10)
    }
    return dayjs(timestamp).toNow()
  },
  _prefixZero: function (n) {
    if (n < 10) {
      return '0' + n
    }
    else {
      return n
    }
  },
  shortTime: function (millisecond) {
    //let intervalTimestamp = (new Date()).getTime() - timestamp
    
    let year = 0
    let month = 0
    let day = 0
    let hour = 0
    let minute = 0
    
    if (millisecond < 60000) {
      // 如果是在距離現在12小時內，那就顯示 n分鐘前
      return this.$t('in a minute')
    }
    else if (millisecond < 86400000) {
      // 如果是距離現在1天內，那就顯示 hh:mm
      hour = Math.floor(millisecond / 3600000)
      minute = Math.floor((millisecond % 3600000) / 60000)
      return this._prefixZero(hour) + ':' + this._prefixZero(minute)
      
      //return dayjs().millisecond(timestamp).format('HH:mm')
      //return this.$t('in a day')
    }
    else if (millisecond < 2592000000) {
      // 如果距離30天內，那就顯示 in {0} day
      day = Math.ceil(millisecond / 86400000)
      return this.$t('in {0} day', [day])
    }
    else if (millisecond < 31536000000) {
      // 如果距離現在1年內，那就顯示 in {0} month
      //return dayjs().millisecond(millisecond).format('MM-DD')
      month = Math.ceil(millisecond / 2592000000)
      return this.$t('in {0} month', [month])
    }
    else {
      // 如果超過1年，那就顯示 in {0} year
      
      year = Math.ceil(millisecond / 31536000000)
      return this.$t('in {0} year', [year])
    }
  },
  from: function (baseTimestamp, toTimestamp) {
    return dayjs(baseTimestamp).from(dayjs(toTimestamp))
  },
  to: function (baseTimestamp, toTimestamp) {
    return dayjs(baseTimestamp).to(dayjs(toTimestamp))
  },
  format: function (unixMS) {
    return dayjs(unixMS).format('YYYY-MM-DD HH:mm:ss')
  },
  formatMMSS: function (unixMS) {
    return dayjs(unixMS).format('mm:ss')
  },
  formatHHMMSS: function (seconds) {
    if (typeof(seconds) !== 'number') {
      return seconds
    }
    if (seconds < 60) {
      seconds = parseInt(seconds * 100) / 100
      return seconds
    }
    else if (seconds < 3600) {
      let mm = Math.floor(seconds / 60)
      let ss = seconds % 60
      ss = parseInt(ss * 100) / 100
      return this._prefixZero(mm) 
              + ':' 
              + this._prefixZero(ss) 
    }
    else {
      let hh = Math.floor(seconds / 3600)
      let mm = Math.floor((seconds % 3600) / 60)
      let ss = seconds % 60
      ss = parseInt(ss * 100) / 100
      //console.log(hh,mm,ss)
      return this._prefixZero(hh) 
              + ':' 
              + this._prefixZero(mm) 
              + ':' 
              + this._prefixZero(ss) 
    }
  }
}

export default DayJSHelper