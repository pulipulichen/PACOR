import $ from 'jquery'

export default function (NavigationItems) {
  NavigationItems.methods.getMenu = function () {
    if (!this.menu
            && this.$refs.nav) {
      this.menu = $(this.$refs.nav.$refs.Menu)
    }
    return this.menu
  }
  
  NavigationItems.methods.getSideMenu = function () {
    if (!this.sideMenu
            && this.$refs.nav) {
      this.sideMenu = $(this.$refs.nav.$refs.SideMenu)
    }
    return this.sideMenu
  }

  NavigationItems.methods.setupTutorial = function () {
    
    this.lib.TutorialManager.addAction({
      element: () => {
        return this.$refs.nav.find('.NotificationIcon:visible:first')
      },
      content: this.$t(`You will get notifications from other readers here.`),
      order: 32
    })

    this.lib.TutorialManager.addAction({
      element: async () => {
        let element = this.$refs.nav.find('.UserFilter:visible:first')
        //console.log(element.length)
        if (element.length === 0) {
          let icon = {
            top: window.innerHeight - 30,
            left: window.innerWidth - 30,
          }
          await this.lib.TutorialManager.showClick(icon)
          
          await this.$refs.nav.showSideMenu()
//          let sideMenu = this.getSideMenu()
          element = this.$refs.nav.find('.UserFilter:visible:first')
        }
        return element
      },
      content: this.$t('You can select a peer and watch what he/she read.'),
      order: 33
    })

    this.lib.TutorialManager.addAction({
      element: () => {
        let element = this.$refs.nav.find('.AnnotationTypeFilter:visible:first')
        if (element.length === 0) {
//          let sideMenu = this.getSideMenu()
          element = this.$refs.nav.find('.AnnotationTypeFilter:visible:first')
        }
        return element
      },
      content: this.$t('You can choose a type of annotations to read.'),
      order: 34
    })

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
}