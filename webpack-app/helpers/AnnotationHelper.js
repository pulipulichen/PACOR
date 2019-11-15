let AnnotationHelper = {
  status: null,
  
  setStatus (status) {
    this.status = status
    return this
  },
  note (annotation, type, note) {
    if (typeof(type) === 'object') {
      Object.keys(type).each(t => {
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
  }
}

export default AnnotationHelper