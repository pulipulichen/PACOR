import Module from './../BaseModule/BaseModule.js'

Module.data = function () {    
    this.$i18n.locale = this.config.locale
    return {
      stepName: 'PostRecall'
    }
}
export default Module