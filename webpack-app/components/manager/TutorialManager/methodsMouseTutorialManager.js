import $ from 'jquery'

export default function (TutorialManager) {
  let $clickImage
  
  TutorialManager.methods.showClick = async function (element) {
    if (!$clickImage) {
      $clickImage = $(this.$refs.ClickImage)
    }
    
    let {top, left} = element.offset()
    
    //let fromTop = true
    //let fromLeft = true
    
    let beforeTop = top - 50
    let beforeLeft = left - 50
    
    let beforeStyle = {}
    let afterStyle = {}
    
    if (beforeTop > 0) {
      beforeStyle.top = beforeTop + 'px'
    }
    else {
      beforeTop = top + 50
      beforeStyle.top = beforeTop + 'px'
    }
    afterStyle.top = (top + 10)
    
    if (beforeLeft > 0) {
      beforeStyle.left = beforeLeft + 'px'
    }
    else {
      beforeLeft = left + 50
      beforeStyle.left = beforeLeft + 'px'
    }
    afterStyle.left = (left + 10)
    //afterStyle.left = (left + 10)
    
    //console.log(beforeStyle, afterStyle)
    
    $clickImage.css(beforeStyle)
    
    //$clickImage.animate(afterStyle, 1000, () => {})
    
    return new Promise((resolve) => {
      $clickImage.fadeIn('fast', async () => {
        $clickImage.animate(afterStyle, 500)
        await this.lib.VueHelper.sleep(1000)

        resolve(true)
        $clickImage.fadeOut()
      })
    })
    //throw new Error('@showClick')
  }
}