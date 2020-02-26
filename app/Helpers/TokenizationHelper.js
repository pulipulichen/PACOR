'use strict'

const $ = use('cheerio')
const Segment = use('novel-segment')
const pos = use('pos')
const path = use('path')

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
      //console.log(path.join(__dirname, 'novel-segment', 'stopword.txt'))
      segment.loadDict(path.join(__dirname, 'novel-segment', 'dict.txt'))
      segment.loadDict(path.join(__dirname, 'novel-segment', 'jieba-dict.txt'))
      segment.loadStopwordDict(path.join(__dirname, 'novel-segment', 'stopword.txt'))
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
        p: [p]
      }
    })
  },
  parseCharFrequency (text) {
    let array = this.parseSingleCharacter(text)
    
    let output = {}
    array.forEach(item => {
      if (typeof(output[item]) !== 'number') {
        output[item] = 0
      }
      output[item]++
    })
    
    return output
  },
  parseWordFrequency (text, pos) {
    if (typeof(pos) === 'string') {
      pos = [pos]
    }
    
    let result = this.parseSegment(text)
    let output = {}
        
    result.forEach(({w, p}) => {
      p.forEach(p => {
        if (pos !== undefined && pos.indexOf(p) === -1) {
          return false
        }
        
        if (typeof(output[p]) !== 'object') {
          output[p] = {}
        }

        if (typeof(output[p][w]) !== 'number') {
          output[p][w] = 1
        }
        else {
          output[p][w]++
        }
      })
    })
    
    let outputMerge = {}
    Object.keys(output).forEach(p => {
      Object.keys(output[p]).forEach(w => {
        if (typeof(outputMerge[w]) === 'undefined') {
          outputMerge[w] = output[p][w]
        }
        else {
          outputMerge[w] = outputMerge[w] + output[p][w]
        }
      })
    })
    
    return outputMerge
  },
  /**
   * 輸出結果會是？
   */
  parseSegment (text) {
    let segment = this.getChineseSegment()
    let result = segment.doSegment(text, {
      //stripStopword: true  
    })
    
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
          //console.log(r.w)
          let eng = this.parseEnglishPos(r.w)
          output = output.concat(eng)
        }
      }
      else {
        r.p = ['unknown']
        output.push(r)
      }
    })
    
    return output
  },
  // http://blog.pulipuli.info/2017/11/fasttag-identify-part-of-speech-in.html
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
    // http://blog.pulipuli.info/2017/11/fasttag-identify-part-of-speech-in.html
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
}

module.exports = TokenizationHelper