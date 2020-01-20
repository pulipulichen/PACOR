let config = use('./pacor2020efConfig.js')

config.readingProgressModules.IndividualReading.highlightAnnotation.types = ['Clarified', 'Confused', 'MainIdea']
config.readingProgressModules.CollaborativeReading.highlightAnnotation.types = ['Clarified', 'Confused', 'MainIdea']

module.exports = config