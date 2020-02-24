export default function (Questionnaire) {
  Questionnaire.mounted = async function () {
    //throw new Error('test 45454545454545454')
    
    //console.log(this.lib.auth.currentStepConfig.countdownAtStart)

    this.initLog()
    
    while (!this.$refs.Modal) {
      await this.lib.VueHelper.sleep(100)
    }
    
    this.$refs.Modal.show(() => {
      this.initSearch()
      this.status.progress.initComponents = true
      
      //console.log(this.lib.auth.currentStepConfig.countdownAtStart)
      if (this.lib.auth.currentStepConfig.countdownAtStart === true) {
        setTimeout(() => {
          this.persist()
        }, 1000)
      }
    })
  }
}