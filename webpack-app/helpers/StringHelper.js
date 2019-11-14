import $ from 'jquery'

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
    string = string.replace(/(。，、；：「」『』（）—？！…《》～〔〕［］・　)/ig," ") ;
    string = string.replace(/\s+/ig," ");
    //string = string.replace(/_+/ig," ");
    var a = string.split(/[\s+|\\|\/]/g);
    var count = 0;
    var pnkCounter = 0;
    var thiCounter = 0;
    for (var i=0;i<a.length;i++){
        if (a[i]==='{PNK}'){
              pnkCounter++;
        }else if(a[i]==='{THI}'){
              thiCounter++;
        }else if (a[i].length>0){
              count++;
        }
    }
    count += Math.ceil(pnkCounter/3) + Math.ceil(thiCounter/4);
    return count;
  },
  removePunctuations (s) {
    if (typeof(s) !== 'string') {
      return ''
    }
    
    s = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()。，、；：「」『』（）—？！…《》～〔〕［］・　]/g, " ")
    while (s.indexOf('  ') > -1) {
      s = s.replace(/  /g, ' ')
    }
    return s
  },
  removeSpaces (s) {
    return s.replace(/ /g, '')
  },
  htmlToText (s) {
    return $(s).text()
  }
}

export default StringHelper