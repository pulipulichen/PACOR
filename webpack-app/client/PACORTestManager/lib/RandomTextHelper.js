'use strict'

import RandomText from './RandomText.tpl'
const textList = RandomText.trim().split('\n')
const len = textList.length - 1

let RandomTextHelper = function () {
  let text = textList[(Math.floor(Math.random() * textList.length))]
  if (!text) {
    return RandomTextHelper()
  }
  else {
    return text
  }
}

export default RandomTextHelper