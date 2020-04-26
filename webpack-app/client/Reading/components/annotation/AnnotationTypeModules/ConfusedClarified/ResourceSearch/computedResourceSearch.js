export default function (ResourceSearch) {
  ResourceSearch.computed.resources = function () {
    return this.status.readingConfig.annotationTypeModules['ConfusedClarified'].externalResourceSearches
  }

  ResourceSearch.computed.computedButtonClass = function () {
    if (this.anchorText === '') {
      return 'disabled'
    }

    let i = this.selectIndex
    if (i === null || i === undefined) {
      return 'disabled'
    }

    if (isNaN(i) === false && typeof (i) === 'string') {
      i = parseInt(i, 10)
    }
    if (!(i > -1 && i < this.resources.length)) {
      return 'disabled'
    }
  }
  ResourceSearch.computed.selectIndexInteger = function () {
    let i = this.selectIndex
    if (i === null || i === undefined) {
      return null
    }

    if (isNaN(i) === false && typeof (i) === 'string') {
      i = parseInt(i, 10)
    }
    if (i > -1 && i < this.resources.length) {
      return i
    } else {
      return null
    }
  }
  
  ResourceSearch.computed.urlPattern = function () {
    if (this.selectIndexInteger === null) {
      return null
    }

    return this.resources[this.selectIndexInteger].urlPattern
  }
  
//  ResourceSearch.computed.useIframe = function () {
//    if (this.selectIndexInteger === null) {
//      return false
//    }
//
//    return this.resources[this.selectIndexInteger].useIframe
//  }
  
  ResourceSearch.computed.anchorTextQuery = function () {
    let q = this.anchorText
    q = q.split(' ').join('')
    if (q.length > 20) {
      q = q.slice(0, 20)
    }
    
    return q
  }
}