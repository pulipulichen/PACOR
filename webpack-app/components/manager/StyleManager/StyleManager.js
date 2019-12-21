let StyleManager = {
  props: ['lib', 'status', 'config'],
  data() {
    return {
      isStackWidth: null,
      isSmallHeight: null,
      clientHeight: null
    }
  },
  computed: {}, // computedStyleManager.js
//  watch: {
//  },
  mounted () {
    window.addEventListener('resize', this.onWindowResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {} // methodsStyleManager.js
}

import computedStyleManager from './computedStyleManager.js'
computedStyleManager(StyleManager)

import methodsStyleManager from './methodsStyleManager.js'
methodsStyleManager(StyleManager)

export default StyleManager