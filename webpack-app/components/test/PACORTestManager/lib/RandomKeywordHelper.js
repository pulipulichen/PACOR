'use strict'

import RandomKeyword from './RandomKeyword.tpl'
const textList = RandomKeyword.trim().split('\n')
const len = textList.length - 1

let RandomKeywordHelper = function () {
  let text = textList[(Math.floor(Math.random() * textList.length))]
  if (!text) {
    return RandomKeywordHelper()
  }
  else {
    return text
  }
}

export default RandomKeywordHelper