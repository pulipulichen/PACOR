import $ from 'jquery'

export default function (Questionnaire) {
  
  Questionnaire.methods.initSearch = function () {
    let _this = this
      $(this.$refs.SearchInput).search({
        type: 'category',
        source: this.localSearch,
        cache: false,
        showNoResults: false,
        onResultsAddZZZ: (html) => {
          console.log(html)
          return false
        },
        onResultsAAA: function (response) {
          //this.noResult = (Object.keys(response.results).length === 0)
          
//          let noResult = (Object.keys(response.results).length === 0)
//          if (noResult) {
//            response.results[this.$t('Action')] = [{
//                category: this.$t('Action'),
//                title: this.$t('Add keyword: {0}', ['zzassa']),
//                id: 'a0'
//            }]
//          }
//          console.log(response.results)
          //console.log(this)
          let resultsElement = $(this).find('.results:first')
          _this.onResultsOpen(resultsElement)
          
          return response
        },
//        onResultsOpen: function () {
//          let resultsElement = this
//          _this.onResultsOpen(resultsElement)
//          //console.log(this)
//        },
        error: {
          noResults: ''
        }
      })
  }
  
  Questionnaire.methods.onResultsOpen = function (resultsElement) {
    let message = resultsElement.find('.message:first')
    
    console.log(message.length, )
    
    if (message.hasClass('empty')) {
      console.log('不行嗎', this.$t('Add keyword: {0}', ['zzassa']), message.find('.header').length)
      setTimeout(() => {
        message.find('.header').html(this.$t('Add keyword: {0}', ['zzassa']))
      }, 100)
    }
  }
    
  Questionnaire.methods.addAnswerKeyword = function (keyword) {
      if (typeof(keyword) !== 'string') {
        return false
      }
      
      keyword = keyword.trim()
      if (keyword === '') {
        return false
      }
      
      let i = this.answeredList.indexOf(keyword)
      if (i > -1) {
        // 把這個選項移到最前面去
        this.answeredList.splice(i, 1)
      }
      
      this.answeredList.unshift(keyword)
      return true
    }
  Questionnaire.methods.deleteKeyword = function (i) {
      let keyword = this.answeredList[i]
      this.answeredList.splice(i, 1)
      this.removedList.unshift(keyword)
    }
  Questionnaire.methods.restoreKeyword = function (i) {
      let keyword = this.removedList[i]
      this.removedList.splice(i, 1)
      this.answeredList.unshift(keyword)
    }
  Questionnaire.methods.sortList = function (listName) {
      let list = this[listName]
      list.sort()
      //console.error('sortList (list)', list)
    }
}