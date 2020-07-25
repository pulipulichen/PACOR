//import sigmaWebpack from 'sigma-webpack'
//console.log(Object.keys(sigmaWebpack))

import { sigma } from 'sigma-webpack'
//import './sigma.js/plugins/sigma.layout.forceAtlas2/sigma.layout.forceAtlas2.webpack.js'
import './sigma.js/plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js'
import './sigma.js/plugins/sigma.exporters.svg/sigma.exporters.svg.js'

let GroupDashboard = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      toc: null,
      group: {
        group_seq_id: null,
        socialNetworks: [],
        users: []
      }
    }
  },
//  components: {
//  },
  computed: {
    'webpagePath': function () {
      if (typeof(this.status.webpageURL) === 'string') {
        return '/' + this.status.webpageURL.split('/').slice(3).join('/')
      }
    },
    groupExportLink () {
      return '/admin/GroupDashboard/exportGroupData?webpageID=' + this.$route.params.webpageID + '&groupID=' + this.$route.params.groupID
    }
  },
  watch: {
  },
  mounted() {
    this.initDashboard()
    this.toc = this.$refs.toc
    
  },
  methods: {
    initDashboard: async function () {
      // 先跟伺服器取得webpage的資訊
      let groupID = Number(this.$route.params.groupID)
      let data = {
        webpageID: this.$route.params.webpageID,
        groupID,
      }
      
      let result = await this.lib.AxiosHelper.get('/admin/GroupDashboard/info', data)
      
      this.group = result.group
      this.group.group_seq_id = Number(this.$route.params.groupID)
      //console.log(this.group.users[0])
      //console.log(this.group.socialNetworks)
      
      this.status.webpageURL = result.webpageURL
      this.status.title = this.$t('Group Dashboard') 
              + ' #' + (this.group.group_seq_id+1)
              + ' (' + this.$t('{0} users', this.group.users.length, [this.group.users.length]) + ')'
      
      setTimeout(() => {
        this.drawGraphs()
      }, 100)
    },
    attrHeaderID: function (anchor) {
      return '/group-dashboard/' + this.$route.params.webpageID + '/' + this.$route.params.groupID + '/' + anchor
    },
    nodesTable: function (nodes) {
      let lines = [
        ['id', 'size'].join('\t')
      ]
      
      lines = lines.concat(nodes.map(({id, size}) => [id, size].join('\t')))
      
      return lines.join("\n")
    },
    edgesTable: function (nodes, edges) {
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
    },
    drawGraphs: function () {
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
    },
    initGraph: function (i) {
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
        labelThreshold : 0,
        sideMargin: 0.5,
        minArrowSize: 10,
        minEdgeSize: 1,
        minNodeSize: 3,
        maxEdgeSize: 3,
        defaultEdgeColor: "#00F",
      })
      
      return s
    },
    drawSocialNetworkNodes: function (s, nodes) {
      
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
          //count: node.size
        })
      });
    },
    drawSocialNetworkEdges: function (s, edges) {
      edges.forEach(function(edge, i) {

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
    },
  } // methods
}

export default GroupDashboard