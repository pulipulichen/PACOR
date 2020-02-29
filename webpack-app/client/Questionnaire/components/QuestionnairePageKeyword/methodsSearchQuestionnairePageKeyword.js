import $ from 'jquery'

export default function (Questionnaire) {

  Questionnaire.methods.initSearch = function () {
    let _this = this
    $(this.$refs.SearchInput).search({
      type: 'category',
      source: this.localSearch,
      cache: false,
      showNoResults: false,
      onSelect: (result, response) => {
        //console.log(result, response)
        if (result.category === this.$t('Add removed keyword')
                || result.category === this.$t('Add keyword')) {
          this.onSubmit()
          this.$refs.SearchInputText.blur()
          this.$refs.SearchInputText.focus()
          return false
        }
        
        this.inputKeyword = result.title
        this.$refs.SearchInputText.focus()
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
    if (typeof (keyword) !== 'string') {
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
    
    let j = this.removedList.indexOf(keyword)
    if (j > -1) {
      // 把這個選項移到最前面去
      this.removedList.splice(j, 1)
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
  
  Questionnaire.methods.onSubmit = function (e) {
    if (e) {
      e.preventDefault()
    }
    let inputKeyword = this.inputKeyword.trim()
    if (inputKeyword === '') {
      return false
    }
    
    if (inputKeyword.indexOf(' ') > -1
            && this.lib.StringHelper.countWords(inputKeyword).length > 10) {
      inputKeyword.split(' ').forEach(k => {
        this.addAnswerKeyword(k.trim())
      })
    }
    else {
      this.addAnswerKeyword(inputKeyword)
    }
    
    this.inputKeyword = ''
    this.$refs.SearchInputText.blur()
    this.$refs.SearchInputText.focus()
    
    return false
  }
  
  
  Questionnaire.methods.labelTitleRemove = function (keyword) {
    return this.$t('Remove keyword "{0}"', [keyword])
  }
  
  Questionnaire.methods.labelTitleAdd = function (keyword) {
    return this.$t('Add keyword "{0}"', [keyword])
  }
}