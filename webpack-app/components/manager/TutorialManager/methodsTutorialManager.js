import $ from 'jquery'

export default function (TutorialManager) {
  TutorialManager.methods.addAction = function (type, action) {
    if (typeof(type) !== 'string') {
      action = type
      type = this.defaultType
    }
    //console.log(this.defaultType)
    
    if (typeof(this.status.readingConfig.debug.onlyShowTutorialOrder) === 'number' 
            && action.order !== this.status.readingConfig.debug.onlyShowTutorialOrder) {
      console.log('@DEBUG onlyShowTutorialOrder: ' + this.status.readingConfig.debug.onlyShowTutorialOrder 
              + '. Exclude order: ' + action.order)
      return false
    }
    else if (Array.isArray(this.status.readingConfig.debug.onlyShowTutorialOrder)
            && this.status.readingConfig.debug.onlyShowTutorialOrder.indexOf(action.order) === -1) {
      console.log('@DEBUG onlyShowTutorialOrder: ' + this.status.readingConfig.debug.onlyShowTutorialOrder.join(',') 
              + '. Exclude order: ' + action.order)
      return false
    }
    
    // 在這裡處理timeout的問題
    if (typeof(action.timeout) !== 'number') {
      let timeout = this.status.readingConfig.readingProgressModules.reading.tutorialDefaultTimeout
      let content = action.content
      let contentWordCount = this.lib.StringHelper.countWords(content)
      if (contentWordCount > 40) {
        timeout = timeout * 2
      }
      else if (contentWordCount > 20) {
        timeout = timeout * 1.5
      }
      
      // 測試用
      timeout = 1000
      
      action.timeout = timeout
    }

    if (Array.isArray(this.actionLists[type]) === false) {
      this.actionLists[type] = []
    }

    this.actionLists[type].push(action)

    //console.log(this.actionLists)
  }
  
  TutorialManager.methods.start = function (type, showFinishModel, callback) {
    let actions = this.getActions(type)
    if (Array.isArray(actions) === false || this.isPlaying === true) {
      return false
    }
    
    //console.log(actions)
    this.guide = $.guide({
      vm: this,
      enableTimeout: this.enableTimeout,
      actions,
      complete: () => {
        if (typeof(callback) === 'function') {
          callback()
        }
        
        this.isPlaying = false
        if (this.lib.RangyManager) {
          this.lib.RangyManager.selectionLock = false
        }
        
        if (!this.finishModal) {
          this.finishModal = $(this.$refs.FinishModal)
        }
        
        if ($('.ui.dimmer.modals.visible.active').length > 0) {
          console.log('Skip finish modal becase of other modal is opened.')
          return false
        }
        
        if (showFinishModel === false) {
          return false
        }
        
        this.finishModal.modal({
          dimmerSettings: {
            dimmerName: 'tutorial-modal'
          }
        }).modal('show')
        
        setTimeout(() => {
          this.hideFinishModal()
        }, 3000)
        
      }
    });
    this.isPlaying = true
    //console.log(this.guide)
  }
  
  TutorialManager.methods.hideFinishModal = function () {
    this.finishModal.modal('hide')
  }
  
  TutorialManager.methods.getActions = function (type) {
    if (typeof(type) !== 'string') {
      type = this.defaultType
    }

    let list = this.actionLists[type]
    if (Array.isArray(list) === false) {
      return undefined
    }

    // ---------------------

    list = list.map((action) => {
      if (typeof(action) === 'function') {
        action = action()
      }

      if (!action || typeof(action) !== 'object') {
        action = {}
      }

      //console.log(action)

//        if (action.element) {
////          if (action && !action.element) {
////            //throw new Error('Element is not found', action)
////          }
//          
//          if (typeof(action.element.$el) === 'object') {
//            action.element = action.element.$el
//          }
//          action.element = $(action.element)
//        }

      if (typeof(action.order) !== 'number') {
        action.order = 999
      }

      return action
    })

    // ---------------------

    list.sort(function (a, b) {
      return a.order - b.order
    })
    return list
  }
  TutorialManager.methods.stop = function () {
    if (!this.guide) {
      return false
    }
    //$.guide;
    this.guide.exit()
  }

  // -------------------------------------------------

  
}