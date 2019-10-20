
const Annotation = use('App/Controllers/Http/Client/Annotation')

class SectionAnnotation extends Annotation {
  model () {
    return use('App/Models/SectionAnnotation')
  }
}

module.exports = SectionAnnotation