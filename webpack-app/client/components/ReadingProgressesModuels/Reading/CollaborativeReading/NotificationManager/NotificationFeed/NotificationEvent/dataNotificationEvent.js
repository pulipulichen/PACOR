export default function (Event) {
  Event.data = function () {
    this.$i18n.locale = this.config.locale
    return {
    }
  }
}