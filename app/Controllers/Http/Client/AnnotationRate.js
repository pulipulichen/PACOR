
const AnnotationReply = use('App/Controllers/Http/Client/AnnotationReply')

class AnnotationRate extends AnnotationReply {
  model () {
    return use('App/Models/AnnotationRate')
  }
}

module.exports = AnnotationRate