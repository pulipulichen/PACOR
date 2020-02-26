
import CopyPasteHelper from './libs/CopyPasteHelper.js'

let ArticleInformation = {
  props: ['lib', 'status', 'config'],
  //data () {}, // 轉移到dataArticleInformation
  computed: {}, // 轉移到 computedArticleInformation
  methods: {} // 轉移到 methodsArticleInformation
}

import dataArticleInformation from './dataArticleInformation.js'
dataArticleInformation(ArticleInformation)

import computedArticleInformation from './computedArticleInformation.js'
computedArticleInformation(ArticleInformation)

import methodsArticleInformation from './methodsArticleInformation.js'
methodsArticleInformation(ArticleInformation)

export default ArticleInformation