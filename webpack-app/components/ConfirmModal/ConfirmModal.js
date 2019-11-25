let ConfirmModel = {
  props: ['lib', 'status', 'config'
    , 'icon', 'title', 'message'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      modal: null
    }
  },
//  components: {
//  },
  computed: {
    computedActionsClassList () {
      if (this.isLeftHanded) {
        return 'left-handed'
      }
    },
    isLeftHanded () {
      return this.status.preference.leftHanded
    }
  },
//  watch: {
//  },
//  mounted() {
//  },
  methods: {
    show: function () {
      return new Promise((resolve, reject) => {
        if (!this.modal) {
          this.modal = $(this.$refs.modal)
        }
        
        let hasBeenReturned = false
        this.modal.modal({
            onHide () {
              if (hasBeenReturned === false) {
                resolve(false)
              }
            },
            onApprove () {
              resolve(true)
              hasBeenReturned = true
              //console.log('onApprove', result)
            },
            onDeny () {
              resolve(false)
              hasBeenReturned = true
              //console.log('onDeny', result)
            },
          }).modal('show')
      })
    },
    hide () {
      this.modal('hide')
    }
  } // methods
}

export default ConfirmModel