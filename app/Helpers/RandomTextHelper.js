'use strict'

const fs = use('fs')
const path = use('path')

const allText = fs.readFileSync(path.resolve(__dirname, './RandomText.txt'), 'utf8')
const textList = allText.trim().split('\n')
const len = textList.length

let RandomTextHelper = function () {
  return textList[(Math.round(Math.random() * textList.length))]
}

module.exports = RandomTextHelper