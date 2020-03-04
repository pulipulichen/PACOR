
let TestOptions = {
  //threads: 1,
  //threads: 3, // ok 完全運作正常
  //threads: 5,  // ?個錯誤
  threads: 9,  // ?個錯誤
  //threads: 15,  // 10個錯誤
  //threads: 20,  // 0個錯誤 20200222
  //threads: 30,  // ?個錯誤
  //threads: 40,  // 10個錯誤
  maxShowThreads: 9,
  mode: 'parallel',
  headless: false,
  //headless: false,
  //stopAt: 'c1. pre image',
  //stopAt: 'e2. 隨意寫標註',
  //stopAt: '0a. setup webpage config',
  //stopAt: 'c2. 中場確認 is PACORTestManager work?',
  //stopAt: 'd1. 專注閱讀: 確認視窗',
  //stopAt: 'd2. 隨意寫標註',
  displayDevTools: false,
  
  //groupSize: 6,
  //webpageConfig,
  
  //manualReader: true,
  //manualAdmin: true
}


// 每次大型功能開發完都要做這個確認
/*
TestOptions = {
  threads: 15,  // 10個錯誤
  mode: 'parallel',
  headless: false,
  displayDevTools: false,
  groupSize: 6,
  //webpageConfig,
}
*/

module.exports = TestOptions