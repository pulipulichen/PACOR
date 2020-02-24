export default function (Questionnaire) {
  Questionnaire.computed = {
    buttonText: function () {
      //return this.$t('OK')
      if (typeof(this.log.start_timestamp) !== 'number') {
        return '(' + this.$t('Waiting') + ')'
      }
      else if (this.remainingSeconds > 0) {
        let remainingTime = this.lib.DayJSHelper.formatHHMMSS(this.remainingSeconds)
        return '(' + this.$t('Remaining Time: {0}', [remainingTime]) + ')'
      }
      else {
        return ''
      }
    },
    buttonClass: function () {
      //return 'disabled'
      return ''
    },
    wordCount: function () {
      if (typeof(this.log) !== 'object'
              || typeof(this.log.answer) !== 'string') {
        return 0
      }
      //console.log(this.log.answer)
      return this.lib.StringHelper.countWords(this.log.answer)
    },
    displayCharacterCounter: function () {
      if (typeof(this.log) !== 'object'
              || typeof(this.log.answer) !== 'string') {
        //console.log('err')
        return ''
      }
      
      let output = this.$t('{0} word', [this.wordCount])
      
      if (this.wordCount < this.minWords) {
        let needWordsCount = this.minWords - this.wordCount
        output = output + ' (' + this.$t('You still need to write {0} words more.', [needWordsCount]) + ')'
      }
      //console.log(output)
      return output
    },
    classWordCounter: function () {
      if (this.wordCount < this.minWords) {
        return 'red'
      }
      else {
        return 'green'
      }
    },
    hasStarted () {
      return (this.log.start_timestamp !== null)
    },
//    isTimeUp: function () {
//      console.log(this.remainingSeconds)
//      return (typeof(this.remainingSeconds) === 'number'
//              && this.remainingSeconds <= 0)
//    }
    localSearch () {
      
      // 總之，先做假資料看看
      var categoryContent = [
        {category: 'South America', title: 'Brazil'},
        {category: 'South America', title: 'Peru'},
        {category: 'North America', title: 'Canada'},
        {category: 'Asia', title: 'South Korea'},
        {category: 'Asia', title: 'Japan'},
        {category: 'Asia', title: 'China'},
        {category: 'Europe', title: 'Denmark'},
        {category: 'Europe', title: 'England'},
        {category: 'Europe', title: 'France'},
        {category: 'Europe', title: 'Germany'},
        {category: 'Africa', title: 'Ethiopia'},
        {category: 'Africa', title: 'Nigeria'},
        {category: 'Africa', title: 'Zimbabwe'},
      ]
      return categoryContent
    }
  }
}