export default function (UserFilter) {
  UserFilter.data = function () {
    this.$i18n.locale = this.config.locale
    return {
      filterData: {
        users: [],
        allAnnotationTypes: [],
        selectUser: null,
        tempSelectUserID: null,
        
        chart: {
          userJSON: null,

          allJSON: null,

          othersJSONMap: null,
        },
      }
    }
  }
}