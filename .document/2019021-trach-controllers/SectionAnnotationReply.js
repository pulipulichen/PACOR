
const AnnotationReply = use('App/Controllers/Http/Client/AnnotationReply')

class SectionAnnotationRate extends AnnotationReply {
  model () {
    return use('App/Models/SectionAnnotationReply')
  }
}

module.exports = SectionAnnotationRate