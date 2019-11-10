'use strict'

const $ = use('cheerio')
const Segment = use('novel-segment')
const pos = use('pos')

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
  getChineseSegment () {
    if (this._segment === null) {
      let segment = new Segment
      segment.useDefault()
      this._segment = segment
    }
    
    return this._segment
  },
  parseEnglishPos (text) {
    let words = new pos.Lexer().lex(text)
    let tagger = new pos.Tagger()
    let taggedWords = tagger.tag(words)
    
    return taggedWords.map(taggedWord => {
      let w = taggedWord[0]
      let p = taggedWord[1]
      //console.log(pList)
      if (typeof(this.PosRemap.EnglishPosJS[p]) === 'string') {
        p = this.PosRemap.EnglishPosJS[p]
      }
      else {
        console.log('Remap not found: ' + p)
      }
      /*
      let output = []
      for (let i in pList) {
        let p = pList[i]
        
        if (typeof(this.PosRemap.EnglishPosJS[p]) === 'string') {
          p = this.PosRemap.EnglishPosJS[p]
        }
        else {
          console.log('Remap not found: ' + p)
        }
        output.push(p)
      }
      */
      return {
        w,
        p
      }
    })
  },
  parseWordFrequency (text) {
    let segment = this.getSegment()
    let result = segment.doSegment(text)
    
    console.log(segment.POSTAG)
    
    let output = {}
    
    result = result.map(r => {
      if (typeof(r.p) !== 'undefined') {
        //r.pn = segment.POSTAG[r.p]
        r.pn = segment.POSTAG.enName(r.p)
      }
      return r
    })
    
    output = result
    
    
    return output
  },
  parseSegment (text) {
    let segment = this.getChineseSegment()
    let result = segment.doSegment(text)
    
    //console.log(segment.POSTAG)
    
    let output = []
    result.map(r => {
      if (typeof(r.p) !== 'undefined') {
        //r.pn = segment.POSTAG[r.p]
        //r.pn = segment.POSTAG.enName(r.p)
        let posList = segment.POSTAG.enName(r.p)
        
        if (this.PosRemap.ChineseToEng.indexOf(posList) === -1) {
          r.p = posList.split(',').map(p => {
            if (typeof(this.PosRemap.ChineseNovelSegment[p]) === 'string') {
              p = this.PosRemap.ChineseNovelSegment[p]
            }
            return p
          })
          
          output.push(r)
        }
        else {
          console.log(r.w)
          let eng = this.parseEnglishPos(r.w)
          output = output.concat(eng)
        }
      }
      else {
        output.push(r)
      }
    })
    
    return output
  },
  PosRemap: {
    ChineseToEng: ['a_nx', 'nx'],
    ChineseNovelSegment: {
      bad: 'unknown',
      d_a: 'adj',
      d_b: 'adj',
      d_c: 'conj',
      d_d: 'adv',
      d_e: 'int',
      d_f: 'v',
      d_i: 'adj',
      d_l: 'n',
      a_m: 'm',
      d_mq: 'q',
      d_n: 'n',
      d_o: 'o',
      d_p: 'prep',
      a_q: 'q',
      d_r: 'pron',
      d_s: 'n',
      d_t: 'adv',
      d_u: 'u',
      d_v: 'v',
      d_w: 'punc',
      d_x: 'unknown',
      d_y: 'u',
      d_z: 'adj',
      a_nr: 'n',
      a_ns: 'n',
      a_nt: 'n',
      a_nx: '外文字符', // 這個要丟給pos去判斷
      a_nz: 'n',
      d_zh: 'adv',
      d_k: 'pron',
      url: 'n',
      unk: 'unknown',
      w: 'punc',
      nx: '外文字符'  // 需要丟給pos判斷
    },
    EnglishPosJS: {
      "B": 'adj',
      "CC": "conj",
      "CD": "n",
      "DT": "n",
      "EX": "n",
      "FW": "unknown",
      "IN": "prep",
      "JJ": "adj",
      "JJR": "adj",
      "JJS": "adj",
      "LS": "punc",
      "MD": "v",
      //"N": "n",
      "NN": "n",
      "NNS": "n",
      "NNP": "n",
      "NNPS": "n",
      //"P": 'prep',
      "POS": "prep",
      "PDT": "adj",
      "PP$": "pron",
      "PRP": "pron",
      //"R": "pron",
      "RB": "adv",
      "RBR": "adv",
      "RBS": "adv",
      "RP": "prep",
      "SYM": "punc",
      "TO": "prep",
      "UH": "int",
      "URL": "n",
      //"V": "v",
      "VB": "v",
      "VBD": "v",
      "VBG": "v",
      "VBN": "v",
      "VBP": "v",
      "VBZ": "v",
      "WDT": "n",
      "WP": "pron",
      "WP$": "pron",
      "WRB": "adv",
      ",": "punc",
      ".": "punc",
      ":": "punc",
      "$": "punc",
      "#": "punc",
      "\"": "punc",
      "(": "punc",
      ")": "punc"
    }
  },
  
  remapChinesePos (p) {
    if (p === undefined) {
      return []
    }
    
    let segment = this.getSegment()
    let posList = segment.POSTAG.enName(p).split(',')
    
    return posList.map(pos => {
      if (pos === 'a_nx') {
        // 交給pos
        
      }
    })
  }
}

module.exports = TokenizationHelper