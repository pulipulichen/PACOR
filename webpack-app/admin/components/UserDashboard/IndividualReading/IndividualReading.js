import Module from './../BaseMoudle/BaseMoudle.js'

Module.data = function () {    
    this.$i18n.locale = this.config.locale
    return {
      stepName: 'IndividualReading'
    }
}
export default Module