export default function (StepModule) {
  StepModule.methods.init = async function () {
    this.stepData = await this.lib.AxiosHelper.get('/admin/UserDashboard/step', {
        stepName: this.stepName,
        webpageID: this.$route.params.webpageID,
        userID: this.$route.params.userID,
      })
      
      //console.log(this.stepData)
      
      this.toc.refresh()
  }
}