if (typeof(labelWidth) === 'undefined') {
  labelWidth = {}
}

/**
 * https://github.com/pulipulichen/sigma.js/blob/master/src/renderers/canvas/sigma.canvas.labels.def.js
 * @param {type} node
 * @param {type} context
 * @param {type} settings
 * @returns {undefined}
 */
sigma.canvas.labels.def = function(node, context, settings) {
  
  var fontSize,
      prefix = settings('prefix') || '',
      size = node[prefix + 'size'];
      
  
  if (typeof(labelWidth[node.label]) === 'undefined') {
    //labelWidth[node.label] = context.measureText(node.label).width
    labelWidth[node.label] = context.measureText(node.label).width
  }

  if (size < settings('labelThreshold')) {
    return;
  }

  if (!node.label || typeof node.label !== 'string') {
    return;
  }

  fontSize = settings('labelSizeRatio') * size;

  context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') +
    fontSize + 'px ' + settings('font');
  context.fillStyle = (settings('labelColor') === 'node') ?
    (node.color || settings('defaultNodeColor')) :
    settings('defaultLabelColor');
  /*
  if (node.label === 'n11') {
    console.log([
      settings('labelSizeRatio'),
      fontSize,
      node.label.length,
      context.measureText(node.label).width
    ])
  }
  */
  let label = node.label
  //let x = node[prefix + 'x'] - (labelWidth[node.label] * settings('labelSizeRatio') * Math.sqrt(Math.sqrt(size)) / 2)
  let x = node[prefix + 'x']
  //x = x - (labelWidth[node.label] * settings('labelSizeRatio') * size / 2)
  //x = x - (labelWidth[node.label] * settings('labelSizeRatio') * settings('zoomingRatio') / 2)
  //x = x - (labelWidth[node.label] * settings('labelSizeRatio') / 2) - (size / 2) - (settings('zoomingRatio') / 2)
  //x = x - 
  //x = x - (labelWidth[node.label] * settings('labelSizeRatio') / 2) - (size / 2)
  x = x - (context.measureText(node.label).width * settings('labelSizeRatio') / 2)
  x = Math.round(x)
  if (node.label === 'Happy') {
    //console.log([node[prefix + 'x'], labelWidth[node.label], size, x, context.measureText(node.label).width])
    //  [node[prefix + 'x']     58
    //  labelWidth[node.label]  35
    //  size                    20
    //x = 28
    //17+10
    // 差距是30
    // 3
    // 20
    // 35/1.7 = 20.58823529411765
    // 
    // 58
    // 21
    // 58 - (21 / 2)
    // 48
  }
  
  let y = Math.round(node[prefix + 'y'] + fontSize / 3)
 
  context.fillText(
    label,
    x,
    y
  );
  

};