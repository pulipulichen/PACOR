import EditorButton from './EditorButton/EditorButton.vue'

let SectionAnnotationList = {
  props: ['lib', 'status', 'config'
    , 'sectionSeqID', 'sectionsData'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    return {
      page: 0,
      noMore: false
    }
  },
  components: {
    'editor-button': EditorButton
  },
  computed: {
    instance () {
      if (!this.sectionsData) {
        throw new Error('no section data')
        return undefined
      }
      
      if (typeof(this.sectionsData.annotation[this.sectionSeqID]) !== 'object') {
        this.sectionsData.annotation[this.sectionSeqID] = {}
      }
      return this.sectionsData.annotation[this.sectionSeqID]
    },
    users () {
      if (Array.isArray(this.sectionsData.annotation[this.sectionSeqID].users) === false) {
        this.sectionsData.annotation[this.sectionSeqID].users = []
      }
      //console.log(this.sectionsData.annotation[this.sectionSeqID].users)
      return this.sectionsData.annotation[this.sectionSeqID].users
    },
    userCount () {
      //console.log(this.sectionsData.annotation[this.sectionSeqID])
      if (!this.sectionsData.annotation[this.sectionSeqID]) {
        return 0
      }
      
      return this.sectionsData.annotation[this.sectionSeqID].userCount
    },
    annotations () {
      if (!this.sectionsData.annotation[this.sectionSeqID]) {
        return []
      }
      
      if (Array.isArray(this.sectionsData.annotation[this.sectionSeqID].annotations) === false) {
        this.sectionsData.annotation[this.sectionSeqID].annotations = []
      }
      return this.sectionsData.annotation[this.sectionSeqID].annotations
    },
    myAnnotation () {
      //console.log(this.sectionsData.annotation[this.sectionSeqID])
      if (!this.sectionsData.annotation[this.sectionSeqID]) {
        return undefined
      }
      return this.sectionsData.annotation[this.sectionSeqID].myAnnotation
    },
    hasAnnotation () {
      return (this.sectionsData 
              && this.sectionsData.annotation
              && this.sectionsData.annotation[this.sectionSeqID]
              && this.sectionsData.annotation[this.sectionSeqID].annotations
              && this.sectionsData.annotation[this.sectionSeqID].annotations.length > 0)
    },
    computedSectionMainIdeaButtonStyle: function () {
      let type = 'SectionMainIdea'
      let buttonStyle = this.status.readingConfig.annotationTypeModules[type].style.button
      return {
        color: buttonStyle.color,
        'background-color': buttonStyle.backgroundColor,
      }
    },
  },
  watch: {
    'page' (page) {
      if (page > -1) {
        this.loadNext()
      }
    },
  },
//  mounted() {
//  },
  methods: {
    findAnnotation (annotation) {
      //throw '@TODO ' + annotation.id
      //this.sectionsData.sectionAnnotation.callback = () => {
      //  this.reloadList()
      //}
      
      //this.sectionsData.sectionAnnotation.instance = annotation
      
      this.lib.AnnotationPanel.focusCommentInput(annotation, {
        'update': () => {
          this.reloadList()
        }
      })
    },
    loadNext: async function () {
      let query = {
        page: this.page,
        seq_id: this.sectionSeqID
      }
      
      let result = await this.lib.AxiosHelper.get('/client/Section/annotationsNext', query)
      //console.log(result)
      if (Array.isArray(result) && result.length > 0) {
        //console.log(this.sectionsData.annotation[this.sectionSeqID].annotations.length)
        
        result.forEach(a => {
          this.sectionsData.annotation[this.sectionSeqID].annotations.push(a)
        })
        
        //console.log(this.sectionsData.annotation[this.sectionSeqID].annotations.length)
        this.$forceUpdate()
        //this.page++
      }
      else {
        this.noMore = true
      }
    },
    reloadList: async function () {
      this.sectionsData.annotation[this.sectionSeqID].annotations = this.sectionsData.annotation[this.sectionSeqID].annotations.slice(0, 0)
      //console.log(this.sectionsData.annotation[this.sectionSeqID].annotations.length)
      if (this.page === 0) {
        await this.loadNext()
      }
      else {
        this.page = 0
      }
    },
    scrollList (event) {
      if (this.noMore === true) {
        return false
      }
      let element = event.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        //console.log('scrolled');
        this.page++
      }
    },
    popupUser (user, event) {
      
      let element = $(event.target)
      if (element.hasClass('user-container') === false) {
        element = element.parents('.user-container:first')
      }
      
      let className = element.prop('className')
      //console.log(element.classList.value.indexOf('username'))
      
      if (className.indexOf('popup-user-inited') > -1) {
        return false
      }
      
      /*
      element
        .popup({
          popup : $(this.$refs.popup),
          on    : 'click',
          inline: true,
          boundary: this.$refs.AnnotationList
        })
        .popup('show')
       */
      this.lib.tippy(element[0], {
        content: '',
        //content: this.$refs.popup,
        boundary: this.$refs.AnnotationList,
        trigger: 'click',
        interactive: true
      }).show()
      element.addClass('popup-user-inited')
      $(this.$refs.popup).show()
    },
  } // methods
}

//import methodsSectionAnnotationList from './methodsSectionAnnotationList.js'
//methodsSectionAnnotationList(SectionAnnotationList)

export default SectionAnnotationList