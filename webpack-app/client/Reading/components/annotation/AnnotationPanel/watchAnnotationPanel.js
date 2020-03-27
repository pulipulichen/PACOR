export default (AnnotationPanel) => {

  AnnotationPanel.watch['currentStep'] = function () {
    this.hide()
  }

//  AnnotationPanel.watch.pinSelection = function (pinSelection) {
//    if (pinSelection !== null
//            && typeof (pinSelection) === 'object') {
//      //console.log(pinSelection)
//      this.show()
//    } else {
//      this.hide()
//    }
//  }
  
//  AnnotationPanel.watch.listPositions = function (listPositions) {
//    if (listPositions !== null
//            && typeof (listPositions) === 'object') {
//      this.show()
//    } else {
//      this.hide()
//    }
//  }
  
//  AnnotationPanel.watch.heightVH = function (heightVH) {
//    if (typeof (heightVH) === 'number') {
//      this.placeholder.css('height', heightVH + 'vh')
//    }
//  }
  
//  AnnotationPanel.watch['status.search.showAnnotationList'] = function (show) {
//    //console.log(show)
//    if (show === true) {
//      this.show()
//    }
//  }
//  
//  AnnotationPanel.watch['sectionsData.sectionAnnotation.instance'] = function (instance) {
//    if (typeof (instance) === 'object') {
//      this.show()
//    } else {
//      this.hide()
//    }
//  }
  

//    isHide () {
//      
//    }

//  AnnotationPanel.watch['panelData.annotation'] = function (annotation) {
//    if (annotation) {
//      this.checkStartLocalTutorial()
//    }
//  }

}