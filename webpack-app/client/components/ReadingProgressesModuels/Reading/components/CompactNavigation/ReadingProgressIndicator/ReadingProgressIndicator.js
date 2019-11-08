import $ from 'jquery'

let ReadingProgressIndicator = {
  data() {
    return {
      display: false,
      percent: 0
    }
  },
  //computed: {
  //},
  mounted() {
    window.addEventListener('scroll', this.calculateProgress)
    window.addEventListener('resize', this.calculateProgress)
    
    $(() => {
      setTimeout(() => {
        this.display = true
        this.calculateProgress()
      }, 1500)
    })
    this.calculateProgress()
  },
  destroyed() {
    window.removeEventListener('scroll', this.calculateProgress)
    window.removeEventListener('resize', this.calculateProgress)
  },
  methods: {
    calculateProgress() {
      if (this.display === false) {
        return ''
      }
      let viewport = window.innerHeight
      let middleViewport = viewport / 2
      
      let page = document.body.scrollHeight
      let scrollTop = window.scrollY
      //let scrollTop = window.scrollY
      
      

      let min = middleViewport
      let max = page - middleViewport
      let scrollMiddle = scrollTop + middleViewport
      
      //console.log([viewport, middleViewport, page, scrollTop])
      //console.log([min, max, scrollMiddle, scrollTop, (scrollTop + viewport), (page)])
      
      let p = parseInt(((scrollMiddle - min) / (max - min) * 100), 10)
      if (p < 0) {
        p = 0
      }
      else if (p > 100) {
        p = 100
      }      
      
      //console.log(p)
      
      this.percent = p
      //ReadingProgressIndicator.data.percent = percent
    }
  }
}

export default ReadingProgressIndicator