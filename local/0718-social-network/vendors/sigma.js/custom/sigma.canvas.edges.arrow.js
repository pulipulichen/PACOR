if (typeof(labelWidth) === 'undefined') {
  labelWidth = {}
}

sigma.canvas.edges.arrow = function(edge, source, target, context, settings) {
    if (typeof(labelWidth[target.label]) === 'undefined') {
      labelWidth[target.label] = context.measureText(target.label).width
    }
  
    var color = edge.color,
        prefix = settings('prefix') || '',
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
        size = edge[prefix + 'size'] || 1,
        tSize = target[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'],
        aSize = Math.max(size * 2.5, settings('minArrowSize')),
        d = Math.sqrt(Math.pow(tX - sX, 2) + Math.pow(tY - sY, 2)),
        aX = sX + (tX - sX) * (d - aSize - tSize) / d,
        aY = sY + (tY - sY) * (d - aSize - tSize) / d,
        vX = (tX - sX) * aSize / d,
        vY = (tY - sY) * aSize / d;
    
    //vX = vX - (context.measureText(target.label).width / 2)
    
    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    //if ((Math.abs(sY - tY) / Math.abs(sX - tX)) < 1) {
    if (edge.label === 'Edge 6') {
      //console.log((Math.abs(sY - tY) / Math.abs(sX - tX)))
    }
    if ((Math.abs(sY - tY) / Math.abs(sX - tX) < 3)) {
      if (sX > tX) {
        aX  = aX + (labelWidth[target.label] / 2)
      }
      else if (sX < tX) {
        aX  = aX - (labelWidth[target.label] / 2)
      }
    }

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(sX, sY);
    context.lineTo(
      aX,
      aY
    );
    context.stroke();

    context.fillStyle = color;
    context.beginPath();
    context.moveTo(aX + vX, aY + vY);
    context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
    context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
    context.lineTo(aX + vX, aY + vY);
    context.closePath();
    context.fill();
  };