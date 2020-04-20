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
      this.lib.auth.logoutAndReload()
    }
  } // methods
}

export default AdminModal