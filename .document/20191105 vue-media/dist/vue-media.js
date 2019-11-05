/*!
 * vue-media v1.1.1
 * (c) 2017-present egoist <0x142857@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Media = factory());
}(this, (function () { 'use strict';

var camel2hyphen = function (str) {
  return str
          .replace(/[A-Z]/g, function (match) {
            return '-' + match.toLowerCase();
          })
          .toLowerCase();
};

var camel2hyphen_1 = camel2hyphen;

var isDimension = function (feature) {
  var re = /[height|width]$/;
  return re.test(feature);
};

var obj2mq = function (obj) {
  var mq = '';
  var features = Object.keys(obj);
  features.forEach(function (feature, index) {
    var value = obj[feature];
    feature = camel2hyphen_1(feature);
    // Add px to dimension features
    if (isDimension(feature) && typeof value === 'number') {
      value = value + 'px';
    }
    if (value === true) {
      mq += feature;
    } else if (value === false) {
      mq += 'not ' + feature;
    } else {
      mq += '(' + feature + ': ' + value + ')';
    }
    if (index < features.length-1) {
      mq += ' and ';
    }
  });
  return mq;
};

var json2mq = function (query) {
  var mq = '';
  if (typeof query === 'string') {
    return query;
  }
  // Handling array of media queries
  if (query instanceof Array) {
    query.forEach(function (q, index) {
      mq += obj2mq(q);
      if (index < query.length-1) {
        mq += ', ';
      }
    });
    return mq;
  }
  // Handling single media query
  return obj2mq(query);
};

var index = json2mq;

var Media = {
  name: 'media',
  props: {
    query: {
      type: [Object, String],
      required: true
    },
    visibleByDefault: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      matches: this.visibleByDefault
    }
  },
  methods: {
    updateMatches: function updateMatches() {
      this.matches = this.mediaQueryList.matches;
    }
  },
  mounted: function mounted() {
    var ref = this;
    var query = ref.query;
    var matches = ref.matches;
    if (typeof window === 'undefined') {
      return matches
    }
    var mediaQuery = index(query);
    this.mediaQueryList = window.matchMedia(mediaQuery);
    this.updateMatches();
    this.mediaQueryList.addListener(this.updateMatches);
  },
  render: function render() {
    if (this.matches && this.$slots.default && this.$slots.default.length > 0) {
      return this.$slots.default[0]
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.mediaQueryList) {
      this.mediaQueryList.removeListener(this.updateMatches);
    }
  },
  watch: {
    matches: function matches(newMatch) {
      if (this.mediaQueryList) {
        newMatch
          ? this.$emit('media-enter', this.mediaQueryList.media)
          : this.$emit('media-leave', this.mediaQueryList.media);
      }
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(Media.name, Media);
}

return Media;

})));
