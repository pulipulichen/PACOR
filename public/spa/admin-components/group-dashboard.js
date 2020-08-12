(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-components/group-dashboard"],{

/***/ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/GroupDashboard/GroupDashboard.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CGroupDashboard%5CGroupDashboard.vue&lang=yaml":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@kazupon/vue-i18n-loader/lib!./webpack-app/admin/GroupDashboard/GroupDashboard.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CGroupDashboard%5CGroupDashboard.vue&lang=yaml ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (Component) {
  Component.options.__i18n = Component.options.__i18n || []
  Component.options.__i18n.push('{"en":null,"zh-TW":{"Group Members":"小組成員","Group Dashboard":"小組儀表板","Collaborative Reading Times":"協助閱讀時間","Social Networks":"互動分析","Period":"時期","Graphs":"互動圖","Social Networks Data":"互動資料","Social Networks Graph":"互動圖","Export Group Data":"匯出小組資料","Dashboard Mode":"儀表板設定","Completed":"完成的成員","All":"所有成員"}}')
  delete Component.options._Ctor
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/GroupDashboard/GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/GroupDashboard/GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".gruop-seq-id-header[data-v-38ec61a3] {\n  margin-top: 0 !important;\n}\n.graph-container[data-v-38ec61a3] {\n  width: 400px;\n  height: 400px;\n  border: 1px solid #CCC;\n}\n.period-container[data-v-38ec61a3]:not(:last-of-type) {\n  border-bottom: 1px solid #CCC;\n  margin-bottom: 1rem;\n  padding-bottom: 1rem;\n}\n.period-graph-container[data-v-38ec61a3] {\n  display: inline-block;\n  margin-right: 0.5rem;\n  margin-bottom: 1rem;\n}\n", "",{"version":3,"sources":["GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true&"],"names":[],"mappings":"AAAA;EACE,wBAAwB;AAC1B;AACA;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;AACxB;AACA;EACE,6BAA6B;EAC7B,mBAAmB;EACnB,oBAAoB;AACtB;AACA;EACE,qBAAqB;EACrB,oBAAoB;EACpB,mBAAmB;AACrB","file":"GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true&","sourcesContent":[".gruop-seq-id-header[data-v-38ec61a3] {\n  margin-top: 0 !important;\n}\n.graph-container[data-v-38ec61a3] {\n  width: 400px;\n  height: 400px;\n  border: 1px solid #CCC;\n}\n.period-container[data-v-38ec61a3]:not(:last-of-type) {\n  border-bottom: 1px solid #CCC;\n  margin-bottom: 1rem;\n  padding-bottom: 1rem;\n}\n.period-graph-container[data-v-38ec61a3] {\n  display: inline-block;\n  margin-right: 0.5rem;\n  margin-bottom: 1rem;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/GroupDashboard/GroupDashboard.html?vue&type=template&id=38ec61a3&scoped=true&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./webpack-app/admin/GroupDashboard/GroupDashboard.html?vue&type=template&id=38ec61a3&scoped=true& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "ui form UserDashboard" },
    [
      _c("div", { staticClass: "ui secondary menu" }, [
        _c(
          "a",
          {
            staticClass: "icon item",
            attrs: {
              href: "#/webpage-dashboard/" + _vm.$route.params.webpageID
            }
          },
          [_c("i", { staticClass: "angle left icon" })]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "item" }, [
          _c("div", { staticClass: "ui header" }, [
            _c("div", { staticClass: "content" }, [
              _c("div", { staticClass: "sub header" }, [
                _vm._v(_vm._s(_vm.webpagePath))
              ]),
              _vm._v(" "),
              _c("h2", { staticClass: "gruop-seq-id-header" }, [
                _vm._v(
                  "\r\n            " +
                    _vm._s(_vm.$t("Group")) +
                    " #" +
                    _vm._s(_vm.group.group_seq_id + 1) +
                    " (" +
                    _vm._s(
                      _vm.$t("{0} users", _vm.group.users.length, [
                        _vm.group.users.length
                      ])
                    ) +
                    ")\r\n          "
                )
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "right menu" }, [
          _c(
            "a",
            {
              staticClass: "ui item",
              attrs: { href: _vm.status.webpageURL, target: "_blank" }
            },
            [
              _c("i", { staticClass: "external link icon" }),
              _vm._v(
                "\r\n        " + _vm._s(_vm.$t("Open Webpage")) + "\r\n      "
              )
            ]
          ),
          _vm._v(" "),
          (_vm.status.role = "global_admin")
            ? _c(
                "a",
                {
                  staticClass: "ui item",
                  attrs: {
                    href: "/admin/Database/admin?table=reading_progresses",
                    target: "_blank"
                  }
                },
                [
                  _c("i", { staticClass: "database icon" }),
                  _vm._v(
                    "\r\n        " + _vm._s(_vm.$t("Database")) + "\r\n      "
                  )
                ]
              )
            : _vm._e()
        ])
      ]),
      _vm._v(" "),
      _c("table-of-contents", {
        ref: "toc",
        attrs: { config: _vm.config, lib: _vm.lib, headings: "h3, h4" }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "ui segment" }, [
        _c("h3", { attrs: { id: _vm.attrHeaderID("configuration") } }, [
          _vm._v("\r\n      " + _vm._s(_vm.$t("Configuration")) + "\r\n    ")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "ui form" }, [
          _c("div", { staticClass: "grouped fields" }, [
            _c("label", [_vm._v(_vm._s(_vm.$t("Dashboard Mode")))]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "ui radio checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.dashboardFilterMode,
                      expression: "dashboardFilterMode"
                    }
                  ],
                  attrs: {
                    type: "radio",
                    name: "dashboardMode",
                    value: "onlyCompleted",
                    id: "dashboardFilterMode_onlyCompleted"
                  },
                  domProps: {
                    checked: _vm._q(_vm.dashboardFilterMode, "onlyCompleted")
                  },
                  on: {
                    change: function($event) {
                      _vm.dashboardFilterMode = "onlyCompleted"
                    }
                  }
                }),
                _vm._v(" "),
                _c(
                  "label",
                  { attrs: { for: "dashboardFilterMode_onlyCompleted" } },
                  [
                    _vm._v(
                      "\r\n              " +
                        _vm._s(_vm.$t("Completed")) +
                        "\r\n            "
                    )
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "ui radio checkbox" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.dashboardFilterMode,
                      expression: "dashboardFilterMode"
                    }
                  ],
                  attrs: {
                    type: "radio",
                    name: "dashboardMode",
                    value: "all",
                    id: "dashboardFilterMode_all"
                  },
                  domProps: { checked: _vm._q(_vm.dashboardFilterMode, "all") },
                  on: {
                    change: function($event) {
                      _vm.dashboardFilterMode = "all"
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", { attrs: { for: "dashboardFilterMode_all" } }, [
                  _vm._v(
                    "\r\n              " +
                      _vm._s(_vm.$t("All")) +
                      "\r\n            "
                  )
                ])
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "ui segment" }, [
        _c("h3", { attrs: { id: _vm.attrHeaderID("groupMembers") } }, [
          _vm._v("\r\n      " + _vm._s(_vm.$t("Group Members")) + "\r\n    ")
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "ui cards" },
          _vm._l(_vm.group.users, function(groupUser) {
            return _c("reader-card", {
              attrs: {
                user: groupUser,
                lib: _vm.lib,
                status: _vm.status,
                config: _vm.config,
                viewOnNewWindow: true
              }
            })
          }),
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "ui segment" },
        [
          _c("h3", { attrs: { id: _vm.attrHeaderID("socialNetworksData") } }, [
            _vm._v(
              "\r\n      " + _vm._s(_vm.$t("Social Networks Data")) + "\r\n    "
            )
          ]),
          _vm._v(" "),
          _vm._l(_vm.group.socialNetworks, function(sn, i) {
            return _c("div", { staticClass: "period-container" }, [
              _c(
                "h4",
                { attrs: { id: _vm.attrHeaderID("socialNetworks" + i) } },
                [
                  _vm._v(
                    "\r\n        " +
                      _vm._s(_vm.$t("Period")) +
                      " " +
                      _vm._s(i + 1) +
                      ":\r\n        " +
                      _vm._s(sn.startTimestamp) +
                      "\r\n        - \r\n        " +
                      _vm._s(sn.endTimestamp) +
                      "\r\n      "
                  )
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "ui form" }, [
                _c("div", { staticClass: "two fields" }, [
                  _c("div", { staticClass: "field" }, [
                    _c("label", [
                      _vm._v(
                        "\r\n              " +
                          _vm._s(_vm.$t("Nodes")) +
                          "\r\n            "
                      )
                    ]),
                    _vm._v(" "),
                    _c("textarea", {
                      domProps: { innerHTML: _vm._s(_vm.nodesTable(sn.nodes)) }
                    })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "field" }, [
                    _c("label", [
                      _vm._v(
                        "\r\n              " +
                          _vm._s(_vm.$t("Edges")) +
                          "\r\n            "
                      )
                    ]),
                    _vm._v(" "),
                    _c("textarea", {
                      domProps: {
                        innerHTML: _vm._s(_vm.edgesTable(sn.nodes, sn.edges))
                      }
                    })
                  ])
                ])
              ])
            ])
          })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "ui segment" },
        [
          _c("h3", { attrs: { id: _vm.attrHeaderID("socialNetworksGraph") } }, [
            _vm._v(
              "\r\n      " +
                _vm._s(_vm.$t("Social Networks Graph")) +
                "\r\n    "
            )
          ]),
          _vm._v(" "),
          _vm._l(_vm.group.socialNetworks, function(sn, i) {
            return _c("div", { staticClass: "period-graph-container" }, [
              _c(
                "h4",
                { attrs: { id: _vm.attrHeaderID("socialNetworksGraphs" + i) } },
                [
                  _vm._v(
                    "\r\n          " +
                      _vm._s(_vm.$t("Graphs")) +
                      " " +
                      _vm._s(i + 1) +
                      ":\r\n          " +
                      _vm._s(sn.startTimestamp) +
                      "\r\n          - \r\n          " +
                      _vm._s(sn.endTimestamp) +
                      "\r\n        "
                  )
                ]
              ),
              _vm._v(" "),
              _c("div", {
                staticClass: "graph-container",
                attrs: { id: "graph_container_" + i }
              })
            ])
          })
        ],
        2
      ),
      _vm._v(" "),
      _c("div", { staticClass: "ui segment" }, [
        _c("h3", { attrs: { id: _vm.attrHeaderID("export") } }, [
          _vm._v("\r\n      " + _vm._s(_vm.$t("Export")) + "\r\n    ")
        ]),
        _vm._v(" "),
        _c("form", { staticClass: "ui form" }, [
          _c(
            "a",
            {
              staticClass: "ui fluid button",
              attrs: { href: _vm.groupExportLink }
            },
            [
              _c("i", { staticClass: "download icon" }),
              _vm._v(
                "\r\n        " +
                  _vm._s(_vm.$t("Export Group Data")) +
                  "\r\n      "
              )
            ]
          )
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/GroupDashboard/GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js??ref--1-2!./webpack-app/admin/GroupDashboard/GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true& */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/GroupDashboard/GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("482bb739", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./webpack-app/admin/GroupDashboard/GroupDashboard.html?vue&type=template&id=38ec61a3&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./webpack-app/admin/GroupDashboard/GroupDashboard.html?vue&type=template&id=38ec61a3&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_GroupDashboard_html_vue_type_template_id_38ec61a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./GroupDashboard.html?vue&type=template&id=38ec61a3&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./webpack-app/admin/GroupDashboard/GroupDashboard.html?vue&type=template&id=38ec61a3&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_GroupDashboard_html_vue_type_template_id_38ec61a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_GroupDashboard_html_vue_type_template_id_38ec61a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./webpack-app/admin/GroupDashboard/GroupDashboard.js?vue&type=script&lang=js&?2f87":
/*!*************************************************************************************!*\
  !*** ./webpack-app/admin/GroupDashboard/GroupDashboard.js?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sigma_webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sigma-webpack */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\sigma-webpack\\build\\sigma.require.js");
/* harmony import */ var sigma_webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sigma_webpack__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sigma_js_plugins_sigma_plugins_dragNodes_sigma_plugins_dragNodes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sigma.js/plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js */ "./webpack-app/admin/GroupDashboard/sigma.js/plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js");
/* harmony import */ var _sigma_js_plugins_sigma_exporters_svg_sigma_exporters_svg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sigma.js/plugins/sigma.exporters.svg/sigma.exporters.svg.js */ "./webpack-app/admin/GroupDashboard/sigma.js/plugins/sigma.exporters.svg/sigma.exporters.svg.js");
/* harmony import */ var _sigma_js_plugins_sigma_exporters_svg_sigma_exporters_svg_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sigma_js_plugins_sigma_exporters_svg_sigma_exporters_svg_js__WEBPACK_IMPORTED_MODULE_2__);
//import sigmaWebpack from 'sigma-webpack'
//console.log(Object.keys(sigmaWebpack))


//import './sigma.js/plugins/sigma.layout.forceAtlas2/sigma.layout.forceAtlas2.webpack.js'



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
      },
      dashboardFilterMode: 'onlyCompleted' // 'all' || 'onlyCompleted'
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
    dashboardFilterMode () {
      this.initDashboard()
    }
  },
  mounted() {
    this.initDashboard()
    this.toc = this.$refs.toc
    
  },
  methods: {
    initDashboard: async function () {
      // 先跟伺服器取得webpage的資訊
      this.reset()
      
      let groupID = Number(this.$route.params.groupID)
      let data = {
        webpageID: this.$route.params.webpageID,
        groupID,
        dashboardFilterMode: this.dashboardFilterMode
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
    reset: function () {
      this.group.socialNetworks = []
      this.group.users = []
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
          
          let dragListener = sigma_webpack__WEBPACK_IMPORTED_MODULE_0__["sigma"].plugins.dragNodes(s, s.renderers[0])
          
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
        
      let s = new sigma_webpack__WEBPACK_IMPORTED_MODULE_0__["sigma"]({ 
        //container: containerID,

        // canvas renderer
        // ===============
        renderer: {
          container: document.getElementById(containerID),
          type: sigma_webpack__WEBPACK_IMPORTED_MODULE_0__["sigma"].renderers.canvas
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

/* harmony default export */ __webpack_exports__["default"] = (GroupDashboard);

/***/ }),

/***/ "./webpack-app/admin/GroupDashboard/GroupDashboard.js?vue&type=script&lang=js&?7062":
/*!*************************************************************************************!*\
  !*** ./webpack-app/admin/GroupDashboard/GroupDashboard.js?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GroupDashboard_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./GroupDashboard.js?vue&type=script&lang=js& */ "./webpack-app/admin/GroupDashboard/GroupDashboard.js?vue&type=script&lang=js&?2f87");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_GroupDashboard_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./webpack-app/admin/GroupDashboard/GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true&":
/*!************************************************************************************************************************!*\
  !*** ./webpack-app/admin/GroupDashboard/GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_GroupDashboard_less_vue_type_style_index_0_id_38ec61a3_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js?!./webpack-app/admin/GroupDashboard/GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_GroupDashboard_less_vue_type_style_index_0_id_38ec61a3_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_GroupDashboard_less_vue_type_style_index_0_id_38ec61a3_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_GroupDashboard_less_vue_type_style_index_0_id_38ec61a3_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_GroupDashboard_less_vue_type_style_index_0_id_38ec61a3_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_sourceMap_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_ref_1_2_GroupDashboard_less_vue_type_style_index_0_id_38ec61a3_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/GroupDashboard/GroupDashboard.vue":
/*!*************************************************************!*\
  !*** ./webpack-app/admin/GroupDashboard/GroupDashboard.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GroupDashboard_html_vue_type_template_id_38ec61a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GroupDashboard.html?vue&type=template&id=38ec61a3&scoped=true& */ "./webpack-app/admin/GroupDashboard/GroupDashboard.html?vue&type=template&id=38ec61a3&scoped=true&");
/* harmony import */ var _GroupDashboard_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GroupDashboard.js?vue&type=script&lang=js& */ "./webpack-app/admin/GroupDashboard/GroupDashboard.js?vue&type=script&lang=js&?7062");
/* empty/unused harmony star reexport *//* harmony import */ var _GroupDashboard_less_vue_type_style_index_0_id_38ec61a3_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true& */ "./webpack-app/admin/GroupDashboard/GroupDashboard.less?vue&type=style&index=0&id=38ec61a3&lang=less&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _GroupDashboard_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CGroupDashboard_5CGroupDashboard_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GroupDashboard.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CGroupDashboard%5CGroupDashboard.vue&lang=yaml */ "./webpack-app/admin/GroupDashboard/GroupDashboard.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CGroupDashboard%5CGroupDashboard.vue&lang=yaml");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _GroupDashboard_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GroupDashboard_html_vue_type_template_id_38ec61a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GroupDashboard_html_vue_type_template_id_38ec61a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "38ec61a3",
  null
  
)

/* custom blocks */

if (typeof _GroupDashboard_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CGroupDashboard_5CGroupDashboard_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"] === 'function') Object(_GroupDashboard_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CGroupDashboard_5CGroupDashboard_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_4__["default"])(component)

/* hot reload */
if (false) { var api; }
component.options.__file = "webpack-app/admin/GroupDashboard/GroupDashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./webpack-app/admin/GroupDashboard/GroupDashboard.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CGroupDashboard%5CGroupDashboard.vue&lang=yaml":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./webpack-app/admin/GroupDashboard/GroupDashboard.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CGroupDashboard%5CGroupDashboard.vue&lang=yaml ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_GroupDashboard_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CGroupDashboard_5CGroupDashboard_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/@kazupon/vue-i18n-loader/lib!./GroupDashboard.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CGroupDashboard%5CGroupDashboard.vue&lang=yaml */ "./node_modules/@kazupon/vue-i18n-loader/lib/index.js!./webpack-app/admin/GroupDashboard/GroupDashboard.yaml?vue&type=custom&index=0&blockType=i18n&issuerPath=D%3A%5Cxampp%5Chtdocs%5Cprojects-nodejs%5CPACOR%5Cwebpack-app%5Cadmin%5CGroupDashboard%5CGroupDashboard.vue&lang=yaml");
/* harmony import */ var _node_modules_kazupon_vue_i18n_loader_lib_index_js_GroupDashboard_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CGroupDashboard_5CGroupDashboard_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_kazupon_vue_i18n_loader_lib_index_js_GroupDashboard_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CGroupDashboard_5CGroupDashboard_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_kazupon_vue_i18n_loader_lib_index_js_GroupDashboard_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CGroupDashboard_5CGroupDashboard_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_kazupon_vue_i18n_loader_lib_index_js_GroupDashboard_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CGroupDashboard_5CGroupDashboard_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_kazupon_vue_i18n_loader_lib_index_js_GroupDashboard_yaml_vue_type_custom_index_0_blockType_i18n_issuerPath_D_3A_5Cxampp_5Chtdocs_5Cprojects_nodejs_5CPACOR_5Cwebpack_app_5Cadmin_5CGroupDashboard_5CGroupDashboard_vue_lang_yaml__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./webpack-app/admin/GroupDashboard/sigma.js/plugins/sigma.exporters.svg/sigma.exporters.svg.js":
/*!******************************************************************************************************!*\
  !*** ./webpack-app/admin/GroupDashboard/sigma.js/plugins/sigma.exporters.svg/sigma.exporters.svg.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "http://pc.pulipuli.info:443/spa/asset/sigma.exporters.svg.js";

/***/ }),

/***/ "./webpack-app/admin/GroupDashboard/sigma.js/plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js":
/*!**************************************************************************************************************!*\
  !*** ./webpack-app/admin/GroupDashboard/sigma.js/plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js ***!
  \**************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sigma_webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sigma-webpack */ "C:\\Users\\pudding\\AppData\\Roaming\\npm\\node_modules\\sigma-webpack\\build\\sigma.require.js");
/* harmony import */ var sigma_webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sigma_webpack__WEBPACK_IMPORTED_MODULE_0__);


/**
 * This plugin provides a method to drag & drop nodes. Check the
 * sigma.plugins.dragNodes function doc or the examples/basic.html &
 * examples/api-candy.html code samples to know more.
 */
(function() {
  'use strict';

  if (typeof sigma_webpack__WEBPACK_IMPORTED_MODULE_0__["sigma"] === 'undefined')
    throw 'sigma is not declared';

  sigma_webpack__WEBPACK_IMPORTED_MODULE_0__["sigma"].utils.pkg('sigma.plugins');


  /**
   * This function will add `mousedown`, `mouseup` & `mousemove` events to the
   * nodes in the `overNode`event to perform drag & drop operations. It uses
   * `linear interpolation` [http://en.wikipedia.org/wiki/Linear_interpolation]
   * and `rotation matrix` [http://en.wikipedia.org/wiki/Rotation_matrix] to
   * calculate the X and Y coordinates from the `cam` or `renderer` node
   * attributes. These attributes represent the coordinates of the nodes in
   * the real container, not in canvas.
   *
   * Fired events:
   * *************
   * startdrag  Fired at the beginning of the drag.
   * drag       Fired while the node is dragged.
   * drop       Fired at the end of the drag if the node has been dragged.
   * dragend    Fired at the end of the drag.
   *
   * Recognized parameters:
   * **********************
   * @param  {sigma}    s        The related sigma instance.
   * @param  {renderer} renderer The related renderer instance.
   */
  function DragNodes(s, renderer) {
    sigma_webpack__WEBPACK_IMPORTED_MODULE_0__["sigma"].classes.dispatcher.extend(this);

    // A quick hardcoded rule to prevent people from using this plugin with the
    // WebGL renderer (which is impossible at the moment):
    // if (
    //   sigma.renderers.webgl &&
    //   renderer instanceof sigma.renderers.webgl
    // )
    //   throw new Error(
    //     'The sigma.plugins.dragNodes is not compatible with the WebGL renderer'
    //   );

    // Init variables:
    var _self = this,
      _s = s,
      _body = document.body,
      _renderer = renderer,
      _mouse = renderer.container.lastChild,
      _camera = renderer.camera,
      _node = null,
      _prefix = '',
      _hoverStack = [],
      _hoverIndex = {},
      _isMouseDown = false,
      _isMouseOverCanvas = false,
      _drag = false;

    if (renderer instanceof sigma_webpack__WEBPACK_IMPORTED_MODULE_0__["sigma"].renderers.svg) {
        _mouse = renderer.container.firstChild;
    }

    // It removes the initial substring ('read_') if it's a WegGL renderer.
    if (renderer instanceof sigma_webpack__WEBPACK_IMPORTED_MODULE_0__["sigma"].renderers.webgl) {
      _prefix = renderer.options.prefix.substr(5);
    } else {
      _prefix = renderer.options.prefix;
    }

    renderer.bind('overNode', nodeMouseOver);
    renderer.bind('outNode', treatOutNode);
    renderer.bind('click', click);

    _s.bind('kill', function() {
      _self.unbindAll();
    });

    /**
     * Unbind all event listeners.
     */
    this.unbindAll = function() {
      _mouse.removeEventListener('mousedown', nodeMouseDown);
      _body.removeEventListener('mousemove', nodeMouseMove);
      _body.removeEventListener('mouseup', nodeMouseUp);
      _renderer.unbind('overNode', nodeMouseOver);
      _renderer.unbind('outNode', treatOutNode);
    }

    // Calculates the global offset of the given element more accurately than
    // element.offsetTop and element.offsetLeft.
    function calculateOffset(element) {
      var style = window.getComputedStyle(element);
      var getCssProperty = function(prop) {
        return parseInt(style.getPropertyValue(prop).replace('px', '')) || 0;
      };
      return {
        left: element.getBoundingClientRect().left + getCssProperty('padding-left'),
        top: element.getBoundingClientRect().top + getCssProperty('padding-top')
      };
    };

    function click(event) {
      // event triggered at the end of the click
      _isMouseDown = false;
      _body.removeEventListener('mousemove', nodeMouseMove);
      _body.removeEventListener('mouseup', nodeMouseUp);

      if (!_hoverStack.length) {
        _node = null;
      }
    };

    function nodeMouseOver(event) {
      // Don't treat the node if it is already registered
      if (_hoverIndex[event.data.node.id]) {
        return;
      }

      // Add node to array of current nodes over
      _hoverStack.push(event.data.node);
      _hoverIndex[event.data.node.id] = true;

      if(_hoverStack.length && ! _isMouseDown) {
        // Set the current node to be the last one in the array
        _node = _hoverStack[_hoverStack.length - 1];
        _mouse.addEventListener('mousedown', nodeMouseDown);
      }
    };

    function treatOutNode(event) {
      // Remove the node from the array
      var indexCheck = _hoverStack.map(function(e) { return e; }).indexOf(event.data.node);
      _hoverStack.splice(indexCheck, 1);
      delete _hoverIndex[event.data.node.id];

      if(_hoverStack.length && ! _isMouseDown) {
        // On out, set the current node to be the next stated in array
        _node = _hoverStack[_hoverStack.length - 1];
      } else {
        _mouse.removeEventListener('mousedown', nodeMouseDown);
      }
    };

    function nodeMouseDown(event) {
      _isMouseDown = true;
      var size = _s.graph.nodes().length;

      // when there is only node in the graph, the plugin cannot apply
      // linear interpolation. So treat it as if a user is dragging
      // the graph
      if (_node && size > 1) {
        _mouse.removeEventListener('mousedown', nodeMouseDown);
        _body.addEventListener('mousemove', nodeMouseMove);
        _body.addEventListener('mouseup', nodeMouseUp);

        // Do not refresh edgequadtree during drag:
        var k,
            c;
        for (k in _s.cameras) {
          c = _s.cameras[k];
          if (c.edgequadtree !== undefined) {
            c.edgequadtree._enabled = false;
          }
        }

        // Deactivate drag graph.
        _renderer.settings({mouseEnabled: false, enableHovering: false});
        _s.refresh();

        _self.dispatchEvent('startdrag', {
          node: _node,
          captor: event,
          renderer: _renderer
        });
      }
    };

    function nodeMouseUp(event) {
      _isMouseDown = false;
      _mouse.addEventListener('mousedown', nodeMouseDown);
      _body.removeEventListener('mousemove', nodeMouseMove);
      _body.removeEventListener('mouseup', nodeMouseUp);

      // Allow to refresh edgequadtree:
      var k,
          c;
      for (k in _s.cameras) {
        c = _s.cameras[k];
        if (c.edgequadtree !== undefined) {
          c.edgequadtree._enabled = true;
        }
      }

      // Activate drag graph.
      _renderer.settings({mouseEnabled: true, enableHovering: true});
      _s.refresh();

      if (_drag) {
        _self.dispatchEvent('drop', {
          node: _node,
          captor: event,
          renderer: _renderer
        });
      }
      _self.dispatchEvent('dragend', {
        node: _node,
        captor: event,
        renderer: _renderer
      });

      _drag = false;
      _node = null;
    };

    function nodeMouseMove(event) {
      if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        clearTimeout(timeOut);
        var timeOut = setTimeout(executeNodeMouseMove, 0);
      } else {
        executeNodeMouseMove();
      }

      function executeNodeMouseMove() {
        var offset = calculateOffset(_renderer.container),
            x = event.clientX - offset.left,
            y = event.clientY - offset.top,
            cos = Math.cos(_camera.angle),
            sin = Math.sin(_camera.angle),
            nodes = _s.graph.nodes(),
            ref = [];

        // Getting and derotating the reference coordinates.
        for (var i = 0; i < 2; i++) {
          var n = nodes[i];
          var aux = {
            x: n.x * cos + n.y * sin,
            y: n.y * cos - n.x * sin,
            renX: n[_prefix + 'x'],
            renY: n[_prefix + 'y'],
          };
          ref.push(aux);
        }

        // Applying linear interpolation.
        // if the nodes are on top of each other, we use the camera ratio to interpolate
        if (ref[0].x === ref[1].x && ref[0].y === ref[1].y) {
          var xRatio = (ref[0].renX === 0) ? 1 : ref[0].renX;
          var yRatio = (ref[0].renY === 0) ? 1 : ref[0].renY;
          x = (ref[0].x / xRatio) * (x - ref[0].renX) + ref[0].x;
          y = (ref[0].y / yRatio) * (y - ref[0].renY) + ref[0].y;
        } else {
          var xRatio = (ref[1].renX - ref[0].renX) / (ref[1].x - ref[0].x);
          var yRatio = (ref[1].renY - ref[0].renY) / (ref[1].y - ref[0].y);

          // if the coordinates are the same, we use the other ratio to interpolate
          if (ref[1].x === ref[0].x) {
            xRatio = yRatio;
          }

          if (ref[1].y === ref[0].y) {
            yRatio = xRatio;
          }

          x = (x - ref[0].renX) / xRatio + ref[0].x;
          y = (y - ref[0].renY) / yRatio + ref[0].y;
        }

        // Rotating the coordinates.
        _node.x = x * cos - y * sin;
        _node.y = y * cos + x * sin;

        _s.refresh();

        _drag = true;
        _self.dispatchEvent('drag', {
          node: _node,
          captor: event,
          renderer: _renderer
        });
      }
    };
  };

  /**
   * Interface
   * ------------------
   *
   * > var dragNodesListener = sigma.plugins.dragNodes(s, s.renderers[0]);
   */
  var _instance = {};

  /**
   * @param  {sigma} s The related sigma instance.
   * @param  {renderer} renderer The related renderer instance.
   */
  sigma_webpack__WEBPACK_IMPORTED_MODULE_0__["sigma"].plugins.dragNodes = function(s, renderer) {
    // Create object if undefined
    if (!_instance[s.id]) {
      _instance[s.id] = new DragNodes(s, renderer);
    }

    s.bind('kill', function() {
      sigma_webpack__WEBPACK_IMPORTED_MODULE_0__["sigma"].plugins.killDragNodes(s);
    });

    return _instance[s.id];
  };

  /**
   * This method removes the event listeners and kills the dragNodes instance.
   *
   * @param  {sigma} s The related sigma instance.
   */
  sigma_webpack__WEBPACK_IMPORTED_MODULE_0__["sigma"].plugins.killDragNodes = function(s) {
    if (_instance[s.id] instanceof DragNodes) {
      _instance[s.id].unbindAll();
      delete _instance[s.id];
    }
  };

}).call(window);


/***/ })

}]);
//# sourceMappingURL=group-dashboard.js.map