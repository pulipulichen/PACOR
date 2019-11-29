import props from '../propsNotificationEvent.js'
import computed from '../computedNotificationEvent.js'
import methods from '../methodsNotificationEvent.js'

let EventAnnotationRate = {
  props,
  data: function () {
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  computed: {
    ...computed
  },
  methods: {
    ...methods
  }
}

EventAnnotationRate.computed.action = function () {
  return this.$t('can be assisted now')
}

EventAnnotationRate.methods.read = function () {
  
  console.log(this.notification.triggerUser)
  this.lib.UserFilter.selectUser(this.notification.triggerUser.id)
  
  this.$emit('read')
}

export default EventAnnotationRate