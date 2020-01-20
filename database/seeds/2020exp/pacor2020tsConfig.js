let config = use('./pacor2020tfConfig.js')

config.IndividualReading.highlightAnnotation.types = ['Clarified', 'Confused', 'MainIdea']
config.CollaborativeReading.highlightAnnotation.types = ['Clarified', 'Confused', 'MainIdea']

module.exports = config