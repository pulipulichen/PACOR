import RandomTextHelper from './lib/RandomTextHelper.js'

export default function (PACORTestManager) {
  PACORTestManager.methods.createRandomText = function () {
    return RandomTextHelper()
  }
  
  PACORTestManager.methods.createRandomHtml = function () {
    return '<p>' + RandomTextHelper() + '</p>'
  }
}