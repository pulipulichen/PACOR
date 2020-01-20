import NavigationItems from './NavigationItems/NavigationItems.vue'
import CollaborativeReading from '../CollaborativeReading/CollaborativeReading.js'

let FreeReading = {
  ...CollaborativeReading
}

FreeReading.components['navigation-items'] = NavigationItems

FreeReading.mounted = async function () {
  this.initComponentToLib()
  
  this._testArticleInformation()
}

import methodsTestFreeReading from './methodsTestFreeReading.js'
methodsTestFreeReading(FreeReading)

export default FreeReading