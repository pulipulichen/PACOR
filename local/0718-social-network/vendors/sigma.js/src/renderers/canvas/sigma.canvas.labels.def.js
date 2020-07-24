;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.labels');

  /**
   * This label renderer will just display the label on the right of the node.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.labels.def = function(node, context, settings) {
    var fontSize,
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'];

    if (size < settings('labelThreshold'))
      return;

    if (!node.label || typeof node.label !== 'string')
      return;

    //console.log(node.labelPosition)

    fontSize = (settings('labelSize') === 'fixed') ?
      settings('defaultLabelSize') :
      settings('labelSizeRatio') * size;

    context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') +
      fontSize + 'px ' + settings('font');
    
    //context.font = 'Aleo'
    
    //context.fillStyle = '#F00'
    
    let labelX = Math.round(node[prefix + 'x'] - (node.label.length * fontSize / 4))
    let labelY = Math.round(node[prefix + 'y'] + fontSize / 3)
    
    let labelPosition = node.labelPosition
    
    //console.log(node.label, labelPosition)
    
    if (labelPosition === 9 
            || labelPosition === 6
            || labelPosition === 3) {
      labelX = Math.round(node[prefix + 'x'] + size + 3)
    }
    
    if (labelPosition === 7
            || labelPosition === 4
            || labelPosition === 1) {
      labelX = Math.round(node[prefix + 'x'] - (size * 3.5))
    }
    
    if (labelPosition === 7
            || labelPosition === 8
            || labelPosition === 9) {
      labelY = Math.round(node[prefix + 'y'] - (fontSize * 2) )
    }
    
    if (labelPosition === 1
            || labelPosition === 2
            || labelPosition === 3) {
      labelY = Math.round(node[prefix + 'y'] + (fontSize * 1.5))
    }
    
    context.strokeStyle = '#FFF'
    context.lineWidth = 3
    context.strokeText(
      node.label,
      labelX,
      labelY
    )
    
    context.strokeStyle = '#CCC'
    context.lineWidth = 2
    context.strokeText(
      node.label,
      labelX,
      labelY
    )
      
    context.fillStyle = (settings('labelColor') === 'node') ?
      (node.color || settings('defaultNodeColor')) :
      settings('defaultLabelColor');

    context.fillText(
      node.label,
      labelX,
      labelY
    )
  };
}).call(this);
