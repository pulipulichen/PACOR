/* global lda, postMessageAPI, XLSX, sigma */

var appMethods = {
  initSigmaInstance () {
    this.sigmaInstance = new sigma({ 
      container: 'container',

      // canvas renderer
      // ===============
      renderer: {
        container: document.getElementById('container'),
        type: sigma.renderers.canvas
      }
    })
    
    this.sigmaInstance.settings({
      autoResize: false,
      labelThreshold : 0,
      sideMargin: 1,
      minArrowSize: 10,
      minEdgeSize: 3,
      minNodeSize: 3,
      maxNodeSize: 20,
      maxEdgeSize: 10,
      defaultEdgeColor: "#00F",
      //fontStyle: 'Arial Rounded MT Bold'
    });

    this.drawSocialNetwork()
  },
  drawSocialNetwork: function () {
    let s = this.sigmaInstance
    s.graph.clear();


    this.drawSocialNetworkNodes()
    this.drawSocialNetworkEdges()

    // Finally, let's ask our sigma instance to refresh:
      s.refresh();
      //s.startForceAtlas2();
      setTimeout(() => {
        //s.stopForceAtlas2()
        console.log('ok')
        let dragListener = sigma.plugins.dragNodes(s, s.renderers[0])
        /*
        setTimeout(() => {
          s.toSVG({
            labels: true,
            classes: false,
            data: true,
            download: true,
            filename: 'hello.svg'
          });
        }, 3000)
         */
      }, 0)
  },
  drawSocialNetworkNodes: function () {
    let s = this.sigmaInstance
    
    let nodes = [].concat(this.nodes)
    
    nodes.sort((a, b) => {
      return b.size - a.size
    })
    
    nodes.forEach((node, i, a) => {
      
      // i 的位置要做重新定位
      if (i > 0) {
        if (i % 4 === 1) {
          // 這是第幾個？
          i = Math.floor(i / 2) + 1
        }
        else if (i % 4 === 2) {
          i = a.length - Math.floor(i / 2)
        }
        else if (i % 4 === 3) {
          i = a.length - Math.floor(i / 2) - 1
        }
        else {
          i = Math.floor(i / 2)
        }
      }

      node.x = Math.sin(Math.PI * 2 * i / a.length);
      node.y = Math.cos(Math.PI * 2 * i / a.length) * -1;
      
      let angle = this.calcAngleDegrees(node.x, node.y)
      
      let labelPosition = 6
      if (angle <= 22.5 || angle > 337.5) {
        labelPosition = 6
      }
      else if (angle >= 22.5 && angle < 67.5) {
        labelPosition = 3
      }
      else if (angle >= 67.5 && angle < 112.5) {
        labelPosition = 2
      }
      else if (angle >= 112.5 && angle < 157.5) {
        labelPosition = 1
      }
      else if (angle >= 157.5 && angle < 202.5) {
        labelPosition = 4
      }
      else if (angle >= 202.5 && angle < 247.5) {
        labelPosition = 7
      }
      else if (angle >= 247.5 && angle < 292.5) {
        labelPosition = 8
      }
      else if (angle >= 292.5 && angle < 337.5) {
        labelPosition = 9
      }
      
      console.log(node.id, labelPosition)
      
      s.graph.addNode({
        // Main attributes:
        id: node.id,
        label: node.id,
        // Display attributes:
        x: node.x,
        y: node.y,
        size: node.size,
        labelPosition 
        //count: node.size,
      })
    });
  },
  calcAngleDegrees: function (x, y) {
    let a = Math.atan2(y, x) * 180 / Math.PI;
    if (a < 0) {
      a = 360 + a
    }

    return a
  },
  drawSocialNetworkEdges: function () {
    let s = this.sigmaInstance
    
    this.edges.forEach(function(edge, i) {
      s.graph.addEdge({
        id: 'e' + i,
        // Reference extremities:
        source: edge.source,
        target: edge.target,
        type: 'curvedArrow',
        size: edge.size,
        color: "#666"
      })
    });
  }
}