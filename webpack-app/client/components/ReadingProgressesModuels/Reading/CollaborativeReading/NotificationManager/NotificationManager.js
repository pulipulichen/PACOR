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
    this.initPopup()
  },
  methods: {
    initPopup () {
      this.bell = $(this.$refs.bell)
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