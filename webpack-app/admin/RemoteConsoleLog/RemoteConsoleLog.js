let RemoteConsoleLog = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      logs: [],
      afterTime: null,
      intervalSeconds: 5
    }
  },
//  components: {
//  },
//  computed: {
//  },
//  watch: {
//  },
  mounted() {
    this.load()
    this.status.title = this.$t('Console')
  },
  methods: {
    load: async function () {
      let logs = await this.lib.AxiosHelper.get('/admin/Log/get', {
        afterTime: this.afterTime
      })
      
      //console.log(logs)
      //logs.reverse()
      if (Array.isArray(logs) && logs.length > 0) {
        this.logs = logs.concat(this.logs)
      }
      
      //this.afterTime = (new Date()).getTime()
      this.afterTime = this.lib.DayJSHelper.time()
      
      await this.lib.VueHelper.sleep(this.intervalSeconds * 1000)
      this.load()
    },
    parseURI (url) {
      if (!url) {
        return undefined
      }
      
      if (url.endsWith('/')) {
        url = url.slice(0, -1)
      }
      
      return '...' + url.slice(url.lastIndexOf('/'))
    },
    parseIP (ip) {
      if (!ip) {
        return undefined
      }
      return '..' + ip.slice(ip.lastIndexOf('.'))
    },
//    parseFullDate (unix) {
//      return this.lib.DayJSHelper.format(unix * 1000)
//    },
    parseCompactDate (time) {
      if (!time) {
        return undefined
      }
      // 只有給分鐘跟秒
      // "2020-01-04T12:21:17.000Z"
      
      return time.split(':')
              .slice(1)
              .join(':')
      
//      "2020-01-04T12:21:17.000Z".slice(time.indexOf('T') + 1, time.lastIndexOf('.'))
//              .split(':')
//              .slice(1)
//              .join(':')
      
    },
    logTrClassList (log, i) {
      let classList = [log.type]
      
      if (i < this.logs.length - 1) {
        let nextLog = this.logs[(i + 1)]
        
        //console.log(nextLog.created_at_unixms, log.created_at_unixms)
        if (nextLog.user !== log.user
                || nextLog.referer !== log.referer
                || (log.created_at_unixms - nextLog.created_at_unixms) > 3*60*1000) {
          classList.push('bottom-gap')
        }
      }
      
      return classList.join(' ')
    }
  } // methods
}

export default RemoteConsoleLog