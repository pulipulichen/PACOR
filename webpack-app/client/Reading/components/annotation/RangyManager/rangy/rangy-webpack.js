//console.log(1)
import rangy from './rangy-core.js'
//console.log(2)
//let rangy = require('./rangy-core.js')
//window.rangy = rangy
//require('./rangy-classapplier.js')
import ClassApplier from './rangy-classapplier.js'
ClassApplier(rangy)
//require('./rangy-highlighter.js')
import Highlighter from './rangy-highlighter.js'
Highlighter(rangy)

import Position from './rangy-position.js'
Position(rangy)

import Selection from './rangy-selectionsaverestore.js'
Selection(rangy)

import TextRange from './rangy-textrange.js'
TextRange(rangy)

//import Serializer from './rangy-serializer.js'
//Serializer(rangy)

//console.log(HighlighterModule)
//rangy = HighlighterModule(rangy)
//console.log(rangy)
export default rangy