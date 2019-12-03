'use strict'

import RandomText from './RandomText.tpl'
const textList = RandomText.trim().split('\n')
const len = textList.length - 1

let RandomTextHelper = function () {
  return textList[(Math.round(Math.random() * textList.length))]
}

export default RandomTextHelper