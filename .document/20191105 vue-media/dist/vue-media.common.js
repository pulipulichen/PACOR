/*!
 * vue-media v1.1.1
 * (c) 2017-present egoist <0x142857@gmail.com>
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var json2mq = _interopDefault(require('json2mq'));

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
    var mediaQuery = json2mq(query);
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

module.exports = Media;
