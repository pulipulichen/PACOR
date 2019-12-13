import NavigationItems from './NavigationItems/NavigationItems.vue'
import CollaborativeReading from '../CollaborativeReading/CollaborativeReading.js'

let FreeReading = {
  ...CollaborativeReading
}

FreeReading.components['navigation-items'] = NavigationItems

export default FreeReading