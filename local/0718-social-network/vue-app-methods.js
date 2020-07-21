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
      labelThreshold : 0,
      sideMargin: 1,
      minArrowSize: 10,
      minEdgeSize: 1,
      minNodeSize: 3,
      maxNodeSize: 20,
      maxEdgeSize: 10,
      defaultEdgeColor: "#00F",
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
      }, 0)
  },
  drawSocialNetworkNodes: function () {
    let s = this.sigmaInstance
    
    let nodes = [].concat(this.nodes)
    
    nodes.sort((a, b) => {
      return b.size - a.size
    })
    
    nodes.forEach(function(node, i, a) {
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
      
      s.graph.addNode({
        // Main attributes:
        id: node.id,
        label: node.id,
        // Display attributes:
        x: node.x,
        y: node.y,
        size: node.size,
        //count: node.size,
      })
    });
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