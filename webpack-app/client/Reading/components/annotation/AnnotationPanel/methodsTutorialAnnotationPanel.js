import $ from 'jquery'

export default function (AnnotationPanel) {
  
  AnnotationPanel.methods.setupTutorial = async function () {
    while (!this.lib.TutorialManager) {
      await this.lib.VueHelper.sleep(100)
    }
    
    if (this.lib.auth.enableCollaboration) {
      this.setupTutorialCollaborativeReading()
    }
    else {
      this.setupTutorialIndividualReading()
    }
    this.setupLocalTutorial()
  }
  
  AnnotationPanel.methods.setupTutorialCollaborativeReading = function () {
//    this.lib.TutorialManager.addAction({
//      backgroundFadeOut: true,
//      beforeCallback: async () => {
//        // 總之隨機塞一個標註進來吧
//        let section = this.lib.RangyManager.getOhterHighlightedSection()
//        if (!section) {
//          return false
//        }
//        
//        let seqID = parseInt(section.attr('data-pacor-paragraph-seq-id'), 10)
//        //console.log(sectionID)
//        
//        let annotation = await this.lib.AxiosHelper.get('/client/Annotation/getAnnotation', {
//          seqID: seqID
//        })
//
//        this.focusCommentInput(annotation)
//        await this.lib.VueHelper.sleep(1000)
//      },
//      element: () => {
//        // 顯示討論區的部分
//        //return $(this.$refs.panel).find('.AnnotationDiscussion:visible:first')
//        return $(this.$refs.panel).find('.annotation-discussion:visible:first')
//      },
//      afterClick: () => {
//        this.hide()
//      },
//      content: this.$t('You can give a comment to any annotation.'),
//      order: 11
//    })
  }
    
  AnnotationPanel.methods.setupTutorialIndividualReading = function () {
    let mainIdeaConfig = this.lib.auth.mainIdeaConfig
    let enableEditorAdd = mainIdeaConfig.enableEditorAdd
    
    if (enableEditorAdd === false) {
      return false
    }
    
    let contentNote = this.$t('Please write down the reasons for choosing this keyword or other things you think of from this keyword. You can also insert pictures.')
    if (this.lib.auth.currentStepConfig.HTMLEditor 
            && this.lib.auth.currentStepConfig.HTMLEditor.insertMultimedia === false) {
      contentNote = this.$t('Please write down the reasons for choosing this keyword or other things you think of from this keyword.')
    }
    
    this.lib.TutorialManager.addAction({
      //backgroundFadeOut: true,
      element: () => {
        return this.$refs.panel
      },
      content: contentNote,
      order: 31
    })
    
    this.lib.TutorialManager.addAction({
      element: () => {
        return $(this.$refs.panel).find('.AnnotaionInstruction:visible:first')
      },
      content: this.$t('Click "Hint" to read instruction of this type.'),
      order: 32
    })
  
    this.lib.TutorialManager.addAction({
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle .add-button.ValidationButton:visible:first')
      },
      content: this.$t('Click "ADD" to save it.'),
      order: 34,
      afterClick: () => {
        this.lib.AnnotationPanel.hide()
      }
    })
  }
  
}