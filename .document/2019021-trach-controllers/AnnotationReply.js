
const Annotation = use('App/Controllers/Http/Client/Annotation')

class AnnotationReply extends Annotation {
  model () {
    return use('App/Models/AnnotationReply')
  }
}

module.exports = AnnotationReply