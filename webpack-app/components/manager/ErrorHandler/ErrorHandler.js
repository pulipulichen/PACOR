let ErrorHandler = {
  props: ['config', 'errors', 'lib'],
  data() {    
    this.$i18n.locale = this.config.locale
    //console.log(this.config)
    return {
      showError: false,
      showServerErrorStack: false,
      showErrorStack: false
    }
  },
  computed: {
    error () {
      if (Array.isArray(this.errors)
              && this.errors.length > 0) {
        console.error(this.errors[0])
        return this.errors[0]
      }
    },
    responseErrorMessage: function () {
      if (typeof(this.error) === 'object'
              && typeof(this.error.response) === 'object'
              && typeof(this.error.response.data) === 'object'
              && typeof(this.error.response.data.error) === 'object') {
        
        let output = ''
        let e = this.error.response.data.error
        
        if (typeof(e.status) === 'number') {
          output = output + `[${e.status}]`
        }
        
        if (typeof(e.message) === 'string') {
          if (output !== '') {
            output = ' '
          }
          output = output + '' + e.message.trim()
        }
        
        return output
      }
    },
    responseErrorStack: function () {
      if (typeof(this.error) === 'object'
              && typeof(this.error.response) === 'object'
              && typeof(this.error.response.data) === 'object'
              && typeof(this.error.response.data.error) === 'object') {
        
        let output = ''
        let e = this.error.response.data.error
        
        if (Array.isArray(e.frames)) {
          if (output !== '') {
            output = output + '\n'
          }
          
          output = output + e.frames.map((f) => {
            return `at ${f.method} (${f.file} :${f.line} :${f.column})`
          }).join('\n')
        }
        
        return output
      }
    },
    localErrorMessage: function () {
      if (typeof(this.error) === 'object'
              && typeof(this.error.message) === 'string') {
        return this.error.message
      }
    },
    localErrorStack: function () {
      if (typeof(this.error) === 'object'
              && typeof(this.error.stack) === 'string') {
        let stack = this.error.stack
        if (stack.trim().startsWith('found in') && stack.indexOf('--->') > 0) {
          return stack.slice(stack.indexOf('--->') + 4).trim()
        }
        else {
          return stack.split('\n').slice(1).map(line => line.trim()).join('\n')
        }
      }
    },
    displayErrorData: function () {
      let data
      if (typeof(this.error) === 'object'
              && typeof(this.error.config) === 'object'
              && typeof(this.error.config.data) !== 'undefined') {
        data = this.error.config.data  
      }
      else if (typeof(this.error) === 'object'
              && typeof(this.error.config) === 'object'
              && typeof(this.error.config.params) !== 'undefined') {
        data = this.error.config.params
      }
      
      if (data === undefined) {
        return undefined
      }
      
      if (typeof(data) === 'string') {
        try {
          data = JSON.parse(data)
        }
        catch (e) {}
      }

      if (typeof(data) === 'object') {
        data = JSON.stringify(data, null, ' ').slice(2, -2)
      }

      return data
    }
  },
  watch: {
    'error': function () {
      //console.log(typeof(this.error), this.error)
      //console.log(JSON.stringify(this.error.config, null, '\t'))
      if (typeof(this.error) === 'object' 
              || (typeof(this.error) === 'string' && this.error.trim() !== '') ) {
        this.showError = true
        this.showServerErrorStack = false
        this.showErrorStack = false
        
        /*
        console.log(typeof(window.PACORTestManagerError))
        console.log(typeof(window.PACORTestManagerIndex))
        
        if (typeof(window.PACORTestManagerError) === 'function') {
          let message = this.responseErrorMessage
          if (!message) {
            message = this.localErrorMessage
          }
//          console.log('有嗎？', message)
//          console.log(message)
//          console.log(typeof(message))
          window.PACORTestManagerError(message)
//          throw new Error(this.error)
        }
        */
        if (window.PACORTestManager) {
          let message = this.responseErrorMessage
          if (!message) {
            message = this.localErrorMessage
          }
          window.PACORTestManager.error(message)
        }
      }
    },
  },
  methods: {
    addError (error) {
      //console.log('setErrorHandler', error)
      if (error 
              && error.response
              && error.response.data
              && error.response.data.error) {
        let message = error.response.data.error.message
        if (message === 'Please login') {
          this.lib.auth.logoutAndReload()
          return null
        }
        else if (message === 'Network Error') {
          return null
        }
      }
      this.errors.push(error)
    },
    close () {
      if (Array.isArray(this.errors) === true) {
        if (this.errors.length > 0) {
          this.errors.shift()
        }
        else {
          this.showError = false
        }
      }
    },
    async retry (e) {
      if (typeof(this.error) !== 'object' 
              || typeof(this.error.config) !== 'object' 
              || typeof(this.error.config.url) !== 'string'
              || typeof(this.error.config.method) !== 'string') {
        return false
      }
      this.showError = false
      
      let data = this.error.config.params
      if (typeof(data) === 'undefined') {
        data = this.error.config.data
      }
      await this.lib.AxiosHelper[this.error.config.method](this.error.config.url, data)
    }
  } // methods
}

export default ErrorHandler