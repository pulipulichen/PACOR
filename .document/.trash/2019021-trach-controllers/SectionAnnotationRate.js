
const AnnotationRate = use('App/Controllers/Http/Client/AnnotationRate')

class SectionAnnotationRate extends AnnotationRate {
  model () {
    return use('App/Models/SectionAnnotationRate')
  }
}

module.exports = SectionAnnotationRate