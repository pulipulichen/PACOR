'use strict'

const $ from 'jquery'
const Segment = use('novel-segment')

let TokenizationHelper = {
  htmlToText (html) {
    if (html.indexOf('<') === -1 && html.indexOf('</') === -1) {
      return html
    }
    if (html.startsWith('<') === false && html.endsWith('>') === false) {
      html = `<div>${html}</div>`
    }
    return $(html).text()
  },
  removePunctuations (s) {
    s = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()。，、；：「」『』（）—？！…《》～〔〕［］・　]/g, " ")
    while (s.indexOf('  ') > -1) {
      s = s.replace(/  /g, ' ')
    }
    return s
  },
  parseSingleCharacter (text) {
    let output = []
    let word = ''
    let isMultiCharacter = false
    
    let regexPunctuations = /[.,\/#!$%\^&\*;:{}=\-_`~()。，、；：「」『』（）—？！…《》～〔〕［］・　]/
    let regexMultiChar = /^[A-Za-z0-9]+$/
    
    let addWord = () => {
      if (word !== '') {
        output.push(word)
        word = ''
        isMultiCharacter = false
      }
    }
    
    text.split("").forEach(c => {
      if (c === ' ' || regexPunctuations.test(c)) {
        // 略過空格和標點符號
        addWord()
        return false
      }
      else if (regexMultiChar.test(c)) {
        // 英數字的場合
        if (isMultiCharacter === false) {
          // 前一個字不是英數字的場合
          addWord()
          isMultiCharacter = true
        }
        word = word + c
      }
      else {
        // 不是英數字的場合
        if (isMultiCharacter === true) {
          // 前一個字是英數字的場合
          addWord()
        }
        output.push(c)
      }
    })
    return output
  },
  _segment: null,
  getSegment () {
    if (this._segment === null) {
      let segment = new Segment
      segment.useDefault()
      this._segment = segment
    }
    
    return this._segment
  },
  parseWordFrequency (text) {
    let result = this.getSegment().doSegment(text)
    
    let output = {}
    
    output = result
    
    
    return output
  },
  remapPos (p) {
    return p
  }
}

module.exports = TokenizationHelper