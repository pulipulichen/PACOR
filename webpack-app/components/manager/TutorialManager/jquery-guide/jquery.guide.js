import jQuery from 'jquery'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

// Generated by CoffeeScript 1.8.0
(function() {
  (function($) {
    var jQueryGuide;
    let scrollIntoView = false
    let currentScrollTop
    let isStart = false
    let $window = $(window)
    let $body = $('body')
    let completeCallback
    let vm
    
    let guide
    
    let onWindowResize = () => {
      return guide.draw();
    }
    let onWindowScroll = () => {
      if (scrollIntoView === true) {
        return false
      }
      return guide.draw();
    }
    
    $.guide = function(options) {
      isStart = true
      var action, _i, _len, _ref;
      guide = new jQueryGuide();
      if (options.actions !== void 0) {
        _ref = options.actions;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          action = _ref[_i];
          guide.addAction(action);
        }
      }
      
      if (options.vm) {
        vm = options.vm
      }
      
      completeCallback = options.complete ? options.complete : null
      
      guide.buildLayout();
      guide.layout.bg.click((function(_this) {
        return function() {
          return guide.next();
        };
      })(this));
//      $window.resize((function(_this) {
//        return function() {
//          return guide.draw();
//        };
//      })(this));
      $window.bind('resize', onWindowResize)
//      $window.scroll((function(_this) {
//        return function() {
//          if (scrollIntoView === true) {
//            return false
//          }
//          return guide.draw();
//        };
//      })(this));
      //$window.bind('scroll', onWindowScroll)
      
      $body.addClass('jquery-guide-prevent-scroll')
      
      //throw new Error('currentScrollTop')
      currentScrollTop = window.pageYOffset
      //console.log(currentScrollTop)
      
      guide.execAction();
      return guide;
    };
    return jQueryGuide = (function() {
      function jQueryGuide() {
        this.layout = {
          container: '',
          bg: '',
          content: '',
          glow: null,
          tempRange: ''
        };
        this.step = {
          current: 0,
          status: 0
        };
        this.actionList = [];
      }

      jQueryGuide.prototype.buildLayout = function() {
        var layout, layoutId;
        layoutId = Math.round(Math.random() * 10000);
        layout = $(`<div class="jquery-guide" id="jQueryGuide` + layoutId + `">
            <div class="jquery-guide-bg"></div>
            <div class="jquery-guide-content"></div>
            <div class="jquery-guide-glow"></div>
            <div class="jquery-guide-temp-range"></div>
            <div class="jquery-guide-popup ui popup transition"></div>
        </div>`);
        $body.append(layout);
        this.layout.container = $('#jQueryGuide' + layoutId);
        this.layout.container.click(function (event) {
          event.preventDefault()
          event.stopPropagation()
        })
        
//        this.layout.container.on('scroll', function (event) {
//          event.preventDefault()
//          event.stopPropagation()
//        })
        
        this.layout.bg = this.layout.container.find('>.jquery-guide-bg');
        this.layout.glow = this.layout.container.find('>.jquery-guide-glow');
        this.layout.popup = this.layout.container.find('>.jquery-guide-popup');
        this.layout.tempRange = this.layout.container.find('>.jquery-guide-temp-range');
        this.layout.content = this.layout.container.find('>.jquery-guide-content');
      };

      jQueryGuide.prototype.addAction = function(action) {
        //if (!action.content === void 0) {
        //  this.action.content = "";
        //}
        if (action.offsetX === void 0) {
          action.offsetX = 0;
        }
        if (action.offsetY === void 0) {
          action.offsetY = 0;
        }
        if (action.isBeforeFuncExec === void 0) {
          action.isBeforeFuncExec = false;
        }
        return this.actionList.push(action);
      };
      
      jQueryGuide.prototype.execAfterClick = async function () {
        if (this.step.current === 0) {
          return null
        }
        
        let lastAction = this.actionList[(this.step.current - 1)];
        if (typeof(lastAction.afterClick) === 'function') {
          await lastAction.afterClick()
        }
      }

      jQueryGuide.prototype.execAction = async function() {
        var action;
        //$('body').addClass('jquery-guide-prevent-scroll')
        
        await this.execAfterClick()
        
        action = this.actionList[this.step.current];
        //console.log(this.step.current)
        
        if (this.step.status === 0) {
          this.step.status = 1;
          if (action.beforeFunc !== void 0) {
            action.beforeFunc(this);
          }
          if (action.isBeforeFuncExec) {
            return;
          }
        }
        this.step.status = 2;
        
        /*
        action.element[0].scrollIntoView({
          behavior: "smooth", 
          block: "center", 
          inline: "nearest"
        })
        */
          this.animate(() => {
            
            if (action.successFunc !== void 0) {
              this.step.status = 3;
              return action.successFunc(this);
            }
            //$('body').removeClass('jquery-guide-prevent-scroll')
          });
        
      };

      jQueryGuide.prototype.back = function() {
        if (this.step.current === 0) {
          this.exit();
          return false;
        }
        this.step = {
          current: --this.step.current,
          status: 0
        };
        this.execAction();
        return true;
      };

      jQueryGuide.prototype.next = function() {
        if (this.step.current + 1 === this.actionList.length) {
          this.exit();
          return false;
        }
        this.step = {
          current: ++this.step.current,
          status: 0
        };
        this.execAction();
        return true;
      };

      jQueryGuide.prototype.exit = function() {
        $body.removeClass('jquery-guide-prevent-scroll')
        if (glowTippy && typeof(glowTippy.destroy) === 'function') {
          glowTippy.destroy()
          glowTippy = undefined
        }
        //window.scrollTo({
        vm.lib.style.scrollTo({
          top: currentScrollTop,
          behavior: "smooth", 
        })
        //console.log(currentScrollTop)
        currentScrollTop = undefined
        isStart = false
        
        if (typeof(completeCallback) === 'function') {
            completeCallback()
        }
          
        this.layout.container.fadeOut(() => {
          this.layout.container.remove();
        })
        
        $window.unbind('resize', onWindowResize)
        $window.unbind('scroll', onWindowScroll)
        
        return true
      };

      // --------------------------------
      
      let scrollTimer
      let scrollDetectDelay = 100
      let lastPageYOffset
      let onScrollEvent = function() {
        if (scrollTimer) {
          clearTimeout(scrollTimer)
        }
        //console.log('暫停')
        scrollTimer = setTimeout(() => {
          if (lastPageYOffset !== window.pageYOffset) {
            lastPageYOffset = window.pageYOffset
            onScrollEvent()
            return false
          }
          
          window.removeEventListener('scroll', onScrollEvent)
          //console.log('後續')
          animateCallback()
        }, scrollDetectDelay * 2)
      }

      let actionElement
      jQueryGuide.prototype.animate = async function (callback) {
        this.layout.tempRange.hide()
        this.layout.container.addClass('disabled')
        let action = this.actionList[this.step.current];
        //this.layout.glow.fadeOut('fast')
        this.layout.glow.fadeOut()
        
        // -----------------------------------
        
        let enable = true
        if (typeof(action.enable) === 'function') {
          enable = await action.enable()
        }
        if (enable === false) {
          return this.next()
        }
        
        // -----------------------------------
        
        if (action.backgroundFadeOut === true) {
          this.layout.bg.fadeOut('fast', () => {
            this.layout.bg.css('border-width', '0px')
                    .css('width', '100%')
                    .css('height', '100vh')
          })
        }
        
        if (typeof(action.beforeCallback) === 'function') {
          let result = await action.beforeCallback()
          if (result === false) {
            return this.next()
          }
        }
        
        // ---------------------------------
        
        //console.log(action.element[0])
        scrollIntoView = true
        lastPageYOffset = window.pageYOffset
        animateTemp = {
          action, 
          callback,
          next: () => {this.next()},
          _this: this
        }
        
        //console.log(action.content)
        //console.log(action.element)
        actionElement = action.element
        if (typeof(actionElement) === 'function') {
          actionElement = await actionElement()
        }
        if (!actionElement) {
          return this.next()
        }
        if (typeof(actionElement.$el) === 'object') {
          actionElement = $(actionElement.$el)
        }
        if (actionElement.length > 1) {
          actionElement = this.drawTempRange(actionElement)
        }
        else if (actionElement.length === 0) {
          console.log(`Element is not found`, action)
          return this.next()
        }
        
        let element = actionElement
        
        if (!element) {
          return this.next()
        }
        
        if (typeof(element.scrollIntoView) !== 'function'
                && element[0]
                && typeof(element[0].scrollIntoView) === 'function') {
          element = element[0]
        }
        else if (element.length === 0) {
          console.log(`Element is not found`, action)
          return this.next()
        }
        
        if (!element) {
          return this.next()
        }
        
        // ------------------------------
        
        
        window.addEventListener('scroll', onScrollEvent)
        
        if (action.scroll === false) {
          // do nothing
        }
        else if (!action.scroll) {
//          element.scrollIntoView({
//            behavior: "smooth", 
//            block: "center", 
//            inline: "nearest"
//          })
          
          vm.lib.style.scrollIntoView(element, {
            behavior: "smooth", 
            block: "center", 
            inline: "nearest"
          })
          //console.log('scrollIntoView smooth')
        }
        else if (action.scroll === 'start') {
          let elementTop = actionElement.offset().top
          let padding = 150
          if (padding > (window.innerHeight / 3)) {
            padding = (window.innerHeight / 3)
          }
          let scrollToTop = elementTop - padding

//          window.scrollTo({
//            top: scrollToTop,
//            behavior: "smooth", 
//            block: "start", 
//            inline: "nearest"
//          })
          vm.lib.style.scrollTo({
            top: scrollToTop,
            behavior: "smooth", 
            block: "start", 
            inline: "nearest"
          })
          
          //console.log('scrollIntoView start')
        }
        
        //this.animateCallback(action, callback)
        scrollTimer = setTimeout(() => {
          if (lastPageYOffset !== window.pageYOffset) {
            lastPageYOffset = window.pageYOffset
            onScrollEvent()
            return false
          }
          
          window.removeEventListener('scroll', onScrollEvent)
          //console.log('first')
          animateCallback()
        }, scrollDetectDelay)
      };
      
      let animateTemp = {}
      let animateCallback = function() {
        //console.log('animateCallback')
        let {action, callback, next, _this} = animateTemp
        
        if (action.backgroundFadeOut === true) {
          _this.layout.bg.fadeIn()
        }
        
        
        if (!actionElement) {
          return next()
        }
        else if (typeof(actionElement.offset) !== 'function') {
          //console.error('no offset', actionElement)
          actionElement = $(actionElement)
        }
        if (actionElement.is(':visible') === false) {
          console.error('actionElement is not visible', actionElement)
          return next()
        }
        
        var bgBottomWidth, bgScrollTop, bgTopWidth, scrollTop;
        
        //setTimeout(() => {
          
          
          //action.element[0].scrollIntoView({
          //  behavior: 'smooth'
          //})
          scrollTop = $window.scrollTop();
          bgScrollTop = actionElement.offset().top - scrollTop;
          bgTopWidth = bgScrollTop > 0 ? bgScrollTop : 0;
          bgBottomWidth = (bgScrollTop + actionElement.innerHeight()) > 0 
              ? $window.innerHeight() - (actionElement.innerHeight() + bgScrollTop) : $window.innerHeight();

          //this.layout.bg.show()
          return _this.layout.bg.animate({
            width: actionElement.innerWidth(),
            height: actionElement.innerHeight() + (bgScrollTop < 0 ? bgScrollTop : 0),
            borderTopWidth: bgTopWidth,
            borderRightWidth: $window.innerWidth() - actionElement.offset().left - actionElement.innerWidth() + 1,
            borderBottomWidth: bgBottomWidth,
            borderLeftWidth: actionElement.offset().left
          }, (function() {
            return function() {
              setupGlowPopup(_this, action)
              _this.layout.container.removeClass('disabled')
              //scrollIntoView = false
              callback()
            };
          })(this));
        //}, 500)
      }
      
      let glowTippy
      let setupGlowPopup = function (_this, action) {
        //console.log('需要新增一個div作為框架')
        _this.layout.glow.fadeIn('fast')
        _this.layout.glow.css({
          'width': actionElement.innerWidth() + 'px',
          'height': actionElement.innerHeight() + 'px',
          'top': actionElement.offset().top,
          'left': actionElement.offset().left
        })
        
        let glow = _this.layout.glow
        let tippyInited = true
        if (action.content) {
          if (isStart === false) {
            return false
          }
          
          if (glow.attr('data-tippy-content') === undefined) {
            tippyInited = false
          }
          
          if (tippyInited === false) {
            glow.attr('data-tippy-content', action.content)
            
            glowTippy = tippy(_this.layout.glow[0], {
              theme: 'light',
              //hideOnClick: false
            })
            //window.gt = glowTippy
          }
          else {
            glowTippy.setContent(action.content)
          }
          
          glowTippy.show()
        }
      }

      jQueryGuide.prototype.draw = function() {
        var action, bgBottomWidth, bgScrollTop, bgTopWidth, scrollTop;
        action = this.actionList[this.step.current];
        scrollTop = $window.scrollTop();
        if (!actionElement) {
          return false
        }
        
        bgScrollTop = actionElement.offset().top - scrollTop;
        bgTopWidth = bgScrollTop > 0 ? bgScrollTop : 0;
        bgBottomWidth = (bgScrollTop + actionElement.innerHeight()) > 0 
          ? $window.innerHeight() - (actionElement.innerHeight() + bgScrollTop) : $window.innerHeight();
        this.layout.bg.css({
          width: actionElement.innerWidth(),
          height: actionElement.innerHeight() + (bgScrollTop < 0 ? bgScrollTop : 0),
          borderTopWidth: bgTopWidth,
          borderRightWidth: $window.innerWidth() - actionElement.offset().left - actionElement.innerWidth(),
          borderBottomWidth: bgBottomWidth,
          borderLeftWidth: actionElement.offset().left
        });
        setupGlowPopup(this, action)
        return this.layout.content.css({
          top: actionElement.offset().top + action.offsetY,
          left: actionElement.offset().left + action.offsetX
        });
      };  // jQueryGuide.prototype.draw = function() {
      
      jQueryGuide.prototype.drawTempRange = function(elements) {
        let top, left, bottom, right
        for (let i = 0; i < elements.length; i++) {
          let element = elements.eq(i)
          let offset = element.offset()
          let t = offset.top
          let l = offset.left
          let w = element.width()
          let r = l + w
          let h = element.height()
          let b = t + h
          
          if (i === 0) {
            top = t
            left = l
            bottom = b
            right = r
          }
          else {
            top = Math.min(top, t)
            left = Math.min(left, l)
            bottom = Math.max(bottom, b)
            right = Math.max(right, right)
          }
          //console.log(top, left, bottom, right)
        }
        
        if (top === 0 && bottom === 0) {
          console.error('Elements is not found', elements)
          return undefined
        }
        
        this.layout.tempRange.show()
                .css({
                  top: top + 'px',
                  left: left + 'px',
                  width: (right - left) + 'px',
                  height: (bottom - top) + 'px'
                })
                
        return this.layout.tempRange
      };  //  jQueryGuide.prototype.drawTempRange = function(elements) {

      return jQueryGuide;

    })();
  })(jQuery);

}).call(this);
