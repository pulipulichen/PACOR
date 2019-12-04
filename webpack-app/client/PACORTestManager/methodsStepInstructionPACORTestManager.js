import $ from 'jquery'

export default function (PACORTestManager) {
  
  PACORTestManager.methods.confirmInstructionMessage = async function () {
    await this.sleep(100)
    await this.waitForElementVisibleClick('.ui.modal.InstructionMessage .actions > .button:last', 3 * 1000)
    await this.sleep(100)
  }
}