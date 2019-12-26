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

  NavigationItems.methods.setupTutorial = function () {
    //return console.log('@TEST')
    
    this.lib.TutorialManager.addAction({
      element: () => {
        return this.$refs.nav.find('.NotificationIcon:visible:first')
      },
      content: this.$t(`You will get notifications from other readers here.`),
      order: 32
    })
    
    // ---------------------------

    this.lib.TutorialManager.addAction({
      enable: () => {
        return !this.$refs.nav.isCompactMode
      },
      element: async () => {
        let element = this.$refs.nav.find('.UserFilter:visible:first')
        return element
      },
      content: this.$t('You can select a peer and watch what he/she read.'),
      order: 33
    })

    this.lib.TutorialManager.addAction({
      enable: () => {
        return !this.$refs.nav.isCompactMode
      },
      element: () => {
        let element = this.$refs.nav.find('.AnnotationTypeFilter:visible:first')
        return element
      },
      content: this.$t('You can choose a type of annotations to read.'),
      order: 34
    })
    
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
      content: this.$t('You can select a peer and watch what he/she read.'),
      order: 35
    })

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
      //backgroundFadeOut: true,
      element: async () => {
        let element = this.$refs.nav.find('.AnnotationTypeFilter:visible:first')
        return element
      },
      content: this.$t('You can choose a type of annotations to read.'),
      order: 36
    })
    
    // --------------------------

    this.lib.TutorialManager.addAction({
      element: async () => {
        if (this.$refs.nav.sideMenuDisplay === true) {
          await this.$refs.nav.hideSideMenu()
        }
        return this.$refs.DigitalCountdownTimer
      },
      content: this.$t('Collaborative Reading will end at count to 0.'),
      order: 39
    })
  }
  
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
    await this.lib.TutorialManager.showClick(icon)

    await this.lib.VueHelper.sleep(500)
    await this.$refs.nav.showSideMenu()
  }
}