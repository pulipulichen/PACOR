export default function (CompactNavigation) {
  CompactNavigation.methods.setupTutorial = function () {
    if (this.lib.auth.currentStepConfig.goToNextStepOnChecklistComplete === false) {
      this.lib.TutorialManager.addAction({
        //backgroundFadeOut: true,
        element: () => {
          return this.$refs.SimpleCountdownTimer
        },
        content: this.$t(`When countdown to 0, you will go to next step.`),
        //scroll: 'start',
        order: 99
      })
    }
  }
}