import $ from 'jquery'

export default function (Questionnaire) {
  Questionnaire.watch = {
//    'remainingSeconds': function () {
//      if (typeof(this.remainingSeconds) === 'number'
//              && this.remainingSeconds > 0) {
//        this.startCountdown()
//      }
//    },
    'inputKeyword' (inputKeyword) {
      this.initSearch()
    },
    answeredList (list) {
      this.log.answeredList = list
      this.persist()
    },
    removedList (list) {
      this.log.removedList = list
      this.persist()
    }
  }
}