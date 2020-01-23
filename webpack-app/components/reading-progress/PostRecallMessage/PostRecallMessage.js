let PostRecallMessage = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    articleTitle () {
      return document.title
    },
    readingProgressModules () {
      return this.status.readingConfig.readingProgressModules
    },
    preImaginaryConfig () {
      return this.readingProgressModules.PreImaginary
    },
    postRecallConfig () {
      return this.readingProgressModules.PostRecall
    },
    titleHTML () {
      return this.$t(`This article is titled <span class='highlight'>&quot;{0}&quot;</span>.`, [this.articleTitle])
    },
    timeLimitTypeStart () {
      return this.$t(`The time limit is <span class='highlight'>{0} minutes</span> and the countdown starts when you start typing.`, [this.preImaginaryConfig.limitMinutes])
    },
    timeLimitAutoStart () {
      return this.$t(`The time limit is <span class='highlight'>{0} minutes</span> and the countdown starts now.`, [this.preImaginaryConfig.limitMinutes])
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
//  methods: {
//  } // methods
}

export default PostRecallMessage