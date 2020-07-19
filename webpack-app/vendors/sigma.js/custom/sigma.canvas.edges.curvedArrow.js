
sigma.canvas.edges.curvedArrow = function (edge, source, target, context, settings) {
  var color = edge.color,
          prefix = settings('prefix') || '',
          edgeColor = settings('edgeColor'),
          defaultNodeColor = settings('defaultNodeColor'),
          defaultEdgeColor = settings('defaultEdgeColor'),
          cp = {},
          size = edge[prefix + 'size'] || 1,
          tSize = target[prefix + 'size'],
          sX = source[prefix + 'x'],
          sY = source[prefix + 'y'],
          tX = target[prefix + 'x'],
          tY = target[prefix + 'y'],
          aSize = Math.max(size * 2.5, settings('minArrowSize')),
          d,
          aX,
          aY,
          vX,
          vY;

  cp = (source.id === target.id) ?
          sigma.utils.getSelfLoopControlPoints(sX, sY, tSize) :
          sigma.utils.getQuadraticControlPoint(sX, sY, tX, tY);

  //let fontSize = settings('labelSizeRatio') * size;
  let width = Math.round(context.measureText(target.label).width);

  if (source.id === target.id) {
    d = Math.sqrt(Math.pow(tX - cp.x1, 2) + Math.pow(tY - cp.y1, 2));
    aX = cp.x1 + (tX - cp.x1) * (d - aSize - tSize) / d;
    aX = aX - (width / 2)
    aY = cp.y1 + (tY - cp.y1) * (d - aSize - tSize) / d;
    vX = (tX - cp.x1) * aSize / d;
    vY = (tY - cp.y1) * aSize / d;
  } else {
    if (source.label === 'Happy' && target.label === 'World') {
      //console.log([sX, sY, tX, tY])
      //tX = tX - context.measureText(target.label).width
      //console.log(["t",sigma.utils.getAngle(sX, sY, tX, tY), (tY - sY), tY, sY, (tX - sX), tX, sX])
      //console.log(["a",sX, sY, tX, tY])
      //console.log(["a", sigma.utils.getAngle(sX, sY, aX, aY), (aY - sY), tY, sY, (aX - sX), aX, sX])
      //console.log(["a", sigma.utils.getAngle(sX, sY, aX, aY), (aY - vY), aY, vY, (aX - vX), aX, vX])
      //console.log([sigma.utils.getAngle(sX, sY, tX, tY), sigma.utils.adjustTargetXbyAngle(sX, sY, tX, tY), sigma.utils.adjustTargetYbyAngle(sX, sY, tX, tY), tSize])
    }
    let adjustX = sigma.utils.adjustTargetXbyAngle(sX, sY, tX, tY)
    let adjustY = sigma.utils.adjustTargetYbyAngle(sX, sY, tX, tY)
    tX = tX + (width * adjustX / 2);
    //tY = tY + (tSize * adjustY);
    
    d = Math.sqrt(Math.pow(tX - cp.x, 2) + Math.pow(tY - cp.y, 2));
    aX = cp.x + (tX - cp.x) * (d - aSize - tSize) / d;
    //if ( (sX > tX) ) {
    
    /*
    if ((Math.abs(sY - tY) / Math.abs(sX - tX)) < 3) {
      if (sX < tX) {
        aX = aX - (width / 2);
      } else {
        aX = aX + (width / 2);
      }
    }
    */
    //aX = aX + (width * adjust / 2);
    //}
    //else if ((sX < tX)) {
    //aX = aX - (labelWidth[target.label] / 2);
    //}

    //if (edge.label === 'Edge 10') {
    //  //console.log(aX)
    //  aX = cp.x + (tX - cp.x) * (d - aSize - tSize) / d + (labelWidth[target.label] / 2);
    //}

    aY = cp.y + (tY - cp.y) * (d - aSize - tSize) / d;
    aY = aY + (tSize / 2 * adjustY);
    
    vX = (tX - cp.x) * aSize / d;
    vY = (tY - cp.y) * aSize / d;
    
  }

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

  context.strokeStyle = color;
  context.lineWidth = size;
  context.beginPath();
  context.moveTo(sX, sY);
  if (source.id === target.id) {
    context.bezierCurveTo(cp.x2, cp.y2, cp.x1, cp.y1, aX, aY);
  } else {
    context.quadraticCurveTo(cp.x, cp.y, aX, aY);
  }
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
  