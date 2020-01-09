(function () {
  var bundleName = 'client.js'

  var baseURL = document.currentScript.src
  //console.log(baseURL)
  baseURL = baseURL.slice(0, baseURL.lastIndexOf('/') + 1)

  var loadScript = function (name) {
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.src = baseURL + name
    //console.log(baseURL + name)
    document.currentScript.parentNode.insertBefore(script, document.currentScript.nextSibling)
  }

  loadScript('vendors.js')
  loadScript('commons.js')
  loadScript(bundleName)
})()