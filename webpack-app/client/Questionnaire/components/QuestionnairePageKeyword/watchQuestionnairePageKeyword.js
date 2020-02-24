export default function (Questionnaire) {
  Questionnaire.watch = {
//    'remainingSeconds': function () {
//      if (typeof(this.remainingSeconds) === 'number'
//              && this.remainingSeconds > 0) {
//        this.startCountdown()
//      }
//    },
    'answer' (answer) {
      //console.log(answer)
      if (answer !== this.log.answer) {
        this.log.answer = answer
      }
    }
  }
}