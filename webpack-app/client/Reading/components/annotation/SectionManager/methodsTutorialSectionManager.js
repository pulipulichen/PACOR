import $ from 'jquery'

export default function (SectionManager) {
  SectionManager.methods.setupTutorial = function () {

    if (this.lib.auth.isEnableCollaboration) {
      this.setupTutorialCollaborativeReading()
    } else {
      this.setupTutorialIndividualReading()
    }
  }

  SectionManager.methods.setupTutorialCollaborativeReading = function () {
    this.lib.TutorialManager.addAction(() => {
      let item = $(`[data-section-id].SectionPanel .AnnotationItem[data-user-id!="${this.status.userID}"]:visible:first`)
      let panel
      if (item.length > 0) {
        panel = item.parents('.SectionPanel:first')
      } else {
        panel = $(`[data-section-id].SectionPanel:visible:first`)
      }

      return {
        backgroundFadeOut: true,
        element: panel,
        content: this.$t(`You can see others' section main ideas.`),
        scroll: 'start',
        order: 21
      }
    })
  }

  SectionManager.methods.setupTutorialIndividualReading = function () {
    this.lib.TutorialManager.addAction({
      backgroundFadeOut: true,
      element: () => {
        this.lib.AnnotationPanel.hide()
        let panel = $(`[data-section-id].SectionPanel:visible:first`)
        return panel
      },
      content: this.$t(`After reading a section of the article, you have to finish the section checklist.`),
      scroll: 'start',
      order: 51
    })

    this.lib.TutorialManager.addAction({
      backgroundFadeOut: true,
      element: () => {
        let panel = $(`[data-section-id].SectionPanel:visible:last`)
        return panel
      },
      content: this.$t(`When you finish all section checklists, you will go to next step.`),
      scroll: 'start',
      order: 52
    })
  }
}