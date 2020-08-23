//import sigmaWebpack from 'sigma-webpack'
//console.log(Object.keys(sigmaWebpack))

import { sigma } from 'sigma-webpack'
//import './sigma.js/plugins/sigma.layout.forceAtlas2/sigma.layout.forceAtlas2.webpack.js'
import './sigma.js/plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js'
import './sigma.js/plugins/sigma.exporters.svg/sigma.exporters.svg.js'

export default function (GroupDashboard) {
  GroupDashboard.methods.nodesTable = function (nodes) {
    let lines = [
      ['id', 'size'].join('\t')
    ]

    lines = lines.concat(nodes.map(({id, size}) => [id, size].join('\t')))

    return lines.join("\n")
  }
  GroupDashboard.methods.edgesTable = function (nodes, edges) {
    /*
     let lines = [
     ['source', 'target', 'size'].join('\t')
     ]
     
     lines = lines.concat(edges.map(({source, target, size}) => [source, target, size].join('\t')))
     
     return lines.join("\n")
     */
    let nodesList = nodes.map(({id}) => id)

    let data = {}
    nodes.forEach(sourceNode => {
      data[sourceNode.id] = {}
      nodes.forEach(targetNode => {
        data[sourceNode.id][targetNode.id] = 0
      })
    })

    edges.forEach(({source, target, size}) => {
      data[source][target] = size
    })

    let lines = [
      '\t' + nodesList.join('\t')
    ]

    nodesList.forEach(source => {
      let line = [source]

      nodesList.forEach(target => {
        line.push(data[source][target])
      })

      lines.push(line.join('\t'))
    })

    return lines.join('\n')
  }
  GroupDashboard.methods.drawGraphs = function () {
    this.group.socialNetworks.forEach((socialNetwork, i) => {
      //return false
      //if (i > 0) {
      //  return false
      //}

      let s = this.initGraph(i)
      //window.s = s
      this.drawSocialNetworkNodes(s, socialNetwork.nodes)
      this.drawSocialNetworkEdges(s, socialNetwork.edges)
      s.refresh()

      /*
       s.startForceAtlas2({
       edgeWeightInfluence: 1,
       strongGravityMode: true,
       barnesHutOptimize: false
       //iterationsPerRender: 10
       })
       */
      setTimeout(() => {
        //s.stopForceAtlas2()

        let dragListener = sigma.plugins.dragNodes(s, s.renderers[0])

        /*
         s.toSVG({
         labels: true,
         classes: false,
         data: true,
         download: true,
         filename: 'hello.svg'
         });
         */
      }, 1000)
      //console.log(socialNetwork.nodes)
      //console.log('畫完了...?' + i)
    })
  }
  GroupDashboard.methods.initGraph = function (i) {
    let containerID = 'graph_container_' + i
    //console.log(containerID)

    let s = new sigma({
      //container: containerID,

      // canvas renderer
      // ===============
      renderer: {
        container: document.getElementById(containerID),
        type: sigma.renderers.canvas
                //type: sigma.renderers.svg
      }
    })

    s.settings({
      labelThreshold: 0,
      sideMargin: 0.5,
      minArrowSize: 10,
      minEdgeSize: 1,
      minNodeSize: 3,
      maxEdgeSize: 3,
      defaultEdgeColor: "#00F",
    })

    return s
  }
  GroupDashboard.methods.drawSocialNetworkNodes = function (s, nodes) {

    nodes.forEach(function (node, i, a) {

      // i 的位置要做重新定位
      if (i > 0) {
        if (i % 4 === 1) {
          // 這是第幾個？
          i = Math.floor(i / 2) + 1
        } else if (i % 4 === 2) {
          i = a.length - Math.floor(i / 2)
        } else if (i % 4 === 3) {
          i = a.length - Math.floor(i / 2) - 1
        } else {
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
        //count: node.size
      })
    });
  }
  GroupDashboard.methods.drawSocialNetworkEdges = function (s, edges) {
    edges.forEach(function (edge, i) {

      s.graph.addEdge({
        id: 'edge' + i,
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