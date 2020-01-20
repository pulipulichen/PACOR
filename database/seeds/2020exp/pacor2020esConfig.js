let config = use('./pacor2020efConfig.js')

config.IndividualReading.highlightAnnotation.types = ['Clarified', 'Confused', 'MainIdea']
config.CollaborativeReading.highlightAnnotation.types = ['Clarified', 'Confused', 'MainIdea']

module.exports = config