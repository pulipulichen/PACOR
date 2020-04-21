import $ from 'jquery'

let AdminModal = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    username () {
      if (!this.lib.auth) {
        return undefined
      }
      return this.lib.auth.username
    }
  },
  watch: {
  },
  mounted: function () {
    setTimeout(() => {
      //this.$refs.Modal.show()
    }, 3000)
    
    setTimeout(() => {
      this.registerHotKey()
    }, 1000)
  },
  methods: {
    registerHotKey () {
      //document.addEventListener('keydown', (event) => {
      $(window).keydown((event) => {
        //console.log(event)
        if(event.keyCode === 121 
                && event.altKey) {
        //if(event.keyCode === 121) {
          this.show()
        }
      })
    },
    show () {
      // 如果現在是Questionnaire階段，我們要先把Questionnaire的Modal關掉
      //console.log(this.lib.Main.$refs.StepComponent.$refs.Questionnaire)
      if (this.lib.Main.$refs.StepComponent.$refs.Questionnaire
              && this.lib.Main.$refs.StepComponent.$refs.Questionnaire.$refs.Modal) {
        this.lib.Main.$refs.StepComponent.$refs.Questionnaire.$refs.Modal.hide()
      }
      //console.log(this.lib.Main.$refs.StepComponent.$refs.Modal)
      
      this.$refs.Modal.show()
    },
    logout () {
      if (window.confirm(this.$t('Are you sure to logout?')) === false) {
        return false
      }
      
      this.lib.auth.logoutAndReload()
    },
    goToNextStep: async function () {
      if (window.confirm(this.$t('Are you sure to go to next step?')) === false) {
        return false
      }
      this.$refs.Modal.hide()
      
      if (this.lib.Main.$refs.StepComponent.$refs.Questionnaire) {
        this.lib.Main.$refs.StepComponent.$refs.Questionnaire.nextStep()
      }
      else {
        //console.log('直接下一階段')
        return await this.lib.auth.nextStep(false)
      }
    },
    backToFirstStep: async function () {
      if (window.confirm(this.$t('Are you sure to back to the first step?')) === false) {
        return false
      }
      await this.lib.auth.backToFirstStep()
    },
    backToPreviousStep: async function () {
      if (window.confirm(this.$t('Are you sure to back to previous step?')) === false) {
        return false
      }
      await this.lib.auth.backToPreviousStep()
    },
  } // methods
}

export default AdminModal