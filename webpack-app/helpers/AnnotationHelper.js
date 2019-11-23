/**
 * 跟標註有關的各種小工具
 * @type Object
 */
let AnnotationHelper = {
  status: null,
  
  setStatus (status) {
    this.status = status
    return this
  },
  note (annotation, type, note) {
    if (typeof(type) === 'object') {
      //console.log(type, typeof(type))
      Object.keys(type).forEach(t => {
        let n = type[t]
        this.note(annotation, t, n)
      })
      return undefined
    }
    
    let found = false
    if (!annotation.notes) {
      annotation.notes = [{
          type: type,
          note: note
      }]
    return annotation
    }
    
    annotation.notes.forEach(n => {
      if (n.type === type) {
        n.note = note
        found = true
      }
    })
    
    if (!found) {
      annotation.notes.push({
          type: type,
          note: note
      })
    }
    
    return annotation
  },
  
  highlightType (annotation) {
    let type = annotation.type
    if (annotation.user_id === this.status.userID) {
      type = 'my-' + type
    }
    else {
      type = 'others-' + type
    }
    return type
  },
  
  isEditable: function (annotation) {
    //console.log(annotation)
    if (!annotation 
            || typeof (annotation.id) !== 'number'
            || typeof (annotation.user_id) !== 'number') {
      return true
    }

    if (['domain_admin', 'global_admin'].indexOf(this.status.role) > -1) {
      return true
    }

    return (annotation.user_id === this.status.userID)
  },
  /**
   * 加上整體環境的過濾器，用於找人和找標註類型
   * @param {Object} data 傳送給伺服器用於查詢用的資料
   * @returns {undefined}
   */
  filter: function (data) {
    if (typeof(this.status.filter.findType) === 'string') {
      data.findType = this.status.filter.findType
    }
    if (typeof(this.status.filter.findUser) !== null 
            && typeof(this.status.filter.findUser.id) === 'number') {
      data.findUserID = this.status.filter.findUser.id
    }
  }
}

export default AnnotationHelper