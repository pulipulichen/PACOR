let StyleManager = {
  props: ['lib', 'status', 'config'],
  data() {
    return {
    }
  },
//  components: {
//  },
  computed: {
    isLeftHanded () {
      if (this.status.preference
              && this.status.preference.leftHanded) {
        return this.status.preference.leftHanded
      }
      return false
    }
  },
  watch: {
  },
//  mounted() {
//  },
  methods: {
    isStackWidth() {
      let StackWidth = this.config.StackWidth
      return (window.innerWidth < StackWidth)
    },
    isSmallHeight() {
      return (window.innerHeight < this.config.SmallHeight)
    },
    getClientHeight(unit) {
      let height = window.innerHeight

      if (typeof (unit) === 'string') {
        height = height + unit
      }

      return height
    },
    
  } // methods
}

export default StyleManager