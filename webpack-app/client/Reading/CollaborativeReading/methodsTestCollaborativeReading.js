import $ from 'jquery'

export default function (CollaborativeReading) {


// --------------------------------
  CollaborativeReading.methods._testConfirmModal = async function () {
    console.log('_testSearch')
    await this.lib.VueHelper.sleep(1000)

    let r1 = await this.lib.ConfirmModal.show()
    console.log(r1)
    let r2 = await this.lib.ConfirmModal.show()
    console.log(r2)
  }

  CollaborativeReading.methods._testSearch = async function () {
    console.log('_testSearch')
    await this.lib.VueHelper.sleep(1000)

    if (!this.lib.AnnotationPanel) {
      setTimeout(() => {
        this._testSearch()
      }, 100)
      return null
    }

    this.status.search.keyword = "特別的"
    return

    // 先設定篩選條件
    this.lib.AnnotationPanel.findKeyword(this.status.search.keyword)

    // 再來顯示
    this.lib.AnnotationPanel.setAnchorPositions()
  }

  CollaborativeReading.methods._testAnnotationSingle = function () {
    console.log('_testAnnotationSingle')
    setTimeout(() => {
      $('.others-MainIdea:first').click()

      setTimeout(() => {
        $('.AnnotationFloatWidget .meta').click()
      }, 300)
    }, 500)
  }

  CollaborativeReading.methods._testAnnotationSingleManyComments = function () {
    console.log('_testAnnotationSingleManyComments')
    setTimeout(() => {
      if ($('.others-Clarified:first').length === 0) {
        this._testAnnotationSingleManyComments()
        return undefined
      }
      $('.others-Clarified:first').click()
      setTimeout(() => {
        $('.AnnotationFloatWidget .AnnotationTypeButton[title="已釐清"]:last').click()

        setTimeout(() => {
          //console.log($('.FilteredList .list .AnnotationItem:last .meta i').length)
          $('.FilteredList .list .AnnotationItem:last .meta i').click()

          // 測試搜尋
          //this.lib.AnnotationPanel.findKeyword('co')

        }, 1000)
      }, 300)
    }, 500)
  }
  
  CollaborativeReading.methods._testAnnotationSingleFocusComment = function () {
    console.log('_testAnnotationSingleFocusComment')
    setTimeout(() => {
      this.lib.AnnotationPanel.focusComment(19)
    }, 500)
  }
  
  CollaborativeReading.methods._testUserFilter = async function () {
    console.log('_testUserFilter')
    await this.lib.VueHelper.sleep(2000)

    //this.lib.UserFilter.show()
    $('.Navigation .peer-label:first').click()

    /*
     this.status.filter.focusUser = {
     id: 1
     }
     */
  }
  
  CollaborativeReading.methods._testTypeFilter = async function () {
    console.log('_testTypeFilter')
    await this.lib.VueHelper.sleep(1000)

    this.lib.AnnotationTypeFilter.show()

    /*
     this.status.filter.focusUser = {
     id: 1
     }
     */
  }
  
  CollaborativeReading.methods._testNotificationFullList = async function () {
    console.log('_testNotificationModal')
    await this.lib.VueHelper.sleep(1000)

    this.lib.NotificationManager.showFull()
  }
  
  CollaborativeReading.methods._testVerticalMenu = async function () {
    console.log('_testVerticalMenu')
    await this.lib.VueHelper.sleep(1000)

    console.log($('.Navigation .right.menu .ellipsis.icon').length)
    $('.Navigation .right.menu .ellipsis.icon').click()
  }
  
  CollaborativeReading.methods._testErrorAuth = async function () {
    
    await this.lib.VueHelper.sleep(1500)
    
    await this.lib.AxiosHelper.post('/admin/Development/errorAuth')
  }
  
  CollaborativeReading.methods._testTutorial = async function () {
    
    await this.lib.VueHelper.sleep(3000)
    
    this.lib.TutorialManager.start()
  }
  
  CollaborativeReading.methods._testTutorialShowClick = async function () {
    
    await this.lib.VueHelper.sleep(1000)
    
    let icon = {
      top: window.innerHeight - 40,
      left: window.innerWidth - 50,
      width: 10,
      height: 10
    }
    await this.lib.TutorialManager.showClick(icon)
  }
  
  

}