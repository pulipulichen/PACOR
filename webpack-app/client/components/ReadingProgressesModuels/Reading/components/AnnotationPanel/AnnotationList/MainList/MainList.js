let List = {
  props: ['lib', 'status', 'config', 'panelData'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      annotations: [],
      annotationCount: 0,
      users: [],
      userCount: 0,
      types: [],
      page: 0,
      noMore: false,
      
      
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
}

import Height from './../Traits/computed/Height'
Height(List)

export default List