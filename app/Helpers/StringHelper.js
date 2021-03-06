const $ = use('cheerio')

let StringHelper = {
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  /**
   * https://www.thecodedeveloper.com/count-word-contain-utf-8-character-in-javascript/
   */
  countWords (string) {
    if (typeof(string) !== 'string') {
      return 0
    }
    
    //console.log(string)
    string = string.trim()
    if (string.startsWith('<') && string.endsWith('>')) {
      string = $(string).text()
    }
    
    let r1 = new RegExp('[\u3000-\u4DFF]','g');
    let r2 = new RegExp('[\u4E00-\u9FFF]','g');
    let r3 = new RegExp('[\u0E00-\u0E7F]','g');
    string = string.replace(r1,' {PNK} ');
    string = string.replace(r2,' {CJK} ');
    string = string.replace(r3,' {THI} ');
    //string = string.replace(/(<([^>]+)>)/ig,”") ;
    string = string.replace(/(\(|\)|\*|\||\+|\”|\’|_|;|:|,|\.|\?)/ig," ") ;
    string = string.replace(/(。，、；：「」『』（）—？！…《》～〔〕［］・─　)/ig," ") ;
    string = string.replace(/\s+/ig," ");
    //string = string.replace(/_+/ig," ");
    var a = string.split(/[\s+|\\|\/]/g);
    var count = 0;
    var pnkCounter = 0;
    var thiCounter = 0;
    for (var i=0;i<a.length;i++){
        if (a[i]==='{PNK}'){
              pnkCounter++;
        }
        else if(a[i]==='{THI}'){
              thiCounter++
        }
        else if (a[i].length>0){
              count++
        }
    }
    count += Math.ceil(pnkCounter/3) + Math.ceil(thiCounter/4);
    return count;
  },
  removePunctuations (s) {
    if (typeof(s) !== 'string') {
      return ''
    }
    
    s = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()。，、；：「」『』（）—？！…《》～〔〕［］・─　]/g, " ")
    while (s.indexOf('  ') > -1) {
      s = s.replace(/  /g, ' ')
    }
    return s
  },
  removeSpaces (s) {
    return s.replace(/ /g, '')
  },
  htmlToText (s, spaceInDifferentElement) {
    if (typeof(s) !== 'string') {
      return ''
    }
    s = s.trim()
    
    if (!s.startsWith('<') && !s.endsWith('>')) {
      return s
    }
    
    //if (!s.startsWith('<') && !s.endsWith('>')) {
    s = '<div>' + s + '</div>'
    //}
    
    let output
    if (!spaceInDifferentElement || spaceInDifferentElement === false) { 
      output = $(s).text().trim()
    }
    else {
      let children = $(s).children()
      output = []
      
      children.each((i, ele) => {
        //console.log(ele.children.length)
        /*
        if (!Array.isArray(ele.children)
                || ele.children.length === 0) {
          return false
        }
        */
        /*
        for (let j = 0; j < ele.children.length; j++) {
          if (Array.isArray(ele.children[j].children)) {
            
          }
          else {
            let text = ele.children[j].data
            console.log(typeof(text), typeof(ele.children[j].children))
            if (typeof(text) !== 'string') {
              return false
            }
            output.push(text.trim())
          }
            
        }
        */
        output.push(this.getTextFromChildren(ele))
      })
      output = output.join(' ').trim()
    }
    
    output = output.split('\n').join(' ')
    while (output.indexOf('  ') > -1) {
      output = output.split('  ').join(' ')
    }
    //console.log('[', output, ']', s.split('\n').join(' '))
    return output
  },
  getTextFromChildren: function (ele) {
    //console.log(ele.children.length)
    let output = []
    if (!Array.isArray(ele.children)
            || ele.children.length === 0) {
      return ''
    }
    for (let j = 0; j < ele.children.length; j++) {
      if (Array.isArray(ele.children[j].children)) {
        return this.getTextFromChildren(ele.children[j])
      }
      else {
        let text = ele.children[j].data
        //console.log(typeof(text), typeof(ele.children[j].children))
        if (typeof(text) === 'string') {
          output.push(text.trim())
        }
      }
    }
    return output.join(' ')
  },
  isURL (s) {
    if (typeof(s) !== 'string') {
      return false
    }
    
    return (s.startsWith('//')
            || s.startsWith('http://')
            || s.startsWith('https://')
            || s.startsWith('/'))
  },
  htmlTrim(html) {
    while (html.indexOf('<p>&nbsp;') > -1) {
      let reg = new RegExp('<p>&nbsp;', 'g')
      html = html.replace(reg, '<p>')
    }
    
    while (html.indexOf('&nbsp;</p>') > -1) {
      let reg = new RegExp('&nbsp;</p>', 'g')
      html = html.replace(reg, '</p>')
    }
    
    return html
  },
  htmlToTextTrim(html, spaceInDifferentElement) {
    let text = this.htmlToText(html, spaceInDifferentElement)
    return this.htmlTrim(text)
  }
}

module.exports = StringHelper