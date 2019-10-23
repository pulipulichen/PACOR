import styleConfig from './styles/style.config.js'
import readingConfig from './../config/reading.js'

export default {
  debug: {
    ErrorHandler: {
      verbose: true
    }
  },
  
  locale: 'zh-TW',
  clientConfigName: 'CONFIG',
  
  style: styleConfig,
  reading: readingConfig
}
