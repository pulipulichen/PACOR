export default function (StyleManager) {
  
  const osMapping = {
    'MacIntel': 'iOS',
    'Linux armv8l': 'Android',
    'Win32': 'Windows'
  }
  
  StyleManager.computed.detectOS = function () {
    let platform = window.navigation.platform
    if (typeof(osMapping[platform]) === 'string') {
      platform = osMapping[platform]
    }
    return platform
  }
}