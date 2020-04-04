import $ from 'jquery'

let tutorialKey = 'UserFilter'

export default function (UserFilter) {
  UserFilter.methods.setupTutorial = async function () {
    while (!this.lib.TutorialManager) {
      await this.lib.VueHelper.sleep(100)
    }
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      element: async () => {
        let element = this.$refs.PeerList.$el
        return element
      },
      content: this.$t('Select a peer to watch how his/her read article. And give him/her suggestions.'),
      order: 1
    })
    
    //return console.log('@TEST only a tutorial')
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      element: async () => {
        let element = this.$refs.UserChart.$el
        return element
      },
      content: this.$t('You can see the different of keywords between you can others.'),
      order: 2
    })
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      element: async () => {
        let element = $(this.$refs.UserChart.$el).find('.jqcloud-wrapper .jqcloud-container .jqcloud-word[data-color="#690"]:first')
        return element
      },
      content: this.$t('Green words means you and others use the same keywords.'),
      order: 3
    })
    
    this.lib.TutorialManager.addAction(tutorialKey, {
      element: async () => {
        let element = $(this.$refs.Modal.$el).find('.tutorial-start:first')
        return element
      },
      content: this.$t('You can watch tutorial again from here.'),
      order: 999
    })
    
  }
  
  UserFilter.methods.checkTutorialAutoStart = function () {
    if (this.hasReadTutorial === false) {
      setTimeout(() => {
        this.startUserFilterTutorial()
      }, 1000)
    }
  }
    
  UserFilter.methods.startUserFilterTutorial = async function () {
    this.hasReadTutorial = true
    localStorage.setItem(this.localStorageKey, 1)
    
    while (!this.lib.TutorialManager) {
      await this.lib.VueHelper.sleep(100)
    }
    this.lib.TutorialManager.start(tutorialKey)
  }
}