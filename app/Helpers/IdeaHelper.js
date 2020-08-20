'use strict'
let c2w = {
      A1: "兩千年前羅馬人就開始使用放大鏡",
      A1a: "兩千年前",
      A1b: "羅馬",
      A1c: "@放大鏡",
      A1d: "其他年代*",
      A1e: "其他國家*",
      A2: "後來威尼斯人發明了製造透明玻璃的方法",
      A2a: "威尼斯",
      A2b: "發明",
      A2c: "@玻璃",
      A2d: "鏡子*",
      A3: "並將這些玻璃研製成凸透鏡",
      A3a: "研製",
      A3b: "@凸透鏡",
      A4: "讓老年人的老花眼看得更清楚",
      A4a: "老年人",
      A4b: "老花眼",
      A4c: "清楚",
      A4d: "望遠鏡*",
      A4e: "凸透鏡可以放大物體!",
      A5: "之後又發現凹透鏡可以改善近視眼的視力",
      A5a: "發現",
      A5b: "凹透鏡",
      A5c: "近視眼",
      A5d: "視力",
      A6: "因此從十四世紀開始就有人在製造眼鏡",
      A6a: "十四世紀",
      A6b: "眼鏡",
      B1: "後來荷蘭的眼鏡技師楊森發明了顯微鏡",
      B1a: "荷蘭",
      B1b: "眼鏡技師",
      B1c: "楊森",
      B1d: "@顯微鏡",
      B2: "雖然性能簡陋如同玩具一般",
      B2a: "簡易顯微鏡!",
      B2b: "垃圾*",
      B3: "但他卻非常感興趣",
      B3a: "感興趣",
      B4: "時常用來觀察一些自然界的小蟲子",
      B4a: "@觀察",
      B4b: "自然界",
      B4c: "蟲子",
      B4d: "顯微鏡可以看到很小的東西!",
      B5: "並認為想看得更清楚只要把眼睛湊近觀察就足夠了",
      B5a: "眼睛",
      B5b: "湊近",
      B5c: "楊森滿足顯微鏡，沒有想要改進!",
      C1: "一六六五年英國科學家虎克發明複合式顯微鏡",
      C1a: "一六六五",
      C1b: "英國",
      C1c: "科學家",
      C1d: "虎克",
      C1e: "複合式顯微鏡",
      C2: "這是第一部具實用功能的顯微鏡",
      C2a: "楊森的顯微鏡不實用!",
      C3: "他利用自己的顯微鏡觀察各種動植物及礦物",
      C3a: "動物",
      C3b: "@植物",
      C3c: "生物!",
      C3d: "礦物",
      C4: "他在觀察軟木的構造時",
      C4a: "軟木",
      C5: "發現軟木是由許多小孔組成",
      C5a: "小孔",
      C6: "他將這些小孔命名為細胞",
      C6a: "@細胞",
      C6b: "虎克發現細胞!",
      C7: "引發人類對微小世界的研究興趣",
      C7a: "人類",
      C7b: "微小世界",
      C7c: "稀有*",
      C7d: "研究",
      D1: "一六七三年荷蘭的眼鏡技師雷文霍克研磨了許多精巧的透鏡",
      D1a: "一六七三年",
      D1b: "雷文霍克",
      D1c: "精巧",
      D1d: "透鏡",
      D2: "其中不乏放大倍數在一百倍以上的單片顯微鏡",
      D2a: "放大倍數",
      D2b: "單片顯微鏡",
      D2c: "雷文霍克開發了更高級單片顯微鏡!",
      D3: "有一次他在泥水中發現有小生物存在",
      D3a: "泥水",
      D3b: "微生物",
      D3c: "寶寶*",
      D4: "是歷史上第一個看見細菌的人",
      D4a: "@細菌",
      D4b: "@病毒*",
      D4c: "生病*",
      D4d: "屍體*",
      D4e: "新冠肺炎*",
      D4f: "非洲豬瘟*",
      D4g: "流行性感冒*",
      D4h: "SARS*",
      D4i: "伊波拉*",
      D4j: "黴菌*",
      D4k: "危險*",
      D4l: "微生物之父*",
      D4m: "顯微鏡可以看到細菌!",
      D4n: "雷文霍克在泥水中發現細菌",
      E1: "透過顯微鏡人們看見許多肉眼看不見的東西",
      E1a: "揭開廬山真面目!",
      E2: "了解未知的微小世界對生物學醫學的進步有莫大的幫助",
      E2a: "未知",
      E2b: "生物學",
      E2c: "生化武器*",
      E2d: "醫學",
      E2e: "進步",
      E2f: "莫大的",
      E3: "現在的顯微鏡已由單片透鏡發展為多片透鏡組合",
      E3a: "多片透鏡組合",
      E4: "並可分為光學顯微鏡及電子顯微鏡",
      E4a: "光學顯微鏡",
      E4b: "電子顯微鏡",
      E4c: "@機器*",
      E4d: "昂貴*",
      E4e: "樣式!",
      E5: "光學顯微鏡的放大倍數從十倍到一千五百倍不等",
      E6: "電子顯微鏡可將物體放大到二十萬倍",
      E7: "不過物體必須切成薄片才能觀察",
      E7a: "薄片",
      E7b: "@實驗*",
      E7c: "圓形*",
      E7d: "電子顯微鏡可以將切成薄片的物體放大二十萬倍來觀察!",
      E7e: "電子顯微鏡比光學顯微鏡能看到更小的東西但是只能看到薄片!",
      E8: "這是一九三一年由德國科學家魯司卡及古諾爾共同發明的",
      E8a: "一九三一年",
      E8b: "德國",
      E8c: "魯司卡",
      E8d: "古諾爾",
      E8e: "德國科學家發明電子顯微鏡!",
      F1: "人類一直想看到微小世界的物體!",
      F2: "顯微鏡的發明解答了人類自古以來的許多疑問",
      F2a: "疑問",
      F3: "也讓科學的研究技術更加日新月異",
      F3a: "科學",
      F3b: "日新月異"
    }
    
let IdeaHelper = {
  SORT_WORDS: function (stringList) {
    if (Array.isArray(stringList) === false) {
      stringList = [[stringList]]
    }

    let output = []
    stringList.forEach(rows => {
      rows.forEach(col => {
        output = output.concat(col.split(" "))
      })
    })


    return output.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).sort().join(' ').trim()
  },

  SORT_WORDS_L1: function (stringList) {
    if (Array.isArray(stringList) === false) {
      stringList = [[stringList]]
    }

    let output = []
    stringList.forEach(rows => {
      rows.forEach(col => {
        let codes = []
        col.split(" ").forEach(code => {
          if (code === "") {
            return ''
          }

          let {word, type} = codeToWordType(code)
          if (type === 0 || type === 3) {
            codes.push(code)
          }
        })
        output = output.concat(codes)
      })
    })

    return output.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).sort().join(' ').trim()
  },

  SORT_WORDS_L2: function (stringList) {
    if (Array.isArray(stringList) === false) {
      stringList = [[stringList]]
    }

    let output = []
    stringList.forEach(rows => {
      rows.forEach(col => {
        let codes = []
        col.split(" ").forEach(code => {
          if (code === "") {
            return ''
          }

          let {word, type} = codeToWordType(code)
          if (type === 1 || type === 2) {
            codes.push(code)
          }
        })
        output = output.concat(codes)
      })
    })

    return output.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).sort().join(' ').trim()
  },

  SORT_WORDS_L3: function (stringList) {
    if (Array.isArray(stringList) === false) {
      stringList = [[stringList]]
    }

    let output = []
    stringList.forEach(rows => {
      rows.forEach(col => {
        let codes = []
        col.split(" ").forEach(code => {
          if (code === "") {
            return ''
          }

          let {word, type} = codeToWordType(code)
          if (type === 3) {
            codes.push(code)
          }
        })
        output = output.concat(codes)
      })
    })

    return output.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).sort().join(' ').trim()
  },

  DIFF_WORDS_PLUS: function (string1, string2) {
    var array1 = string1.split(' ').filter(function (value, index, self) {
      return self.indexOf(value) === index;
    })

    var array2 = string2.split(' ').filter(function (value, index, self) {
      return self.indexOf(value) === index;
    })

    return array1.filter(function (item) {
      return (array2.indexOf(item) === -1)
    }).sort().join(' ').trim()
  },

  COUNT_CODES: function (stringList) {
    if (stringList.trim() === "") {
      return 0
    }
    return this.SORT_WORDS(stringList).split(" ").length
  },

  DIFF_WORDS: function (string1, string2) {
    var array1 = string1.split(' ').filter(function (value, index, self) {
      return self.indexOf(value) === index;
    })

    var array2 = string2.split(' ').filter(function (value, index, self) {
      return self.indexOf(value) === index;
    })

    var diff = array1.filter(function (item) {
      return (array2.indexOf(item) === -1)
    })

    diff = diff.concat(array2.filter(function (item) {
      return (array1.indexOf(item) === -1)
    }))

    return diff.sort().join(' ').trim()
  },

  sortType: function (cell1, cell2) {
    while (Array.isArray(cell1) === true) {
      cell1 = cell1[0]
    }

    while (Array.isArray(cell2) === true) {
      cell2 = cell2[0]
    }

    if (cell2 !== "a" && cell2 !== "b") {
      return cell1
    }

    return [cell1, cell2].sort().join(",")
    //return 
  },

  hasNew: function (cell1, cell2) {
    while (Array.isArray(cell1) === true) {
      cell1 = cell1[0]
    }

    while (Array.isArray(cell2) === true) {
      cell2 = cell2[0]
    }

    if (cell1.indexOf("_new_") > -1
            || cell2.indexOf("_new_") > -1) {
      return 1
    } else {
      return 0
    }
  },

  codeToWordType: function (cell) {
    

    while (Array.isArray(cell) === true) {
      cell = cell[0]
    }

    if (typeof (c2w[cell]) === "string") {
      let w = c2w[cell]
      let type = 0
      if (w.endsWith("!")) {
        type = 2
      } else if (w.endsWith("*")) {
        type = 1
      } else if (w.startsWith("@")) {
        type = 3
      }

      return {
        type: type,
        word: w,
        code: cell
      }
    }
  },

  codesListToWordsList: function (cell) {
    

    while (Array.isArray(cell) === true) {
      cell = cell[0]
    }

    return cell.split(" ").map(code => {
      if (typeof (c2w[code]) === "string") {
        return c2w[code]
      } else {
        return code
      }
    }).join(", ")
  },

  codeToWord: function (cell) {
    

    while (Array.isArray(cell) === true) {
      cell = cell[0]
    }

    if (cell.indexOf(" = ") > -1) {
      cell = cell.slice(0, cell.indexOf(" = "))
    }

    if (cell.lastIndexOf("_") > -1) {
      cell = cell.slice(cell.lastIndexOf("_") + 1)
    }

    if (typeof (c2w[cell]) === "string") {
      return c2w[cell]
    }
  },
  merge: function (ideaList) {
    let mergeList = []
    
    ideaList.forEach(list => {
      list.forEach(idea => {
        if (mergeList.indexOf(idea) === -1) {
          mergeList.push(idea)
        }
      })
    })
    
    return mergeList
  },
  diff: function (beforeList, afterList) {
    let newList = []
    
    afterList.forEach(idea => {
      if (beforeList.indexOf(idea) === -1) {
        newList.push(idea)
      }
    })
    
    return newList
  },
  filterTextbaseIdea: function (list) {
    if (typeof(list) === 'string') {
      list = list.split(' ')
    }
    
    let output = []
    list.forEach(code => {
      let word = c2w[code]
      if (typeof(word) !== 'string') {
        return false
      }
      
      if (word.endsWith('*') || word.endsWith('!')) {
        return false
      }
      output.push(word)
    })
    
    return output
  }
}

module.exports = IdeaHelper