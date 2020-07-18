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
      maxEdgeSize: 3
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
      s.startForceAtlas2();
      setTimeout(() => {
        s.stopForceAtlas2()
        console.log('ok')
        let dragListener = sigma.plugins.dragNodes(s, s.renderers[0])
      }, 3000)
  },
  drawSocialNetworkNodes: function () {
    let s = this.sigmaInstance
    
    this.nodes.forEach(function(node, i, a) {
      node.x = Math.cos(Math.PI * 2 * i / a.length);
      node.y = Math.sin(Math.PI * 2 * i / a.length);
      
      s.graph.addNode({
        // Main attributes:
        id: node.id,
        label: node.id,
        // Display attributes:
        x: node.x,
        y: node.y,
        size: node.size,
        count: node.size
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
      })
    });
  }
}