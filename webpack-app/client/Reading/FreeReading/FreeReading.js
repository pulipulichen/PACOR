import NavigationItems from './NavigationItems/NavigationItems.vue'
import CollaborativeReading from '../CollaborativeReading/CollaborativeReading.js'
import FreeReadingInstruction from './FreeReadingInstruction/FreeReadingInstruction.vue'

let FreeReading = {
  ...CollaborativeReading
}

FreeReading.components['navigation-items'] = NavigationItems
FreeReading.components['reading-instruction-message'] = FreeReadingInstruction

FreeReading.mounted = async function () {
  this.initComponentToLib()
  
  //this._testArticleInformation()
}

import methodsTestFreeReading from './methodsTestFreeReading.js'
methodsTestFreeReading(FreeReading)

export default FreeReading