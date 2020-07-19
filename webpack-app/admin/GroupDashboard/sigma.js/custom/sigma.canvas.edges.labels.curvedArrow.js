if (typeof(labelWidth) === 'undefined') {
  labelWidth = {}
}

sigma.canvas.edges.labels.curvedArrow =
    function(edge, source, target, context, settings) {
    if (typeof edge.label !== 'string')
      return;

      if (typeof(labelWidth[target.label]) === 'undefined') {
        labelWidth[target.label] = context.measureText(target.label).width
      }

    var prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1;

    if (size < settings('edgeLabelThreshold'))
      return;

    var fontSize,
        sSize = source[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        count = edge.count || 0,
        dX = tX - sX,
        dY = tY - sY,
        sign = (sX < tX) ? 1 : -1,
        cp = {},
        c,
        angle,
        t = 0.5;  //length of the curve
    
    if (source.id === target.id) {
      //console.log(sSize)
      
      tX = tX - (labelWidth[target.label] * Math.sqrt(sSize))
      tY = tY + (labelWidth[target.label] / 2 * Math.sqrt(sSize))
      
      //tX = tX + (labelWidth[target.label] * Math.sqrt(sSize)) - labelWidth[target.label]
      //tY = tY - (labelWidth[target.label] * Math.sqrt(sSize))
      
      cp = sigma.utils.getSelfLoopControlPoints(sX, sY, sSize, count);
      c = sigma.utils.getPointOnBezierCurve(
        t, sX, sY, tX, tY, cp.x1, cp.y1, cp.x2, cp.y2
      );
      angle = Math.atan2(1, 1); // 45°
    } else {
      //console.log(Math.abs(sY - tY) / Math.abs(sX - tX))
      //if ((Math.abs(sY - tY) / Math.abs(sX - tX) > 1) && (Math.abs(sY - tY) / Math.abs(sX - tX) < 3)) {
      if (Math.abs(sY - tY) / Math.abs(sX - tX) < 3) {
        let width = labelWidth[target.label] / 2
        width = width * sign
        
        if (edge.label === 'Edge 10') {
          //console.log((Math.abs(sY - tY) / Math.abs(sX - tX)))
          //console.log([width, sign])
        }
        if (sX > tX) { 
          tX = tX - width
          tY = tY + width
          //tY = tY - labelWidth[target.label] / 2
        } 
        else if (sX < tX) { 
          tX = tX + width
          tY = tY - width
          //tY = tY - labelWidth[target.label] / 2
        }
        if (edge.label === 'Edge 10') {
          //console.log(sign)
        }
      }
      cp = sigma.utils.getQuadraticControlPoint(sX, sY, tX, tY, count);
      //cp.x = cp.x - (labelWidth[target.label] * Math.sqrt(sSize))
      c = sigma.utils.getPointOnQuadraticCurve(t, sX, sY, tX, tY, cp.x, cp.y);
      angle = Math.atan2(dY * sign, dX * sign);
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

    context.translate(c.x, c.y);
    context.rotate(angle);
    context.fillText(
      edge.label,
      0,
      (-size / 2) - 3
    );

    context.restore();
  };