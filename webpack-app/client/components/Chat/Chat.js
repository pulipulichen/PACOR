let Chat = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      displayMessages: [],
      lastDisplayMessagesLength: 0,
      //writingMessage: 'test: ' + location.href,
      writingMessage: '',
      lastUpdateTimestamp: null,
      stopSync: false,
      syncIntervalMS: 5000,
    }
  },
  computed: {
    
  },
  watch: {
    'displayMessages': function () {
      if (this.displayMessages.length > this.lastDisplayMessagesLength) {
        this.lastDisplayMessagesLength = this.displayMessages.length
        let list = this.$refs.ChatList
        setTimeout(() => {
          list.scrollTop = list.scrollHeight
        }, 100)
      }
    }
  },
  mounted: function () {
    this.initDisplayMessages()
  },
  destroyed: function () {
    this.stopSync = true
  },
  methods: {
    initDisplayMessages: async function () {
      let messages = await this.lib.AxiosHelper.get(`/client/message/list`)
      if (Array.isArray(messages) === false) {
        return false
      }
      this.displayMessages = messages
      this.lastUpdateTimestamp = this.getTime()
      
      setTimeout(() => {
        this.syncDisplayMessages()
      }, this.syncIntervalMS)
    },
    syncDisplayMessages: async function () {
      if (this.stopSync === true) {
        return false
      }
      
      let messages = await this.lib.AxiosHelper.get(`/client/message/sync-list`, {
        lastUpdateTimestamp: this.lastUpdateTimestamp
      }, (error) => {
        console.error('Sync messages fail.')
      })
      
      if (Array.isArray(messages) === false) {
        //console.error('Sync messages fail.')
        return false
      }
      
      this.displayMessages = this.displayMessages.concat(messages)
      this.lastUpdateTimestamp = this.getTime()
      
      setTimeout(() => {
        this.syncDisplayMessages()
      }, this.syncIntervalMS)
    },
    getTime () {
      return (new Date()).getTime()
    },
    insert: async function () {
      let result = await this.lib.AxiosHelper.post(`/client/message/insert`, {
        message: this.writingMessage
      })
      
      this.displayMessages.push({
        user: {
          username: this.status.username,
        },
        message: this.writingMessage,
        timestamp: result
      })
      
      this.writingMessage = ''
    },
    logout: async function () {
      await this.lib.AxiosHelper.get(`/client/user/logout`)
      this.status.username = false
      //this.$router.replace('/login')
      this.view = 'Login'
    },
    displayAge: function (timestamp) {
      return this.lib.DayJSHelper.fromNow(timestamp)
    },
    openAdmin: function () {
      let origin = location.href
      if (origin.indexOf('#') > 0) {
        origin = origin.slice(0, origin.indexOf('#'))
      }
      let adminURL = `${this.config.baseURL}/admin#/?origin=${origin}`
      window.open(adminURL, 'admin')
    },
    uploadTrigger: function () {
      this.$refs.UploadInput.click()
    },
    upload: async function () {
      let result = await this.lib.AxiosHelper.upload('/client/message/upload', {
        message_picture: this.$refs.UploadInput
      })
      
      let imageURL = result.url
      let message = `<a href="${imageURL}" target="_blank"><img src="${imageURL}" /></a>`
      
      this.displayMessages.push({
        user: {
          username: this.status.username,
        },
        message: message,
        timestamp: result.timestamp
      })
      
      this.$refs.UploadInput.value = ''
    }
  } // methods
}

export default Chat