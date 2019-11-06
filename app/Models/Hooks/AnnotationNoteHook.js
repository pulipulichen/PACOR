'use strict'

const Hash = use('Hash')

const AnnotationNoteHook = exports = module.exports = {}

AnnotationNoteHook.getNote = async (annotations) => {
  annotations = annotations.map(annotation => {
    //console.log(annotation)
    
    let notes = annotation.$relations.notes
    if (typeof(notes) === 'object') {
      notes = notes.toJSON()
    }
    //console.log(notes)
    if (Array.isArray(notes)) {
      
      let note
      
      if (notes.length === 1 && notes[0].type === 'default') {
        note = notes[0].note
      }
      else if (notes.length > 1) {
        let output = {}
        notes.forEach(note => {
          output[note.type] = note.note
        })
        note = output
      }
      annotation.note = note
    }
    
    return annotation
  })
  
  return annotations
}