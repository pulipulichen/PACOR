let Navigation = {
  props: ['config', 'compact-width'],
  data() {
    return {
      sideMenuDisplay: false
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    showSideMenu: function () {
      this.sideMenuDisplay = true
    },
    hideSideMenu: function () {
      this.sideMenuDisplay = false
    }
    
  } // methods
}

export default Navigation