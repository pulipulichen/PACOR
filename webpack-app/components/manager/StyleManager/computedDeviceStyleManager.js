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
    //return 'iOS'  // for test
    
    
    return this.deviceDetect.osName
  }
  
  StyleManager.computed.detectBrowser = function () {
    return this.deviceDetect.browserName
  }
}