import $ from 'jquery'

export default function (AnnotationPanel) {
  let tutorialKey = 'AnnotationPanel'
  
  AnnotationPanel.methods.startLocalTutorial = function () {
    this.lib.TutorialManager.start(tutorialKey, false, () => {
      localStorage.setItem(this.currentLocalTutorialKey, 1)
    })
  }
  
  let autoStartTimer
  AnnotationPanel.methods.checkStartLocalTutorial = function () {
    //console.log(this.hasReadLocalTutorial, this.currentLocalTutorialKey)
    if (this.hasReadLocalTutorial === false) {
      if (autoStartTimer) {
        clearTimeout(autoStartTimer)
      }
      autoStartTimer = setTimeout(() => {
        this.startLocalTutorial()
      }, 1000)
    }
  }
  
  AnnotationPanel.methods.setupLocalTutorial = function () {
    this.setupLocalTutorialList()
    this.setupLocalTutorialSingle()
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      enable: () => {
        return ($(this.$refs.LocalTutorialStart).length === 1)
      },
      element: () => {
        return $(this.$refs.LocalTutorialStart)
      },
      content: this.$t('You can watch tutorial again from here.'),
      order: 999,
    })
  }
  
  AnnotationPanel.methods.setupLocalTutorialList = function () {
    
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
  }
  
  AnnotationPanel.methods.setupLocalTutorialSingle = function () {
    
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
                && (this.panelData.annotation && (this.panelData.annotation.type === 'Confused' || this.panelData.annotation.type === 'Clarified')))
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first .demo-comment')
      },
      content: this.$t(`If you like other reader's suggestion, click "Like" to add the suggestion as your answer.`),
      afterClick: () => {
        if (this.panelData.annotation && 
                (this.panelData.annotation.type === 'Confused' || this.panelData.annotation.type === 'Clarified')) {
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
                && (this.panelData.annotation && this.panelData.annotation.type !== 'Confused' && this.panelData.annotation.type !== 'Clarified'))
      },
      element: () => {
        return $(this.$refs.panel).find('.AnnotationSingle .column.annotation-discussion:visible:first .demo-comment')
      },
      content: this.$t(`If you like other reader's suggestion, click "Like" to thanks him / her.`),
      afterClick: () => {
        if ((this.panelData.annotation 
                && this.panelData.annotation.type !== 'Confused' 
                && this.panelData.annotation.type !== 'Clarified')) {
          this.panelData.showDemoComment = false
        }
      },
      order: 242,
    })
  }
}