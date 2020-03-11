import $ from 'jquery'

export default function (AnnotationPanel) {
  
  AnnotationPanel.methods.setupTutorial = function () {
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
    
    this.lib.TutorialManager.addAction({
      //backgroundFadeOut: true,
      element: () => {
        return this.$refs.panel
      },
      content: this.$t('Please write down the reasons for choosing this keyword or other things you think of from this keyword. You can also insert pictures.'),
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
  
  
  AnnotationPanel.methods.setupLocalTutorial = function () {
    let tutorialKey = 'AnnotationPanel'
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return ($(this.$refs.panel).find('.AnnotationSingle:visible:first').length === 0)
      },
      element: () => {
        return $(this.$refs.panel).find('.List > .summary-information:visible:first')
      },
      content: this.$t('Here shows a summary of the list.'),
      order: 101,
    })
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return ($(this.$refs.panel).find('.List .search-input:visible:first input').length === 1)
      },
      element: () => {
        return $(this.$refs.panel).find('.List .search-input:visible:first input')
      },
      content: this.$t('You can filter the list with keywords.'),
      order: 102,
    })
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return ($(this.$refs.panel).find('.AnnotationItem:visible:first .meta').length === 1)
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationItem:visible:first .meta')
      },
      content: this.$t('Click here to see the detail of this annotation and give a suggestion.'),
      order: 103,
    })
    
    // ----------------------------------
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return ($(this.$refs.panel).find('.AnnotationSingle.display-mode .column.annotation-editor:visible:first').length === 1)
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle.display-mode .column.annotation-editor:visible:first')
      },
      content: this.$t('Here is the annotation wrote by other reader.'),
      order: 201,
    })
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return (($(this.$refs.panel).find('.AnnotationSingle.edit-mode .column.annotation-editor:visible:first').length === 1)
                && ($(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first').length === 1))
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle.edit-mode .column.annotation-editor:visible:first')
      },
      content: this.$t('Here is the annotation wrote by you. You can edit the annotation.'),
      order: 202,
    })
    
    // ------------------------------
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return (($(this.$refs.panel).find('.AnnotationSingle .AnnotaionInstruction:visible:first').length === 1)
                && ($(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first').length === 0))
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle .html-editor-container:visible:first')
      },
      content: this.$t('Write notes based on your reading strategy. Try to use notes to deepen your impression of the article.'),
      order: 205,
    })
    
    // ------------------------------
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return ($(this.$refs.panel).find('.AnnotationSingle .QuestionTemplate:visible:first').length === 1)
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle .QuestionTemplate:visible:first')
      },
      title: this.$t('Question Template'),
      content: this.$t('Try to build your question with templates.'),
      order: 212,
    })
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return ($(this.$refs.panel).find('.AnnotationSingle .ResourceSearch:visible:first').length === 1)
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle .ResourceSearch:visible:first')
      },
      title: this.$t('Finding Answer'),
      content: this.$t('You can use the "Finding Answer" tool to find the answer of the question.'),
      order: 213,
    })
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return (($(this.$refs.panel).find('.AnnotationSingle.edit-mode .AnnotaionInstruction:visible:first').length === 1)
                && ($(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first').length === 0))
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle.edit-mode .AnnotaionInstruction:visible:first')
      },
      content: this.$t('Click here to read the instruction of this annotation type.'),
      order: 218,
    })
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return (($(this.$refs.panel).find('.AnnotationSingle.edit-mode .AnnotaionInstruction:visible:first').length === 1)
                && ($(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first').length === 0))
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle.edit-mode .annotation-panel-buttons .ValidationButton:visible:first')
      },
      content: this.$t('Click "ADD" button to save it.'),
      order: 219,
    })
    
    // ------------------------
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return ($(this.$refs.panel).find('.AnnotationSingle .AnnotationInteractive .like.button:visible:first').length === 1)
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle .AnnotationInteractive .like.button:visible:first')
      },
      content: this.$t('If you like this annotation, click "Like" button.'),
      order: 221,
    })
    
    // ------------------------------
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return (($(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first').length === 1)
                && ($(this.$refs.panel).find('.AnnotationSingle.display-mode .column.annotation-editor:visible:first').length === 1))
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first')
      },
      content: this.$t('Try to give a suggestion for the reader.'),
      order: 231,
    })
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return (($(this.$refs.panel).find('.AnnotationSingle.edit-mode .AnnotaionInstruction:visible:first').length === 1)
                && ($(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first').length === 1))
      },
      beforeCallback: async () => {
        this.panelData.showDemoComment = true
        await this.lib.VueHelper.sleep(500)
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first')
      },
      content: this.$t(`You can see the suggestions from other reader.`),
      order: 241,
    })
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return (($(this.$refs.panel).find('.AnnotationSingle.edit-mode .AnnotaionInstruction:visible:first').length === 1)
                && ($(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first').length === 1)
                && (this.panelData.annotation.type === 'Confused' || this.panelData.annotation.type === 'Clarified'))
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first .demo-comment')
      },
      content: this.$t(`If you like other reader's suggestion, click "Like" to add the suggestion as your answer.`),
      afterClick: () => {
        if (this.panelData.annotation.type === 'Confused' || this.panelData.annotation.type === 'Clarified') {
          this.panelData.showDemoComment = false
        }
      },
      order: 243,
    })
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        //console.log(this.panelData.annotation.type)
        return (($(this.$refs.panel).find('.AnnotationSingle.edit-mode .AnnotaionInstruction:visible:first').length === 1)
                && ($(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first').length === 1)
                && (this.panelData.annotation.type !== 'Confused' && this.panelData.annotation.type !== 'Clarified'))
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first .demo-comment')
      },
      content: this.$t(`If you like other reader's suggestion, click "Like" to thanks him / her.`),
      afterClick: () => {
        if ((this.panelData.annotation.type !== 'Confused' && this.panelData.annotation.type !== 'Clarified')) {
          this.panelData.showDemoComment = false
        }
      },
      order: 242,
    })
  }
}