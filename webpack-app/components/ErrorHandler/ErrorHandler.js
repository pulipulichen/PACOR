let ErrorHandler = {
  props: ['config', 'error', 'lib'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      showError: false,
      showServerErrorStack: false,
      showErrorStack: false
    }
  },
  computed: {
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
      if (typeof(this.error) === 'object'
              && typeof(this.error.config) === 'object'
              && typeof(this.error.config.data) !== 'undefined') {
        let data = this.error.config.data
        try {
          data = JSON.parse(data)
        }
        catch (e) {} 
        return data
      }
    }
  },
  watch: {
    'error': function () {
      //console.log(typeof(this.error), this.error)
      console.log(JSON.stringify(this.error.config, null, '\t'))
      if (typeof(this.error) === 'object' 
              || (typeof(this.error) === 'string' && this.error.trim() !== '') ) {
        this.showError = true
        this.showServerErrorStack = false
        this.showErrorStack = false
      }
    },
  },
  methods: {
    close () {
      this.showError = false
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
      console.log(data)
      console.log(typeof(data))
      if (typeof(data) === 'undefined') {
        data = this.error.config.data
      }
      console.log(data)
      console.log(typeof(data))
      let result = await this.lib.AxiosHelper[this.error.config.method](this.error.config.url, data)
      //let url = 
    }
  } // methods
}

export default ErrorHandler