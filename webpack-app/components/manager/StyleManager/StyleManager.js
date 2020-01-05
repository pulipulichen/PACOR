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
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {} // methodsStyleManager.js
}

import computedStyleManager from './computedStyleManager.js'
computedStyleManager(StyleManager)

import computedDeviceStyleManager from './computedDeviceStyleManager.js'
computedDeviceStyleManager(StyleManager)

import methodsStyleManager from './methodsStyleManager.js'
methodsStyleManager(StyleManager)

import methodsScrollStyleManager from './methodsScrollStyleManager.js'
methodsScrollStyleManager(StyleManager)

export default StyleManager