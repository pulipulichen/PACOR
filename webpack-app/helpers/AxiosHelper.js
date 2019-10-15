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
  handleError: function (error, b) {
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
    let options = {}
    if (typeof(data) === 'object') {
      options.params = data
    }
    
    try {
      let result = await axios.get(path, options)
      return result.data
    }
    catch (error) {
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return
    }
  },
  post: async function (path, data, errorHandler) {
    let options = {}
    if (typeof(data) === 'object') {
      options = data
    }
    
    try {
      let result = await axios.post(this.getURL(path), options)
      return result.data
    }
    catch (error) {
      if (typeof(errorHandler) !== 'function') {
        this.handleError(error)
      }
      else {
        errorHandler(error)
      }
      return
    }
  },
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
      return
    }
  }
}

export default AxiosHelper