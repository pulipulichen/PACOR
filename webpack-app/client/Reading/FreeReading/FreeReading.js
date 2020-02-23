import NavigationItems from './NavigationItems/NavigationItems.vue'
import CollaborativeReading from '../CollaborativeReading/CollaborativeReading.js'
import QuestionnaireResults from './QuestionnaireResults/QuestionnaireResults.vue'

let FreeReading = {
  ...CollaborativeReading
}

FreeReading.components['navigation-items'] = NavigationItems
FreeReading.components['instruction-message-content'] = QuestionnaireResults

FreeReading.mounted = async function () {
  this.initComponentToLib()
  
  //this._testArticleInformation()
}

import methodsTestFreeReading from './methodsTestFreeReading.js'
methodsTestFreeReading(FreeReading)

export default FreeReading