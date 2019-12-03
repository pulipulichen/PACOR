import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.writeAnnotations = async function (ms) {
    let min = 3
    let max = 10
    let writeAnnotations = min + Math.floor(Math.random() *  (max - min - 1))

    for (let i = 0; i < writeAnnotations; i++) {
      // 隨意寫標註
      this.log('撰寫' + i)
    }
  }
}