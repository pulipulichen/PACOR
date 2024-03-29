import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.selectAnnotationFromSearch = async function (excludedMyAnnotation) {
    if ($('.AnnotationSingle:visible').length > 0) {
      // 已經顯示了，不用執行這個
      return true
    }
    
    if ($('.AnnotationFloatWidget.show.is-fixed:visible').length > 0) {
      // 已經顯示了，不用執行這個
      await this.waitForElementVisibleClick('.AnnotationFloatWidget.show.is-fixed:visible .close.icon')
    }
    
    console.log('從搜尋來開啟標註...')
    if ($('.Navigation .SearchManager:visible .ui.icon.button:visible').length ===  0) {
      //console.log('找不到搜尋按鈕，打開側邊欄')
      await this.waitForElementVisibleClick('.Navigation .show-side-menu-item')
      await this.sleep(1000)
      await this.waitForElementVisibleClick('.vertical-menu .SearchManager:visible .ui.icon.button')
    }
    else {
      await this.waitForElementVisibleClick('.Navigation .SearchManager .ui.icon.button')
    }
    
    // 這邊要先確認是否有在導覽中
    await this.waitTutorial()
      
    if ($('.AnnotationPanel .MainList.List:visible').length > 0) {
      //console.log('似乎是列表')
      
      if (excludedMyAnnotation === true) {
        let annotationItemCount = $('.AnnotationPanel .MainList.List:visible .AnnotationItem:not(.my-annotation)').length
        if (annotationItemCount === 0) {
          return false
        }
        let i = this.getRandomInt(annotationItemCount - 1)
        
        //console.log('點選標註 i = ' + i)
        await this.waitForElementVisibleClick('.AnnotationPanel .MainList.List:visible .AnnotationItem:not(.my-annotation):eq(' + i + ') .meta .right.angle.icon')
      }
      else {
        
        let annotationItemCount = $('.AnnotationPanel .MainList.List:visible .AnnotationItem').length
        let i = this.getRandomInt(annotationItemCount - 1)
        //console.log('點選標註 i = ' + i)
        await this.waitForElementVisibleClick('.AnnotationPanel .MainList.List:visible .AnnotationItem:eq(' + i + ') .meta .right.angle.icon')
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
    
    console.log('關閉AnnotationPanel')
    await this.waitForElementVisibleClick('.AnnotationPanel .label-buttons .close.icon')
    
    await this.sleep(1000)
    
    if ($('.AnnotationPanel .main-segment:visible').length > 0) {
      // 已經隱藏了，不用執行這個
      throw new Error('沒有成功關閉AnnotationPanel')
    }
  }
  
  PACORTestManager.methods.addAndEditComments = async function (min, max) {
    for (let i = 0; i < this.getRandomInt(min, max); i++) {
      await this.addAndEditComment(i)
      await this.sleep(1000)
    }
  }
    
  PACORTestManager.methods.addAndEditComment = async function (i) {
    await this.selectAnnotationFromSearch()
    
    // 這邊要先確認是否有在導覽中
    await this.waitTutorial()
    
    console.log('建議留言 i=' + i)
    await this.typeInput('.AnnotationDiscussionInput .ui.input input[type="text"]', this.createRandomText())
    await this.sleep(500)
    
    await this.waitForElementVisibleClick('.AnnotationDiscussionInput .right-column button:not(.disabled):first')
    
    // ----------------
    // 然後編輯comment
    
    //await this.sleep(1000 * 10)
    
    console.log('編輯建議')
    await this.sleep(1000)
    await this.waitForElementVisibleClick('.AnnotationDiscussionList .AnnotationComment button.edit-button')
    await this.sleep(500)
    //console.log('已經成功加上編輯')
    await this.typeInput('.AnnotationDiscussionInput .ui.input input[type="text"]', this.createRandomText())
    //console.log('修改了文字')
    await this.waitForElementVisibleClick('.AnnotationDiscussionInput .right-column button:visible:not(.disabled):first')
    //console.log('完成編輯')
    await this.sleep(1000)
    await this.closeSelectAnnotation()
  }
  
  PACORTestManager.methods.likeAnnotation = async function () {
    await this.selectAnnotationFromSearch(true)
    
    // 這邊要先確認是否有在導覽中
    await this.waitTutorial()
    
    if ($('.AnnotationPanel .annotation-editor:visible .AnnotationInteractive button.like:visible').length > 0) {
      console.log('喜愛標註')
      await this.waitForElementVisibleClick('.AnnotationPanel .annotation-editor .AnnotationInteractive button.like')
      await this.sleep(500)
      await this.waitForElementVisibleClick('.AnnotationPanel .annotation-editor .AnnotationInteractive button.like.green')
      await this.sleep(500)
    }
    
    await this.closeSelectAnnotation()
  }
}