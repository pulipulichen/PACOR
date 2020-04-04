import $ from 'jquery'

export default function (NavigationItems) {
//  NavigationItems.methods.getMenu = function () {
//    if (!this.menu
//            && this.$refs.nav) {
//      this.menu = $(this.$refs.nav.$refs.Menu)
//    }
//    return this.menu
//  }
//  
//  NavigationItems.methods.getSideMenu = function () {
//    if (!this.sideMenu
//            && this.$refs.nav) {
//      this.sideMenu = $(this.$refs.nav.$refs.SideMenu)
//    }
//    return this.sideMenu
//  }


  NavigationItems.methods.setupTutorial = async function () {
    //return console.log('@TEST')
    
    while (!this.$refs.nav) {
      await this.lib.VueHelper.sleep(100)
    }
    while (!this.lib.TutorialManager) {
      await this.lib.VueHelper.sleep(100)
    }
    
    // UserFilter
    this.lib.TutorialManager.addAction({
      enable: () => {
        return !this.$refs.nav.isCompactMode
      },
      element: async () => {
        let element = this.$refs.nav.find('.UserFilter:visible:first')
        return element
      },
      title: this.$t('Assisting Reader Tool'),
      content: this.$t('Select a reader, watch how he/she read the article, and give him/her suggestions.'),
      order: 31
    })
    
    /**
     * 標註類型選取器
     * 全螢幕版本
     */
    /*
    this.lib.TutorialManager.addAction({
      backgroundFadeOut: true,
      enable: () => {
        return false  // 20200327 不使用
        
        if (!this.lib.auth.featureEnable.AnnotationTypeFilter) {
          return false
        }
        
        return !this.$refs.nav.isCompactMode
      },
      beforeCallback: async () => {
        //console.log(this.$refs.AnnotationTypeFilter.$el)
        await this.lib.TutorialManager.showFixedClick(this.$refs.AnnotationTypeFilter.$el)
        await this.lib.VueHelper.sleep(500)
        await this.$refs.AnnotationTypeFilter.show(true)
        await this.lib.VueHelper.sleep(500)
      },
      element: () => {
        //console.log($('.ui.popup.visible:visible').length)
        return $('.ui.popup.visible:visible')
      },
      afterClick: () => {
        if (this.$refs.AnnotationTypeFilter) {
          this.$refs.AnnotationTypeFilter.hide()
        }
      },
      title: this.$t('Annotation Type Selector'),
      content: this.$t('Select an annotation type to watch how readers use it to read the article.'),
      order: 33
    })
     */

    // ---------------------------

    
    
    
    // ---------------------------
    
    
    
    this.lib.TutorialManager.addAction({
      enable: () => {
        return this.$refs.nav.isCompactMode
      },
      beforeCallback: async () => {
        if (this.$refs.nav.isCompactMode === false) {
          return false
        }
        await this.openSideMenu()
      },
      backgroundFadeOut: true,
      element: async () => {
        return this.$refs.nav.find('.UserFilter:visible:first')
      },
      content: this.$t('Select a reader, watch how he/she read the article, and give him/her suggestions.'),
      order: 35
    })

    /**
     * 標註篩選器，側邊欄版本
     */
    /*
    this.lib.TutorialManager.addAction({
      enable: () => {
        return false  // 20200327 不使用
        
        if (!this.lib.auth.featureEnable.AnnotationTypeFilter) {
          return false
        }
        
        return this.$refs.nav.isCompactMode
      },
      beforeCallback: async () => {
        if (this.$refs.nav.isCompactMode === false) {
          return false
        }
        await this.openSideMenu()
        await this.lib.VueHelper.sleep(500)
        
//        window.el = this.$refs.AnnotationTypeFilter.$el
//        await this.lib.TutorialManager.showClick(this.$refs.AnnotationTypeFilter.$el.getBoundingClientRect())
//        await this.lib.VueHelper.sleep(500)
        
//        await this.$refs.AnnotationTypeFilter.show(true)
//        await this.lib.VueHelper.sleep(500)
      },
      //backgroundFadeOut: true,
      element: async () => {
        let element = this.$refs.nav.find('.AnnotationTypeFilter:visible:first')
        return element
        
//        return $('.ui.popup.visible:visible')
      },
      afterClick: async () => {
        if (this.$refs.AnnotationTypeFilter) {
          await this.$refs.AnnotationTypeFilter.hide()
          await this.lib.VueHelper.sleep(500)
        }
      },
      content: this.$t('Select an annotation type to watch how readers use it to read the article.'),
      order: 36
    })
     */
    
    this.lib.TutorialManager.addAction({
      beforeCallback: async () => {
        if (this.$refs.nav.isCompactMode === true) {
          await this.$refs.nav.hideSideMenu()
          await this.lib.VueHelper.sleep(500)
        }
        //console.log('ok?')
//        window.el = this.$refs.AnnotationTypeFilter.$el
//        await this.lib.TutorialManager.showClick(this.$refs.AnnotationTypeFilter.$el.getBoundingClientRect())
//        await this.lib.VueHelper.sleep(500)
        
//        await this.$refs.AnnotationTypeFilter.show(true)
//        await this.lib.VueHelper.sleep(500)
      },
      element: () => {
        //return $('.NotificationIcon:visible:first')
        //console.log(this.$refs.nav.find('.NotificationIcon-wrapper:visible:first').length)
        return this.$refs.nav.find('.NotificationIcon-wrapper:visible:first')
      },
      //backgroundFadeOut: true,
      content: this.$t(`You will get notifications from other readers here.`),
      order: 38
    })
    
    
    // --------------------------

    this.lib.TutorialManager.addAction({
      //backgroundFadeOut: false,
      element: async () => {
        if (this.$refs.nav.sideMenuDisplay === true) {
          await this.$refs.nav.hideSideMenu()
        }
        //return this.$refs.DigitalCountdownTimer
        return this.$refs.nav.find('.DigitalCountdownTimer-wrapper:visible:first')
      },
      content: this.$t('Collaborative Reading will end at count to 0.'),
      order: 39
    })
  }
  
  // -------------------------------------
  
  NavigationItems.methods.openSideMenu = async function () {
    //console.log(this.$refs.nav.sideMenuDisplay)
    if (this.$refs.nav.sideMenuDisplay === true) {
      return undefined
    }
    
    let icon = {
      top: window.innerHeight - 40,
      left: window.innerWidth - 40,
      width: 10,
      height: 10
    }
    await this.lib.TutorialManager.showFixedClick(icon)

    await this.lib.VueHelper.sleep(500)
    await this.$refs.nav.showSideMenu()
  }
}