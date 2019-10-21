module.exports = {
  readingProgress: ['pre-imaginary', 'individual-reading', 'collaborative-reading', 'post-recall'],
  modules: {
    'pre-imaginary': {
      minCharacters: 10,
      limitMinutes: 1
    },
    'reading': {
      limitMinutes: 1,
    },
    'individual-reading': {
      checklist: [
        'I have already read this section.',
        'I have already written annotations on a sentence I don\'t understand.',
        'I have already written the main ideas of this section.',
      ]
    },
    'collaborative-reading': {
    },
    'post-recall': {
      minCharacters: 10,
      limitMinutes: 1
    }
  }
}
