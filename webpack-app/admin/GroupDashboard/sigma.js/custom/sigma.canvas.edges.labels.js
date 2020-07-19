if (typeof(labelWidth) === 'undefined') {
  labelWidth = {}
}

/**
 * 
 * 參考對象 
 * https://github.com/pulipulichen/sigma.js/blob/master/plugins/sigma.renderers.edgeLabels/sigma.canvas.edges.labels.def.js
 * 
 * @param {type} edge
 * @param {type} source
 * @param {type} target
 * @param {type} context
 * @param {type} settings
 * @returns {undefined}
 */
sigma.canvas.edges.labels.def =
    function(edge, source, target, context, settings) {
    if (typeof edge.label !== 'string' || source === target)
      return;

    var prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1;

    //if (size < settings('edgeLabelThreshold'))
    //  return;
    if (typeof(labelWidth[target.label]) === 'undefined') {
      labelWidth[target.label] = context.measureText(target.label).width
    }

    if (0 === settings('edgeLabelSizePowRatio'))
      throw '"edgeLabelSizePowRatio" must not be 0.';

    let sX = source[prefix + 'x']
    let sY = source[prefix + 'y']
    let tX = target[prefix + 'x']
    let tY = target[prefix + 'y']
    
    /*
    if (sX > tX) {
      tX = tX + (labelWidth[target.label] / 2)
    }
    else if (sX < tX) {
      tX = tX - (labelWidth[target.label] / 2)
    }
    */

    var fontSize,
        dX = target[prefix + 'x'] - source[prefix + 'x'],
        dY = target[prefix + 'y'] - source[prefix + 'y'],
        sign = (source[prefix + 'x'] < target[prefix + 'Y']) ? 1 : -1,
        angle = Math.atan2(dY * sign, dX * sign);

    let limit = 3.2
    let turn = false
    if (angle > 2) {
      angle = angle - limit
      turn = true
    }
    else if (angle < -2) {
      angle = angle + limit
      turn = true
    }
    
    if (Math.abs(sY - tY) / Math.abs(sX - tX) < 3) {
      if (turn === false) {
        tX = tX + (labelWidth[target.label] / 2)
      }
      else {
        tX = tX - (labelWidth[target.label] / 2)
      }
    }
    
    let x = (sX + tX) / 2,
        y = (sY + tY) / 2
    
    
    if (edge.label === 'Edge 4') {
      //console.log(angle)
    }

    // The font size is sublineraly proportional to the edge size, in order to
    // avoid very large labels on screen.
    // This is achieved by f(x) = x * x^(-1/ a), where 'x' is the size and 'a'
    // is the edgeLabelSizePowRatio. Notice that f(1) = 1.
    // The final form is:
    // f'(x) = b * x * x^(-1 / a), thus f'(1) = b. Application:
    // fontSize = defaultEdgeLabelSize if edgeLabelSizePowRatio = 1
    fontSize = (settings('edgeLabelSize') === 'fixed') ?
      settings('defaultEdgeLabelSize') :
      settings('defaultEdgeLabelSize') *
      size *
      Math.pow(size, -1 / settings('edgeLabelSizePowRatio'));

    context.save();

    if (edge.active) {
      context.font = [
        settings('activeFontStyle'),
        fontSize + 'px',
        settings('activeFont') || settings('font')
      ].join(' ');

      context.fillStyle =
        settings('edgeActiveColor') === 'edge' ?
        (edge.active_color || settings('defaultEdgeActiveColor')) :
        settings('defaultEdgeLabelActiveColor');
    }
    else {
      context.font = [
        settings('fontStyle'),
        fontSize + 'px',
        settings('font')
      ].join(' ');

      context.fillStyle =
        (settings('edgeLabelColor') === 'edge') ?
        (edge.color || settings('defaultEdgeColor')) :
        settings('defaultEdgeLabelColor');
    }

    context.textAlign = 'center';
    context.textBaseline = 'alphabetic';

    context.translate(x, y);
    context.rotate(angle);
    context.fillText(
      edge.label,
      0,
      (-size / 2) - 3
    );

    context.restore();
  };
