import MDD from './lib/mobile-device-detect/index.js'

export default function (StyleManager) {
  
  StyleManager.computed.deviceDetect = function () {
    return MDD
  }
  
//  const osMapping = {
//    'MacIntel': 'iOS',
//    'Linux armv8l': 'Android',
//    'Win32': 'Windows'
//  }
//  
//  StyleManager.computed.detectOS = function () {
//    let platform = window.navigator.platform
//    if (typeof(osMapping[platform]) === 'string') {
//      platform = osMapping[platform]
//    }
//    console.log(MDD.isMobile)
//    return platform
//  }

  /**
   * Mac OS
   */
  StyleManager.computed.detectOS = function () {
    //console.log('@TEST Detect OS: Mac OS')
    //return 'Mac OS'  // for test
    
    let osName = this.deviceDetect.osName
    console.log({osName})
    return osName
  }
  
  StyleManager.computed.detectIsIOS = function () {
    return (this.detectOS === 'Mac OS'
            || this.detectOS === 'iOS')
  }
  
  StyleManager.computed.detectBrowser = function () {
    return this.deviceDetect.browserName
  }
}