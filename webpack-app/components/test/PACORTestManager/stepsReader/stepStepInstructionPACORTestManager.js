import $ from 'jquery'

export default function (PACORTestManager) {
  
  PACORTestManager.methods.confirmInstructionMessage = async function () {
    await this.sleep(5000)
    
    await this.waitForElementVisibleClick('.ui.modal.InstructionMessage .actions > .button.start-tutorial', {
      timeout: 60 * 1000,
      errorMessage: '是不是傳送給end花太多時間了？'
    })
    
    await this.sleep(3000)
    let bg = $('.jquery-guide-bg:visible')
    
    while (bg.length > 0) {
      console.log('等待導覽結束...')
      await this.waitForElementHidden('.jquery-guide-bg')
      await this.sleep(5000)
      bg = $('.jquery-guide-bg:visible')
    }
    
    //await this.waitForElementVisibleClick('.finish-modal')
    
    await this.sleep(5000)
  }
}