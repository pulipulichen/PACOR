import $ from 'jquery'
import axios from 'axios'
axios.defaults.withCredentials = true

let AxiosHelper = {
  baseURL: '',
  errorHandler: null,
  setBaseURL: function (baseURL) {
    if (baseURL.endsWith('/') === true) {
      baseURL = baseURL.slice(0, -1)
    }
    this.baseURL = baseURL
    return this
  },
  setErrorHandler: function (handler) {
    this.errorHandler = handler
  },
  handleError: function (error) {
    //console.error(error.response)
    if (typeof(this.errorHandler) === 'function') {
      this.errorHandler(error)
    }
  },
  getURL: function (path) {
    if (path.startsWith('/') === false) {
      path = '/' + path
    }
    return this.baseURL + path
  },
  get: async function (path, data, errorHandler) {
    path = this.getURL(path)
    let result = await this.getOther(path, data, errorHandler)
    return result
  },
  getOther: async function (path, data, errorHandler) {
    if (typeof(data) === 'string') {
      data = JSON.parse(data)
    }
    
    let options = {}
    if (typeof(data) === 'object') {
      options.params = data
    }
    
    try {
      let result = await axios.get(path, options)
      if (result === undefined) {
        throw new Error('No response: ' + path + `(${JSON.stringify(options)})`)
      }
      
      return result.data
    }
    catch (error) {
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return undefined
    }
  },
  post: async function (path, data, errorHandler) {
    if (typeof(data) === 'string') {
      data = JSON.parse(data)
    }
    
    let options = {}
    if (typeof(data) === 'object') {
      options = data
    }
    
    try {
      let result = await axios.post(this.getURL(path), options)
      return result.data
    }
    catch (error) {
      //console.log(error)
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return undefined
    }
  },
  /**
   * let result = await this.lib.AxiosHelper.upload('/client/File/upload', {
        file: this.$refs.UploadInput
      })
   * @param {string} path
   * @param {object} data
   * @param {function} errorHandler
   * @returns {String|.axios@call;post.data|undefined}
   */
  upload: async function (path, data, errorHandler) {
    if (typeof(data) !== 'object') {
      this.handleError('no data')
      return ''
    }
    
    //console.log(data)
    
    let formData = new FormData()
    for (let name in data) {
      let value = data[name]
      if (typeof(value.files) === 'object') {
        value = value.files[0]
      }
      formData.append(name, value)
    }
    
    //console.log(formData)
    
    try {
      let result = await axios.post(this.getURL(path), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return result.data
    }
    catch (error) {
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return undefined
    }
  },
  postNewWindow: async function (path, data) {
    path = this.getURL(path)
    
    // 建立一個form
    let form = document.createElement("form")
    let element1 = document.createElement("input")
    let element2 = document.createElement("input")

    form.method = "POST"
    form.action = path
    form.target = '_blank'
            
    Object.keys(data).forEach((key) => {
      let value = data[key]
      if (value === undefined || value === null) {
        return false
      }
      
      let element = document.createElement("input")
      element.name = key
      
      if (value && typeof(value) === 'object') {
        value = JSON.stringify(value)
      }
      element.value = value
      form.appendChild(element)
    })

    document.body.appendChild(form)
    form.submit()
    setTimeout(() => {
      $(form).remove()
    })
  }
}

export default AxiosHelper