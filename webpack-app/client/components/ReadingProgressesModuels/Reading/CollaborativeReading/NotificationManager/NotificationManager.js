import $ from 'jquery'

let NotificationManager = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      bell: null
    }
  },
  components: {
  },
  computed: {
    notificationCount () {
      return this.status.notificationUnreadCount
    },
    computedBellClassList () {
      if (this.notificationCount === 0) {
        return 'disabled'
      }
    }
  },
  watch: {
  },
  mounted() {
    setTimeout(() => {
      this.initPopup()
    }, 1000)
    
  },
  methods: {
    initPopup () {
      
//      let list = $(`<div class="list ui popup">
//    列表
//  </div>`).appendTo('.non-invasive-web-style-framework:first')
      let list = this.$refs.list
      
      $(this.$refs.icon)
        .popup({
          popup: list,
          inline     : true,
          hoverable  : true,
          on    : 'click'
      })
      
      return
      
      this.bell = $(this.$refs.bell)
      $('#bell').popup({
          inline     : true,
          hoverable  : true,
          //on    : 'click'
      })
      
      return
      this.list = $(`<div ref="list">
    列表
  </div>`).appendTo('body')
      this.bell.popup({
        //popup : this.list,
        //on    : 'click'
      })
    },
    show () {
      //throw new Error('show')
    }
  } // methods
}

export default NotificationManager