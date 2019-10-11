let bundleName = 'admin.js'

let baseURL = document.currentScript.src
baseURL = baseURL.slice(0, baseURL.lastIndexOf('/') + 1)

let loadScript = (name) => {
  let script = document.createElement("script")
  script.type = "text/javascript"
  script.src = baseURL + name
  document.currentScript.parentNode.insertBefore(script, document.currentScript.nextSibling)
}

loadScript('vendors.js')
loadScript('commons.js')
loadScript(bundleName)