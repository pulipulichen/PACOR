if (typeof(labelWidth) === 'undefined') {
  labelWidth = {}
}

/**
 * https://github.com/pulipulichen/sigma.js/blob/master/src/renderers/canvas/sigma.canvas.nodes.def.js#L23
 * @param {type} node
 * @param {type} context
 * @param {type} settings
 * @returns {undefined}
 */
sigma.canvas.nodes.def = function(node, context, settings) {
  //drawPointNode(node, context, settings)
  drawRoundRectNode(node, context, settings)
};

let drawPointNode = function (node, context, settings) {
  var prefix = settings('prefix') || '';

  context.fillStyle = node.color || settings('defaultNodeColor');
  context.beginPath();
  context.arc(
    node[prefix + 'x'],
    node[prefix + 'y'],
    node[prefix + 'size'],
    0,
    Math.PI * 2,
    true
  );

  context.closePath();
  context.fill();
}


let drawRoundRectNode = function (node, context, settings) {
  var prefix = settings('prefix') || '',
      size = node[prefix + 'size']
  
  context.fillStyle = '#FFFFFF';
  context.strokeStyle = node.color || settings('defaultNodeColor');
  context.lineWidth = 2
  //console.log(node.color)
  //let s = ss
  //let borderSize = context.measureText('|').width * 2
  //if (settings('labelSize') === 'fixed') {
  //  borderSize = settings('defaultLabelSize')
  //}
  //let fontSize = (settings('labelSize') === 'fixed') ?
  //  settings('defaultLabelSize') :
  //  settings('labelSizeRatio') * size;

  //if (settings('labelSize') === 'fixed') {
    //let x = Math.round(node[prefix + 'x'] - settings('labelSizeRatio') * (context.measureText(node.label).width / 2) - borderSize )
    //let y = node[prefix + 'y'] - size
    if (typeof(labelWidth[node.label]) === 'undefined') {
      labelWidth[node.label] = context.measureText(node.label).width
      //labelWidth[node.label] = settings('defaultLabelSize')
      //labelWidth[node.label] = settings('labelSizeRatio') * size
    }
    //let width = (settings('labelSizeRatio') * (labelWidth[node.label]))
    //width = width * Math.sqrt(Math.sqrt(size))
    let fontSize = settings('labelSizeRatio') * size;
    let width = Math.round(
        (context.measureText(node.label).width + fontSize)
    );
    
    //if (node.label === 'Happy') {
      //console.log([node.label, context.measureText(node.label).width, fontSize, size, width])
      //width = 72
      // 差20
    //}
    let x = Math.round(node[prefix + 'x'] - (width / 2) )

    //width = width / Math.sqrt(s.cameras[0].ratio * settings('zoomingRatio'))
    //width = width * settings('labelSizeRatio')
    //let width = context.measureText(node.label).width * settings('labelSizeRatio') / s.cameras[0].ratio / 2 
    
    if (node.label === 'Node 1') {
      //console.log([width, settings('labelSizeRatio'), settings('zoomingRatio')])
      //console.log(window.devicePixelRatio)
      //console.log([size, width, settings('labelSizeRatio'), context.measureText(node.label).width])
    }
    let height = size * 1.5
    //let height = settings('labelSizeRatio')
    //height = width / node.label.length * 2
    let y = Math.round(node[prefix + 'y'] - (height/2))

    let radius = height / 2
    let fill = true
    let stroke = true

    /*
    context.fillStyle = node.color || settings('defaultNodeColor');

    context.beginPath();
    context.rect(
            x,
            y,
            width,
            height
      //node[prefix + 'x'] - size,
      //Math.round(node[prefix + 'x'] - settings('labelSizeRatio') * (context.measureText(node.label).width / 2 + borderSize )),
      //node[prefix + 'y'] - size,
      //(settings('labelSizeRatio') * (context.measureText(node.label).width + (borderSize * 2) )),
      //size * 2
    );

    context.closePath();
    context.fill();
    */
  //}
  roundRect(context, x, y, width, height, radius, fill, stroke)
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
let roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}
