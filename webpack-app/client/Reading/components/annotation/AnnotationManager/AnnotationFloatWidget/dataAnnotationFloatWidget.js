export default function () {
  this.$i18n.locale = this.config.locale
  return {
    anchorPositions: null,
    triggerEvent: null,
    isFixed: false,
    isFixedMouseout: false,

    annotation: null,
    annotationCount: 0,
    users: [],
    userCount: 0,
    types: [],

    lastPosition: null,
  }
}