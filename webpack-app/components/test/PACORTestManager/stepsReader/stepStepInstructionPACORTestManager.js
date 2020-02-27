import $ from 'jquery'

export default function (PACORTestManager) {
  
  PACORTestManager.methods.confirmInstructionMessage = async function () {
    //await this.sleep(100)
    await this.waitForElementVisibleClick('.ui.modal.InstructionMessage .actions > .button.start-tutorial', {
      timeout: 60 * 1000,
      errorMessage: '是不是傳送給end花太多時間了？'
    })
    
    await this.sleep(2000)
    let bg = $('.jquery-guide-bg:visible')
    while (bg.length > 0) {
      await this.waitForElementVisibleClick(bg)
      await this.sleep(2000)
    }
    
    await this.sleep(100)
  }
}