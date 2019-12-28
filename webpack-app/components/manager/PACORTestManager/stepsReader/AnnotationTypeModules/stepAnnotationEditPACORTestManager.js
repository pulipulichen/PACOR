import $ from 'jquery'

export default function (PACORTestManager) {
  
  PACORTestManager.methods.editAnnotation = async function () {
    let highlights = await this.waitForElementVisible('[data-pacor-highlight][class*="my-"]', {
      timeout: 3000
    })
    
    let highlight = this.getRandomElement(highlights)
    highlight.click()
    
    await this.waitForElementVisibleClick('.AnnotationFloatWidget .list-button', {
      timeout: 3000
    })
    
    await this.waitForElementVisibleClick('.MainList .AnnotationItem.my-annotation:first .meta', {
      timeout: 3000
    })
    
  }
}