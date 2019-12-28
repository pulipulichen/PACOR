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
    if (this.status.filter.focusUser !== null 
            && typeof(this.status.filter.focusUser.id) === 'number') {
      data.focusUserID = this.status.filter.focusUser.id
    }
  },
  validate: function (annotation) {
    if (!annotation) {
      throw new Error('annotation is undefinded')
    }
    
    if (Array.isArray(annotation.anchorPositions) === false
            || annotation.anchorPositions.length === 0) {
      throw new Error(`Annotation's anchor positions are required. \n`
            + JSON.stringify(annotation, null, 2))
    }
    
    let pos = annotation.anchorPositions[0]
    if (pos.type === 'textContent'
            && (typeof(pos.start_pos) !== 'number' || typeof(pos.end_pos) !== 'number') ) {
      throw new Error(`Start pos and end pos of anchor positions are required. \n` 
        + JSON.stringify(annotation, null, 2))
    }
  },
  autoComplete (annotation) {
    if (!annotation.user_id) {
      annotation.user_id = this.status.userID
    }
    
    if (!annotation.user) {
      annotation.user = {
        id: this.status.userID,
        username: this.status.username,
        displayName: this.status.displayName,
        avatar_url: this.status.avatar
      }
      
      //console.log(annotation.user)
    }
    
    if (annotation.id && !annotation.updated_at_unixms) {
      annotation.updated_at_unixms = (new Date()).getTime()
    }
  },
  isPublicSectionAnnotation (annotation) {
    return (annotation.id 
              && annotation.anchorPositions
              && annotation.anchorPositions[0]
              && annotation.anchorPositions[0].type === 'section')
  }
}

export default AnnotationHelper