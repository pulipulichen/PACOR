import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.selectAnnotationFromSearch = async function (excludedMyAnnotation) {
    if ($('.AnnotationSingle:visible').length > 0) {
      // 已經顯示了，不用執行這個
      return true
    }
    
    await this.waitForElementVisibleClick('.SearchManager .ui.icon.button')
    
    await this.sleep(1000)
    
    if ($('.MainList.List:visible').length > 0) {
      if (excludedMyAnnotation === true) {
        let annotationItemCount = $('.MainList.List:visible .AnnotationItem:not(.my-annotation)').length
        let i = this.getRandomInt(annotationItemCount)
        await this.waitForElementVisibleClick('.MainList.List:visible .AnnotationItem:not(.my-annotation):eq(' + i + ')')
      }
      else {
        let annotationItemCount = $('.MainList.List:visible .AnnotationItem').length
        let i = this.getRandomInt(annotationItemCount)
        await this.waitForElementVisibleClick('.MainList.List:visible .AnnotationItem:eq(' + i + ')')
      }
      await this.sleep(1000)
    }
    return true
  }
  
  PACORTestManager.methods.closeSelectAnnotation = async function () {
    if ($('.AnnotationPanel .main-segment:visible').length === 0) {
      // 已經隱藏了，不用執行這個
      return true
    }
    
    await this.waitForElementVisibleClick('.AnnotationPanel .label-buttons .close.icon')
  }
    
  PACORTestManager.methods.addAndEditComment = async function () {
    await this.selectAnnotationFromSearch()
    
    await this.typeInput('.AnnotationDiscussionInput .ui.input input[type="text"]', this.createRandomText())
    await this.sleep(500)
    
    await this.waitForElementVisibleClick('.AnnotationDiscussionInput .right-column button:not(.disabled)')
    
    // ----------------
    // 然後編輯comment
    
    await this.sleep(1000)
    await this.waitForElementVisibleClick('.AnnotationDiscussionList .AnnotationComment button.edit-button')
    await this.sleep(500)
    
    await this.typeInput('.AnnotationDiscussionInput .ui.input input[type="text"]', this.createRandomText())
    await this.waitForElementVisibleClick('.AnnotationDiscussionInput .right-column button:not(.disabled)')
    
    await this.closeSelectAnnotation()
  }
  
  PACORTestManager.methods.likeAnnotation = async function () {
    await this.selectAnnotationFromSearch(true)
    
    if ($('.annotation-editor .AnnotationInteractive button.like:visible').length > 0) {
      await this.waitForElementVisibleClick('.annotation-editor .AnnotationInteractive button.like')
      await this.sleep(500)
      await this.waitForElementVisibleClick('.annotation-editor .AnnotationInteractive button.like.green')
      await this.sleep(500)
    }
    
    await this.closeSelectAnnotation()
  }
}