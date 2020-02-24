import RandomTextHelper from './lib/RandomTextHelper.js'
import RandomKeywordHelper from './lib/RandomKeywordHelper.js'

export default function (PACORTestManager) {
  PACORTestManager.methods.createRandomText = function () {
    return RandomTextHelper()
  }
  
  PACORTestManager.methods.createRandomHtml = function () {
    return '<p>' + RandomTextHelper() + '</p>'
  }
  
  PACORTestManager.methods.createRandomKeyword = function () {
    return RandomKeywordHelper()
  }
}