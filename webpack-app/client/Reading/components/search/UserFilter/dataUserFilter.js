export default function (UserFilter) {
  UserFilter.data = function () {
    this.$i18n.locale = this.config.locale
    
    let localStorageKey = 'UserFilter.' + this.status.userID
    let hasReadTutorial = (localStorage.getItem(localStorageKey) !== null)
    
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
      },
      hasReadTutorial,
      localStorageKey
    }
  }
}