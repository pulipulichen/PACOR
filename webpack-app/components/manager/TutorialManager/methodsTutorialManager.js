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
      console.log('@DEBUG onlyShowTutorialOrder: ' + this.status.readingConfig.debug.onlyShowTutorialOrder + '. Exclude order: ' + action.order)
      return false
    }

    if (Array.isArray(this.actionLists[type]) === false) {
      this.actionLists[type] = []
    }

    this.actionLists[type].push(action)

    //console.log(this.actionLists)
  }
  
  TutorialManager.methods.start = function (type) {
    let actions = this.getActions(type)
    if (Array.isArray(actions) === false) {
      return false
    }
    //console.log(actions)
    this.guide = $.guide({
      vm: this,
      actions,
      complete: () => {
        this.isPlaying = false
        if (this.lib.RangyManager) {
          this.lib.RangyManager.selectionLock = false
        }
        
        if (!this.finishModal) {
          this.finishModal = $(this.$refs.FinishModal)
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