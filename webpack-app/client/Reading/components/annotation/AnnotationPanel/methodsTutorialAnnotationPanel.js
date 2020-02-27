import $ from 'jquery'

export default function (AnnotationPanel) {
  
  AnnotationPanel.methods.setupTutorial = function () {
    if (this.lib.auth.enableCollaboration) {
      this.setupTutorialCollaborativeReading()
    }
    else {
      this.setupTutorialIndividualReading()
    }
  }
  
  AnnotationPanel.methods.setupTutorialCollaborativeReading = function () {
    this.lib.TutorialManager.addAction({
      //backgroundFadeOut: true,
      beforeCallback: async () => {
        // 總之隨機塞一個標註進來吧
        
      },
      element: () => {
        // 顯示討論區的部分
        return $(this.$refs.panel).find('.AnnotationDiscussion:visible:first')
      },
      content: this.$t('You can give a comment to any annotation.'),
      order: 31
    })
  }
    
  AnnotationPanel.methods.setupTutorialIndividualReading = function () {
    
    this.lib.TutorialManager.addAction({
      //backgroundFadeOut: true,
      element: () => {
        return this.$refs.panel
      },
      content: this.$t('You can add note for the annotation.'),
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