let CheckboxToggle = {
  props: ['label', 'value', 'enable'],
  data() {
    return {
    }
  },
  computed: {
    computedCheckboxClassList () {
      if (this.enable === false) {
        return 'disabled'
      }
    }
  }
}

export default CheckboxToggle