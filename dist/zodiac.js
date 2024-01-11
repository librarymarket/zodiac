var Zodiac = (function () {
  'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /**
   * Defines a zodiac slider event.
   */

  /**
   * Provides an event bus for tracking slider related events.
   */
  var EventBus = /*#__PURE__*/function () {
    /**
     * A list of subscribed events.
     */

    function EventBus() {
      _classCallCheck(this, EventBus);
      this.events = [];
    }

    /**
     * Emits events by name with arguments for the callback function.
     *
     * @param names - The event names to emit.
     * @param args - Arguments for the callback function.
     */
    _createClass(EventBus, [{
      key: "emit",
      value: function emit(names) {
        var _this = this;
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        names.forEach(function (name) {
          _this.filterByName(name).forEach(function (event) {
            event.callback.apply(event, args);
          });
        });
      }

      /**
       * Unsubscribes event(s) by name(s).
       *
       * @param names - A list of event names to unsubscribe.
       */
    }, {
      key: "off",
      value: function off(names) {
        var _this2 = this;
        var _iterator = _createForOfIteratorHelper(names),
          _step;
        try {
          var _loop = function _loop() {
            var name = _step.value;
            _this2.events = _this2.events.filter(function (event) {
              return event.name !== name;
            });
          };
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      /**
       * Subscribes an event with a callback function.
       *
       * @param names - A list of event names to subscribe to.
       * @param callback - A callback function to run on the events.
       */
    }, {
      key: "on",
      value: function on(names, callback) {
        var _this3 = this;
        names.forEach(function (name) {
          return _this3.events.push({
            name: name,
            callback: callback
          });
        });
      }

      /**
       * Filter events by name.
       *
       * @param name - The name to filter by.
       *
       * @returns The result event set.
       */
    }, {
      key: "filterByName",
      value: function filterByName(name) {
        return this.events.filter(function (event) {
          return event.name === name;
        });
      }
    }]);
    return EventBus;
  }();

  /**
   * A collection of classes used by the slider to identify specific elements.
   *
   * These classes cannot be set in the media query options.
   */

  /**
   * A collection of options used to configure the slider.
   */

  /**
   * A collection of options applied at the specific media query.
   */

  /**
   * The media queries configured with options.
   */

  /**
   * An object used to configure the slider.
   */
  var Options = /*#__PURE__*/function () {
    /**
     * Constructs a slider option set.
     *
     * A default set of options is used if no user options are provided.
     *
     * @throws {@link TypeError}
     * Throws an error if the `classes`, `enableLiveRegion` or `liveRegionText`
     * options are found in the `mediaQueryOptions`.
     *
     * @param eventBus - The event bus.
     * @param options - The user supplied options.
     */
    function Options(eventBus) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, Options);
      /**
       * The base options unrestricted by any media query.
       */
      _defineProperty(this, "baseOptions", {
        autoplay: true,
        autoplaySpeed: 5000,
        classes: {
          inner: 'zodiac-inner',
          items: 'zodiac-item',
          track: 'zodiac-track'
        },
        enableLiveRegion: true,
        gap: 8,
        itemsPerView: 5,
        liveRegionText: 'Slide @position of @total @title',
        pauseOnHover: true,
        transitionSpeed: 500
      });
      /**
       * The media queries configured with options.
       */
      _defineProperty(this, "mediaQueryLists", []);
      /**
       * A collection of options applied at the specific media query.
       */
      _defineProperty(this, "mediaQueryOptions", {});
      this.eventBus = eventBus;

      // Override the default base options with those provided by the user.
      Object.assign(this.baseOptions, options);

      // Check if any media query options were provided.
      if (options.mediaQueryOptions) {
        var mediaQueryOptions = options.mediaQueryOptions;
        for (var _i = 0, _Object$entries = Object.entries(mediaQueryOptions); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            mediaQuery = _Object$entries$_i[0],
            mediaQueryOptionSet = _Object$entries$_i[1];
          if (mediaQueryOptionSet) {
            var mediaQueryList = matchMedia(mediaQuery);
            this.validateMediaQueryOptions(mediaQueryOptionSet);
            this.mediaQueryLists.push({
              mediaQueryList: mediaQueryList,
              options: mediaQueryOptionSet
            });
            mediaQueryList.addEventListener('change', function () {
              _this.rebuildEffectiveOptions();
            });
          }
        }
      }
      this.rebuildEffectiveOptions();
    }

    /**
     * Gets the effective options.
     *
     * @returns The effective options.
     */
    _createClass(Options, [{
      key: "getEffectiveOptions",
      value: function getEffectiveOptions() {
        return this.effectiveOptions;
      }

      /**
       * Rebuilds the effective options.
       *
       * If there are any matching media query options, they will override the base
       * options.
       */
    }, {
      key: "rebuildEffectiveOptions",
      value: function rebuildEffectiveOptions() {
        this.eventBus.emit(['rebuildEffectiveOptions.before']);
        var effectiveOptions = Object.assign({}, this.baseOptions);
        var _iterator = _createForOfIteratorHelper(this.mediaQueryLists),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var list = _step.value;
            if (list.mediaQueryList.matches) {
              Object.assign(effectiveOptions, list.options);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        this.effectiveOptions = Object.freeze(effectiveOptions);
        this.eventBus.emit(['rebuildEffectiveOptions.after']);
      }

      /**
       * Checks the media query options for invalid properties.
       *
       * @throws {@link TypeError}
       * Throws an error if the `classes`, `enableLiveRegion` or `liveRegionText`
       * options are found in the `mediaQueryOptions`.
       */
    }, {
      key: "validateMediaQueryOptions",
      value: function validateMediaQueryOptions(options) {
        var invalidOptions = ['classes', 'enableLiveRegion', 'liveRegionText'];
        invalidOptions.forEach(function (invalidOption) {
          if (Object.hasOwnProperty.call(options, invalidOption)) {
            throw new TypeError("The ".concat(invalidOption, " property can only be set once."));
          }
        });
      }
    }]);
    return Options;
  }();

  /**
   * Defines the structure of a component.
   *
   * Components in Zodiac are used to compartmentalize specific areas of concern
   * within the slider. Functionality that is common between all components is
   * placed in the base `Zodiac` instance.
   */

  /**
   * A base implementation of ComponentInterface.
   * @api
   */
  var ComponentBase = /*#__PURE__*/function () {
    function ComponentBase() {
      _classCallCheck(this, ComponentBase);
    }
    _createClass(ComponentBase, [{
      key: "mount",
      value:
      /**
       * The slider's options.
       */

      /**
       * The slider instance.
       */

      /**
       * {@inheritDoc ComponentInterface.mount}
       */
      function mount(zodiac) {
        this.zodiac = zodiac;
        this.options = this.zodiac.getEffectiveOptions();
      }
    }]);
    return ComponentBase;
  }();

  // The constructor for the `UpdateEffectiveOptions` mixin. The `any` type is
  // required for the mixin's constructor.
  // @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /**
   * A mixin that rebuilds the options when they are changed.
   *
   * @returns A mixin that rebuilds the effective options.
   */
  function UpdateEffectiveOptions(Base) {
    return /*#__PURE__*/function (_Base) {
      _inherits(UpdatingEffectiveOptions, _Base);
      var _super = _createSuper(UpdatingEffectiveOptions);
      function UpdatingEffectiveOptions() {
        _classCallCheck(this, UpdatingEffectiveOptions);
        return _super.apply(this, arguments);
      }
      _createClass(UpdatingEffectiveOptions, [{
        key: "mount",
        value: function mount(zodiac) {
          var _this = this;
          _get(_getPrototypeOf(UpdatingEffectiveOptions.prototype), "mount", this).call(this, zodiac);
          this.zodiac.getEventBus().on(['rebuildEffectiveOptions.after'], function () {
            _this.zodiac.getEventBus().emit(['updateEffectiveOptions.before']);
            _this.options = _this.zodiac.getEffectiveOptions();
            _this.zodiac.getEventBus().emit(['updateEffectiveOptions.after']);
          });
        }
      }]);
      return UpdatingEffectiveOptions;
    }(Base);
  }

  /**
   * A collection of static helper methods.
   */
  var Utilities = /*#__PURE__*/function () {
    function Utilities() {
      _classCallCheck(this, Utilities);
    }
    _createClass(Utilities, null, [{
      key: "range",
      value:
      /**
       * Generates an array of numbers starting at a given position.
       *
       * @param size - The size of the array to generate.
       * @param startAt - The position to start at.
       *
       * @returns The generated array.
       */
      function range(size) {
        var startAt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return _toConsumableArray(Array(size).keys()).map(function (index) {
          return index + startAt;
        });
      }

      /**
       * Maps a number in an input range to a number in an output range.
       *
       * This method takes an input number that exists with a specific range, and
       * outputs a number scaled to an output range.
       *
       * @see {@link https://math.stackexchange.com/questions/377169/going-from-a-value-inside-1-1-to-a-value-in-another-range}
       *
       * @param item - The original number within the input range.
       * @param inMin - The minimum number in the input range.
       * @param inMax - The maximum number in the input range.
       * @param outMin - The minimum number in the output range.
       * @param outMax - The maximum number in the output range.
       *
       * @returns The new number within the output range.
       */
    }, {
      key: "rangeMap",
      value: function rangeMap(item, inMin, inMax, outMin, outMax) {
        return (item - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
      }
    }]);
    return Utilities;
  }();
  /**
   * CSS selectors for focusable elements.
   */
  _defineProperty(Utilities, "focusableSelectors", ['* a', '* area', '* input', '* select', '* textarea', '* button', '* iframe', '* object', '* embed', '* *[tabindex]', '* *[contenteditable]']);

  /**
   * Adds autoplay capabilities to the slider.
   *
   * When mounted, this component will have the following possible side effects:
   * - Auto-rotation will be started (if configured correctly)
   * - Auto-rotation will be paused when the slider is being dragged
   * - Auto-rotation will be paused when a focusable element is focused
   * - Auto-rotation will be conditionally paused when hovering over the slider
   *
   * @see Utilities.focusableSelectors
   *   For a description of what qualifies as a "focusable" element.
   */
  var Autoplay = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Autoplay, _ComponentBase);
    var _super = _createSuper(Autoplay);
    function Autoplay() {
      _classCallCheck(this, Autoplay);
      return _super.apply(this, arguments);
    }
    _createClass(Autoplay, [{
      key: "mount",
      value:
      /**
       * The autoplay interval ID.
       */

      /**
       * An `AbortController` for resetting the mouse events in `this.pauseOnHover()`.
       */

      /**
       * {@inheritDoc ComponentBase.mount}
       */
      function mount(zodiac) {
        var _this = this;
        _get(_getPrototypeOf(Autoplay.prototype), "mount", this).call(this, zodiac);
        this.abortController = new AbortController();
        this.start();
        this.pauseOnDrag();
        this.pauseOnFocus();
        this.pauseOnHover();

        // Reconfigure autoplay and pause on hover configuration when the options
        // are rebuilt.
        this.zodiac.getEventBus().on(['updateEffectiveOptions.after'], function () {
          _this.abortController.abort();
          _this.abortController = new AbortController();
          _this.stop();
          _this.start();
          _this.pauseOnHover();
        });
      }

      /**
       * Pauses the slider's auto-rotation when the slider is being dragged.
       */
    }, {
      key: "pauseOnDrag",
      value: function pauseOnDrag() {
        var _this2 = this;
        this.zodiac.getEventBus().on(['drag.before'], function () {
          _this2.stop();
        });
        this.zodiac.getEventBus().on(['drag.after'], function () {
          _this2.start();
        });
      }

      /**
       * Pauses the slider's auto-rotation when any focusable element is focused.
       */
    }, {
      key: "pauseOnFocus",
      value: function pauseOnFocus() {
        var _this3 = this;
        var focusableSelectors = Utilities.focusableSelectors.join(', ');
        var focusable = this.zodiac.getSliderElement().querySelectorAll(focusableSelectors);
        focusable.forEach(function (element) {
          element.addEventListener('focusin', function () {
            return _this3.stop();
          });
          element.addEventListener('focusout', function () {
            return _this3.start();
          });
        });
      }

      /**
       * Pauses the slider's auto-rotation on hover (if applicable).
       *
       * If `pauseOnHover` is true, the slider's auto-rotation will be stopped when
       * the user's cursor enters the slider element, then resumed when it leaves.
       */
    }, {
      key: "pauseOnHover",
      value: function pauseOnHover() {
        var _this4 = this;
        if (!this.options.pauseOnHover) {
          // This is a no-op method if pause on hover is not enabled.
          return;
        }
        var sliderElement = this.zodiac.getSliderElement();
        sliderElement.addEventListener('mouseenter', function () {
          _this4.stop();
        }, {
          signal: this.abortController.signal
        });
        sliderElement.addEventListener('mouseleave', function () {
          _this4.start();
        }, {
          signal: this.abortController.signal
        });
      }

      /**
       * Auto-rotates the slider using the configured interval.
       */
    }, {
      key: "start",
      value: function start() {
        var _this5 = this;
        var _this$options = this.options,
          autoplay = _this$options.autoplay,
          autoplaySpeed = _this$options.autoplaySpeed;

        // Check if autoplay is enabled with a positive interval duration.
        if (autoplay && autoplaySpeed > 0) {
          // Prevent multiple autoplay intervals from occurring simultaneously.
          this.stop();

          // Create an interval to continuously switch to the next item on a delay.
          this.interval = setInterval(function () {
            _this5.zodiac.getEventBus().emit(['autoplay.before']);
            _this5.zodiac.next();
            _this5.zodiac.getEventBus().emit(['autoplay.after']);
          }, autoplaySpeed);
        }
      }

      /**
       * Stops the slider's auto-rotation (if applicable).
       */
    }, {
      key: "stop",
      value: function stop() {
        clearInterval(this.interval);
      }
    }]);
    return Autoplay;
  }(ComponentBase);

  /**
   * Adds UI control capabilities to the slider.
   */
  var Controls = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Controls, _ComponentBase);
    var _super = _createSuper(Controls);
    function Controls() {
      _classCallCheck(this, Controls);
      return _super.apply(this, arguments);
    }
    _createClass(Controls, [{
      key: "mount",
      value:
      /**
       * {@inheritDoc ComponentBase.mount}
       */
      function mount(zodiac) {
        _get(_getPrototypeOf(Controls.prototype), "mount", this).call(this, zodiac);
        this.setUpControls();
      }

      /**
       * Attaches navigation buttons to the next & previous slider controls.
       */
    }, {
      key: "setUpControls",
      value: function setUpControls() {
        var _this = this;
        var sliderElement = this.zodiac.getSliderElement();
        var nextBtn = sliderElement.querySelector('[data-zodiac-direction="right"]');
        if (nextBtn) {
          nextBtn.addEventListener('click', function () {
            return _this.zodiac.next();
          });
        }
        var prevBtn = sliderElement.querySelector('[data-zodiac-direction="left"]');
        if (prevBtn) {
          prevBtn.addEventListener('click', function () {
            return _this.zodiac.previous();
          });
        }
      }
    }]);
    return Controls;
  }(ComponentBase);

  /**
   * Keeps the state of each item updated.
   */
  var ItemState = /*#__PURE__*/function (_ComponentBase) {
    _inherits(ItemState, _ComponentBase);
    var _super = _createSuper(ItemState);
    function ItemState() {
      var _this;
      _classCallCheck(this, ItemState);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      /**
       * The class that indicates an item is active.
       */
      _defineProperty(_assertThisInitialized(_this), "activeClass", 'active');
      return _this;
    }
    _createClass(ItemState, [{
      key: "mount",
      value:
      /**
       * {@inheritDoc ComponentBase.mount}
       */
      function mount(zodiac) {
        _get(_getPrototypeOf(ItemState.prototype), "mount", this).call(this, zodiac);
        this.setActiveClass();
        this.setAccessibilityAttributes();
        this.setInitialItemState();
        this.adjustItemStateOnMove();
      }

      /**
       * Adds the active class to an item.
       *
       * @param item - The element to apply the active class to.
       */
    }, {
      key: "addActiveClassToItem",
      value: function addActiveClassToItem(item) {
        item.classList.add(this.activeClass);
      }

      /**
       * Adjusts each item's state by listening to slider events.
       */
    }, {
      key: "adjustItemStateOnMove",
      value: function adjustItemStateOnMove() {
        var _this2 = this;
        this.zodiac.getEventBus().on(['move.after', 'drag.after'], function () {
          _this2.setActiveClass();
          _this2.setAccessibilityAttributes();
        });
      }

      /**
       * Removes the active class from each item in the slider.
       */
    }, {
      key: "removeActiveClass",
      value: function removeActiveClass() {
        var _this3 = this;
        this.zodiac.getItems().forEach(function (item) {
          return item.classList.remove(_this3.activeClass);
        });
      }

      /**
       * Applies the appropriate attributes for accessibility to each item.
       *
       * Items that aren't currently visible will be set as hidden (using
       * `aria-hidden`) and have a negative tab index applied to them.
       */
    }, {
      key: "setAccessibilityAttributes",
      value: function setAccessibilityAttributes() {
        var _this4 = this;
        var itemsPerView = this.options.itemsPerView;
        var position = this.zodiac.getPosition();

        // Compute a range of visible slide positions based on the the number of
        // items per view and the current position.
        var visibleRange = Utilities.range(itemsPerView, position);
        this.zodiac.getItems().forEach(function (item, index) {
          var visible = visibleRange.includes(index);

          // This value must be converted to a string since `setAttribute()`
          // expects `value` to be a string.
          var ariaHidden = (!visible).toString();
          item.setAttribute('aria-hidden', ariaHidden);
          _this4.setTabindex(item, visible);

          // Collect a list of focusable items within each slider item.
          var focusableItems = item.querySelectorAll(Utilities.focusableSelectors.join(', '));

          // Set the tab index for each focusable element within each slider item.
          focusableItems.forEach(function (element) {
            _this4.setTabindex(element, visible);
          });
        });
      }

      /**
       * Sets the active class on the active item and removes it from the rest.
       *
       * There can only be one active item at a time. The active item is tracked by
       * `Zodiac.getPosition()`.
       */
    }, {
      key: "setActiveClass",
      value: function setActiveClass() {
        var currentPosition = this.zodiac.getPosition();
        var activeItem = this.zodiac.getItems().item(currentPosition);
        this.removeActiveClass();
        this.addActiveClassToItem(activeItem);
      }

      /**
       * Applies an indexing attribute to each item.
       */
    }, {
      key: "setInitialItemState",
      value: function setInitialItemState() {
        this.zodiac.getItems().forEach(function (item, index) {
          item.setAttribute('data-zodiac-item-index', (index + 1).toString());
        });
      }

      /**
       * Sets the tabindex of an element based on whether it is visible.
       *
       * @param element - The element to modify.
       * @param visible - Whether or not the element is active.
       */
    }, {
      key: "setTabindex",
      value: function setTabindex(element, visible) {
        if (!visible) {
          element.setAttribute('tabindex', '-1');
        } else {
          element.removeAttribute('tabindex');
        }
      }
    }]);
    return ItemState;
  }(ComponentBase);

  /**
   * Adds a live region, so the slide position can be announced to screen readers.
   */
  var LiveRegion = /*#__PURE__*/function (_ComponentBase) {
    _inherits(LiveRegion, _ComponentBase);
    var _super = _createSuper(LiveRegion);
    function LiveRegion() {
      _classCallCheck(this, LiveRegion);
      return _super.apply(this, arguments);
    }
    _createClass(LiveRegion, [{
      key: "mount",
      value:
      /**
       * The live region element.
       */

      /**
       * {@inheritDoc ComponentBase.mount}
       */
      function mount(zodiac) {
        _get(_getPrototypeOf(LiveRegion.prototype), "mount", this).call(this, zodiac);
        if (this.options.enableLiveRegion) {
          this.createLiveRegion();
          this.updateLiveRegion();
        }
      }

      /**
       * Creates and adds the live region element to the slider.
       */
    }, {
      key: "createLiveRegion",
      value: function createLiveRegion() {
        this.liveRegion = document.createElement('div');
        this.liveRegion.setAttribute('aria-live', 'polite');
        this.liveRegion.setAttribute('aria-atomic', 'true');
        this.liveRegion.classList.add('zodiac-live-region');
        this.zodiac.getSliderElement().appendChild(this.liveRegion);
      }

      /**
       * Retrieves the title of the ative item that will be used in the live region.
       *
       * The title is expected to be placed in the `data-zodiac-live-region-title`
       * attribute. This can be on a `zodiac-item` element, or within.
       *
       * @returns The title of the active slider item.
       */
    }, {
      key: "getLiveRegionTitle",
      value: function getLiveRegionTitle() {
        var title = '';
        var sliderElement = this.zodiac.getSliderElement();
        var titleElement = sliderElement.querySelector('.zodiac-item.active[data-zodiac-live-region-title], .zodiac-item.active [data-zodiac-live-region-title]');
        if (titleElement) {
          title = titleElement.dataset.zodiacLiveRegionTitle;
        }
        return title;
      }

      /**
       * Updates the text of the live region when the slider is moved.
       */
    }, {
      key: "updateLiveRegion",
      value: function updateLiveRegion() {
        var _this = this;
        this.zodiac.getEventBus().on(['move.after', 'drag.after'], function () {
          var position = _this.zodiac.getPosition() + 1;
          var total = _this.zodiac.getItemTotal() + 1;
          var title = _this.getLiveRegionTitle();
          _this.liveRegion.innerText = _this.options.liveRegionText.replace('@position', position.toString()).replace('@total', total.toString()).replace('@title', title).trim();
        });
      }
    }]);
    return LiveRegion;
  }(ComponentBase);

  /**
   * Manipulates the width of the slider track and each slider item.
   */
  var Track = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Track, _ComponentBase);
    var _super = _createSuper(Track);
    function Track() {
      _classCallCheck(this, Track);
      return _super.apply(this, arguments);
    }
    _createClass(Track, [{
      key: "mount",
      value:
      /**
       * {@inheritDoc ComponentBase.mount}
       */
      function mount(zodiac) {
        _get(_getPrototypeOf(Track.prototype), "mount", this).call(this, zodiac);
        this.setItemWidth();
        this.setTrackWidth();
        this.setTrackTransitionDuration();
        this.updateTrackOnResize();
      }

      /**
       * Gets the margin size for slider items by dividing the gap option in half.
       *
       * @returns The gap option value divided in half.
       */
    }, {
      key: "getSliderItemMargin",
      value: function getSliderItemMargin() {
        return this.options.gap / 2;
      }

      /**
       * Retrieves the width of the slider's inner element.
       *
       * @returns The width of the slider.
       */
    }, {
      key: "getSliderWidth",
      value: function getSliderWidth() {
        var selector = this.options.classes.inner;
        var inner = this.zodiac.getSliderElement().querySelector(".".concat(selector));
        var _inner$getBoundingCli = inner.getBoundingClientRect(),
          width = _inner$getBoundingCli.width;
        return width;
      }

      /**
       * Sets the width and margin of each slider item.
       *
       * Each slider item's width is calculated by dividing the slider's width by
       * configured total items per view minus the configured gap setting.
       */
    }, {
      key: "setItemWidth",
      value: function setItemWidth() {
        var _this = this;
        var itemsPerView = this.options.itemsPerView;

        // Calculate the width of each slider item by dividing the total size of
        // the inner slider by the total items per view.
        this.zodiac.setItemWidth(this.getSliderWidth() / itemsPerView);
        var sliderItemMargin = this.getSliderItemMargin();
        this.zodiac.getItems().forEach(function (item) {
          // Apply the width to the slide item.
          item.style.width = "".concat(_this.zodiac.getItemWidth() - sliderItemMargin * 2, "px");

          // Add spacing between each slider item with left and right margin.
          item.style.marginLeft = "".concat(sliderItemMargin, "px");
          item.style.marginRight = "".concat(sliderItemMargin, "px");
        });
      }

      /**
       * Applies the transition speed setting to the track.
       */
    }, {
      key: "setTrackTransitionDuration",
      value: function setTrackTransitionDuration() {
        var transitionSpeed = this.options.transitionSpeed;
        this.zodiac.getTrackElement().style.transitionDuration = "".concat(transitionSpeed, "ms");
      }

      /**
       * Set the width of the track element.
       *
       * The width of track element is equal to the width of the slider multiplied
       * by the total number of items.
       */
    }, {
      key: "setTrackWidth",
      value: function setTrackWidth() {
        var trackWidth = this.zodiac.getItemWidth() * this.zodiac.getItems().length;
        this.zodiac.getTrackElement().style.width = "".concat(trackWidth, "px");
      }

      /**
       * Update the track and item width when the window is resized.
       */
    }, {
      key: "updateTrackOnResize",
      value: function updateTrackOnResize() {
        var _this2 = this;
        this.zodiac.getEventBus().on(['updateEffectiveOptions.after'], function () {
          _this2.zodiac.getEventBus().emit(['trackUpdated.before']);
          _this2.setItemWidth();
          _this2.setTrackWidth();
          _this2.setTrackTransitionDuration();
          _this2.zodiac.getEventBus().emit(['trackUpdated.after']);
        });
      }
    }]);
    return Track;
  }(ComponentBase);

  /**
   * A map of events that will represent dragging.
   */

  /**
   * Adds dragging capabilities to the slider (for both mouse & touch inputs).
   */
  var Drag = /*#__PURE__*/function (_ComponentBase) {
    _inherits(Drag, _ComponentBase);
    var _super = _createSuper(Drag);
    function Drag() {
      var _this;
      _classCallCheck(this, Drag);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      /**
       * The class used to indicate that the slider is being dragged.
       */
      _defineProperty(_assertThisInitialized(_this), "draggingClass", 'dragging');
      /**
       * The value used to track and apply the `translate` CSS while dragging.
       */
      _defineProperty(_assertThisInitialized(_this), "dragPosition", 0);
      /**
       * The `AbortController` for the `this.move()` method.
       */
      _defineProperty(_assertThisInitialized(_this), "moveController", null);
      /**
       * Events that move the slider when dragging.
       */
      _defineProperty(_assertThisInitialized(_this), "moveEventKeys", ['mousemove', 'touchmove']);
      /**
       * A flag used to determine whether the clicking of links is disallowed.
       */
      _defineProperty(_assertThisInitialized(_this), "preventClick", false);
      /**
       * The position that will be given to `Zodiac` after the dragging has stopped.
       */
      _defineProperty(_assertThisInitialized(_this), "snapPosition", 0);
      /**
       * Events that signal when dragging should begin.
       */
      _defineProperty(_assertThisInitialized(_this), "startEventKeys", ['mousedown', 'touchstart']);
      /**
       * The position of the event dispatcher at the start of the dragging process.
       */
      _defineProperty(_assertThisInitialized(_this), "startingEventPosition", 0);
      /**
       * The `AbortController` for the `this.stop()` method.
       */
      _defineProperty(_assertThisInitialized(_this), "stopController", null);
      /**
       * Events that signal when dragging should end.
       */
      _defineProperty(_assertThisInitialized(_this), "stopEventKeys", ['mouseup', 'mouseleave', 'touchend', 'touchcancel']);
      /**
       * How far the slider must be dragged before moving begins.
       */
      _defineProperty(_assertThisInitialized(_this), "threshold", 20);
      return _this;
    }
    _createClass(Drag, [{
      key: "mount",
      value:
      /**
       * {@inheritDoc ComponentBase.mount}
       */
      function mount(zodiac) {
        _get(_getPrototypeOf(Drag.prototype), "mount", this).call(this, zodiac);
        this.addStartEvents();
        this.onDragEvents();
        this.preventDefaultOnDragStart();
        this.preventDefaultClickOnDragStart();
      }

      /**
       * Applies the move events to the slider.
       */
    }, {
      key: "addMoveEvents",
      value: function addMoveEvents() {
        var _this2 = this;
        // Create an `AbortController` to remove these events after dragging is
        // complete. This controller is recreated every time this method is called
        // because it will be disabled after it's `abort` signal is sent.
        this.moveController = new AbortController();
        this.moveEventKeys.forEach(function (eventType) {
          _this2.zodiac.getTrackElement().addEventListener(eventType, function (event) {
            return _this2.move(event);
          }, {
            signal: _this2.moveController.signal
          });
        });
      }

      /**
       * Applies the start events to the slider.
       */
    }, {
      key: "addStartEvents",
      value: function addStartEvents() {
        var _this3 = this;
        this.startEventKeys.forEach(function (eventType) {
          _this3.zodiac.getTrackElement().addEventListener(eventType, function (event) {
            return _this3.start(event);
          });
        });
      }

      /**
       * Applies the stop events to the slider.
       */
    }, {
      key: "addStopEvents",
      value: function addStopEvents() {
        var _this4 = this;
        // Create an `AbortController` to remove these events after dragging is
        // complete. This controller is recreated every time this method is called
        // because it will be disabled after it's `abort` signal is sent.
        this.stopController = new AbortController();
        this.stopEventKeys.forEach(function (eventType) {
          _this4.zodiac.getTrackElement().addEventListener(eventType, function () {
            return _this4.stop();
          }, {
            signal: _this4.stopController.signal
          });
        });
      }

      /**
       * Retrieves the `screenX` value from an event depending on the event type.
       *
       * @param event - The event in which to derive the `screenX` value.
       *
       * @returns The `screenX` value of the event.
       */
    }, {
      key: "getScreenX",
      value: function getScreenX(event) {
        if (event instanceof TouchEvent) {
          var _event$touches$0$scre;
          return (_event$touches$0$scre = event.touches[0].screenX) !== null && _event$touches$0$scre !== void 0 ? _event$touches$0$scre : 0;
        }
        return event.screenX;
      }

      /**
       * Snaps a drag position into a valid `Zodiac` position.
       *
       * The `Drag` component tracks the drag position with a pixel value to
       * animate dragging. This method snaps a drag position into valid `Zodiac`
       * position to set the active slide.
       *
       * @param dragPosition - The position in pixels.
       *
       * @returns The position as a numeric index.
       */
    }, {
      key: "getSnapPosition",
      value: function getSnapPosition(dragPosition) {
        var snapPosition = -Math.round(dragPosition / this.zodiac.getItemWidth());
        var itemTotal = this.zodiac.getItemTotal();

        // If the calculated position is greater than the total number of slider
        // items then restart at the beginning.
        if (snapPosition > itemTotal) {
          snapPosition = 0;
        }

        // If the calculated position is less than zero then move to the end of
        // the slider.
        if (snapPosition < 0) {
          snapPosition = itemTotal;
        }
        return snapPosition;
      }

      /**
       * Mark all links within the slider track as draggable or un-draggable.
       *
       * Depending on the value of `draggable`, links within the slider track will
       * be enabled or disabled by swapping between storing the link in an `href`
       * or `data-href` attribute and toggling the `draggable` attribute.
       *
       * @param draggable - Whether to mark the items as draggable or un-draggable.
       */
    }, {
      key: "modifyLinks",
      value: function modifyLinks(draggable) {
        // Retrieve all links within the track element.
        var links = this.zodiac.getTrackElement().querySelectorAll('a');

        // Prevent unnecessary modification by checking if the draggable value
        // matches the prevent click state.
        if (this.preventClick === draggable) {
          links.forEach(function (link) {
            // Determine the source and destination of the attribute modification
            // based on the whether draggability is being enabled or disabled.
            var source = draggable ? 'data-href' : 'href';
            var destination = draggable ? 'href' : 'data-href';

            // Add or remove the draggable attribute on the link element.
            link.draggable = draggable;
            link.setAttribute(destination, link.getAttribute(source));
            link.removeAttribute(source);
          });

          // Indicate click has or hasn't been prevented.
          this.preventClick = !this.preventClick;
        }
      }

      /**
       * Calculates & updates the position of the slider track on drag.
       *
       * During the move stage of the dragging, this method has the following side
       * effects:
       * - Calculates the dragging distance based on where the user clicked or
       *   touched.
       * - Determines how fast the slider should be dragged based on how close to
       *   the edge the mouse cursor is moved.
       * - Computes which slide to snap to after dragging is complete.
       * - Animates the slider track while dragging.
       *
       * @param event - The DOM event emitted during the drag movement.
       */
    }, {
      key: "move",
      value: function move(event) {
        this.zodiac.getEventBus().emit(['drag.move.before']);

        // Determine the distance between the position of current event dispatcher
        // the starting event dispatcher position.
        var currentEventPosition = this.getScreenX(event) - this.zodiac.getSliderElement().offsetLeft;
        var distance = currentEventPosition - this.startingEventPosition;

        // Exit this method if the distance is less than the drag threshold.
        if (Math.abs(distance) < this.threshold) {
          return;
        }

        // Increase the acceleration speed based on how far the user has dragged
        // the slider.
        var accelerate = Utilities.rangeMap(Math.abs(distance), this.threshold, window.innerWidth, 1, 3);
        // Determine by drag position by adding distance multiplied by the
        // acceleration speed.
        var dragPosition = this.dragPosition + distance * accelerate;
        event.preventDefault();

        // Get the snap position from the current drag position.
        this.snapPosition = this.getSnapPosition(dragPosition);
        // Animate the dragging.
        this.zodiac.getTrackElement().style.transform = "translate3d(".concat(dragPosition, "px, 0, 0)");
        this.zodiac.getEventBus().emit(['drag.move.after']);
      }

      /**
       * Adds the `dragging` class to the slider track while it is being dragged.
       */
    }, {
      key: "onDragEvents",
      value: function onDragEvents() {
        var _this5 = this;
        this.zodiac.getEventBus().on(['drag.before'], function () {
          _this5.zodiac.getTrackElement().classList.add(_this5.draggingClass);
        });
        this.zodiac.getEventBus().on(['drag.after'], function () {
          _this5.zodiac.getTrackElement().classList.remove(_this5.draggingClass);
        });
      }

      /**
       * Prevent link clicking when the slider is being dragged.
       */
    }, {
      key: "preventDefaultClickOnDragStart",
      value: function preventDefaultClickOnDragStart() {
        var _this6 = this;
        this.zodiac.getEventBus().on(['drag.move.before'], function () {
          _this6.modifyLinks(false);
        });
        this.zodiac.getEventBus().on(['drag.after'], function () {
          // Wait for the slider to finishing animating before enabling the links.
          setTimeout(function () {
            _this6.modifyLinks(true);
          }, _this6.options.transitionSpeed);
        });
      }

      /**
       * Prevents unnecessary dragging for slider items.
       */
    }, {
      key: "preventDefaultOnDragStart",
      value: function preventDefaultOnDragStart() {
        this.zodiac.getItems().forEach(function (item) {
          item.addEventListener('dragstart', function (event) {
            return event.preventDefault();
          });
        });
      }

      /**
       * Removes the move events from the slider to prevent unnecessary calculations.
       */
    }, {
      key: "removeMoveEvents",
      value: function removeMoveEvents() {
        this.moveController.abort();
      }

      /**
       * Removes the stop events from the slider to prevent unnecessary calculations.
       */
    }, {
      key: "removeStopEvents",
      value: function removeStopEvents() {
        this.stopController.abort();
      }

      /**
       * Prepares the slider to be dragged when dragging has started.
       *
       * The slider is prepared by calculating the current drag position, relative
       * to the `Zodiac`'s current position, and the position of the event
       * dispatcher.
       *
       * @param event - The DOM event which fired this method.
       */
    }, {
      key: "start",
      value: function start(event) {
        this.zodiac.getEventBus().emit(['drag.before']);

        // Calculate the drag position by multiplying the slider's current position
        // by the width of a single slide. The value of this calculation is
        // converted to a negative number to animate the slider since it will
        // eventually be passed into `translate3d`.
        this.dragPosition = -Math.abs(this.zodiac.getPosition() * this.zodiac.getItemWidth());
        this.snapPosition = this.getSnapPosition(this.dragPosition);

        // Determine the position of the event dispatcher by subtracting the event
        // dispatcher's position on the screen by the slider's offset of it's
        // parent element.
        this.startingEventPosition = this.getScreenX(event) - this.zodiac.getSliderElement().offsetLeft;
        this.addMoveEvents();
        this.addStopEvents();
      }

      /**
       * Positions the slider after the dragging is complete.
       */
    }, {
      key: "stop",
      value: function stop() {
        this.zodiac.setPosition(this.snapPosition);
        this.zodiac.move(this.snapPosition);
        this.removeMoveEvents();
        this.removeStopEvents();
        this.zodiac.getEventBus().emit(['drag.after']);
      }
    }]);
    return Drag;
  }(ComponentBase);

  /**
   * The entry point for the Zodiac Slider.
   *
   * This class contains all properties and methods shared between each component.
   *
   * Components are mounted in `Zodiac.mount()`. This function iterates over each
   * component, invoking their `mount()` method & supplying itself as an argument.
   */
  var Zodiac = /*#__PURE__*/function () {
    /**
     * The slider components.
     */

    /**
     * The event bus.
     */

    /**
     * The slider items.
     */

    /**
     * The width of each slider item.
     */

    /**
     * The slider options.
     */

    /**
     * The slider's current position in the item sequence (zero-indexed).
     */

    /**
     * The CSS selector for identifying the slider.
     */

    /**
     * The element on which the slider has been initialized.
     */

    /**
     * The slider track element.
     */

    /**
     * Constructs a `Zodiac` instance based on the provided selector and options.
     *
     * @param selector - The base selector to use.
     * @param options - The options to initialize the slider with.
     */
    function Zodiac(selector, options) {
      var _this = this;
      _classCallCheck(this, Zodiac);
      this.eventBus = new EventBus();
      this.selector = selector;
      this.options = new Options(this.eventBus, options);
      var effectiveOptions = this.options.getEffectiveOptions();
      this.components = this.registerComponents();
      this.sliderElement = document.querySelector(this.selector);
      this.trackElement = this.sliderElement.querySelector(".".concat(effectiveOptions.classes.track));
      this.items = this.sliderElement.querySelectorAll(".".concat(effectiveOptions.classes.items));
      this.position = 0;

      // Reposition the slider items on media query change.
      this.eventBus.on(['trackUpdated.after'], function () {
        return _this.next(0);
      });
    }

    /**
     * Retrieves the slider's effective options.
     *
     * @returns The slider's effective options.
     */
    _createClass(Zodiac, [{
      key: "getEffectiveOptions",
      value: function getEffectiveOptions() {
        return this.options.getEffectiveOptions();
      }

      /**
       * Retrieves the event bus.
       *
       * @returns The event bus.
       */
    }, {
      key: "getEventBus",
      value: function getEventBus() {
        return this.eventBus;
      }

      /**
       * Retrieves the total number of items.
       *
       * @returns The total number of items offset by 1.
       */
    }, {
      key: "getItemTotal",
      value: function getItemTotal() {
        return this.items.length - 1;
      }

      /**
       * Retrieves the width of a slider item.
       *
       * @returns The width of individual slider items.
       */
    }, {
      key: "getItemWidth",
      value: function getItemWidth() {
        return this.itemWidth;
      }

      /**
       * Retrieves the slider's items.
       *
       * @returns The slider's items.
       */
    }, {
      key: "getItems",
      value: function getItems() {
        return this.items;
      }

      /**
       * Retrieves the slider's position.
       *
       * @returns The position of the slider.
       */
    }, {
      key: "getPosition",
      value: function getPosition() {
        return this.position;
      }

      /**
       * Retrieves the slider element.
       *
       * @returns The slider element.
       */
    }, {
      key: "getSliderElement",
      value: function getSliderElement() {
        return this.sliderElement;
      }

      /**
       * Retrieves the track element.
       *
       * @returns The track element.
       */
    }, {
      key: "getTrackElement",
      value: function getTrackElement() {
        return this.trackElement;
      }

      /**
       * Mounts the sliders components.
       *
       * @param thirdPartyComponents - A list of user defined components.
       *
       * @returns The current `Zodiac` instance.
       */
    }, {
      key: "mount",
      value: function mount() {
        var thirdPartyComponents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var _iterator = _createForOfIteratorHelper(this.components.concat(thirdPartyComponents)),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var component = _step.value;
            component.mount(this);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return this;
      }

      /**
       * Moves the slider based on the provided offset.
       *
       * @param offset - The position to move the slider.
       */
    }, {
      key: "move",
      value: function move(offset) {
        var transform = -1 * (this.getItemWidth() * offset);
        this.trackElement.style.transform = "translate3d(".concat(transform, "px, 0px, 0px)");
      }

      /**
       * Move to the next slide.
       *
       * @param offset - How many slides to move forward.
       */
    }, {
      key: "next",
      value: function next() {
        var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        this.eventBus.emit(['move.before']);
        var position = this.getPosition();
        position = position + offset;
        if (position > this.getItemTotal()) {
          position = 0;
        }
        this.move(position);
        this.setPosition(position);
        this.eventBus.emit(['move.after']);
      }

      /**
       * Removes a custom event listener.
       *
       * @param names - A list of event names to unsubscribe.
       *
       * @returns The current `Zodiac` instance.
       */
    }, {
      key: "off",
      value: function off(names) {
        this.eventBus.off(names);
        return this;
      }

      /**
       * Adds a custom event listener with a callback function.
       *
       * @param names - A list of event names to subscribe to.
       * @param callback - A callback function to run on the events.
       *
       * @returns The current `Zodiac` instance.
       */
    }, {
      key: "on",
      value: function on(names, callback) {
        this.eventBus.on(names, callback);
        return this;
      }

      /**
       * Move to the previous slide.
       *
       * @param offset - How many slides to move forward.
       */
    }, {
      key: "previous",
      value: function previous() {
        var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        this.eventBus.emit(['move.before']);
        var position = this.getPosition();
        position = position - offset;
        if (position < 0) {
          position = this.getItemTotal();
        }
        this.move(position);
        this.setPosition(position);
        this.eventBus.emit(['move.after']);
      }

      /**
       * Sets the width of individual slider items.
       *
       * @param itemWidth - The new item width.
       */
    }, {
      key: "setItemWidth",
      value: function setItemWidth(itemWidth) {
        this.itemWidth = itemWidth;
      }

      /**
       * Sets the sliders position.
       *
       * @throws {@link RangeError}
       * Will throw an error if the position is `Nan`, less than zero, or greater
       * than the total number of items.
       *
       * @param position - The position to set.
       */
    }, {
      key: "setPosition",
      value: function setPosition(position) {
        if (Number.isNaN(position) || position < 0 || position > this.getItemTotal()) {
          throw new RangeError("Invalid position: ".concat(position));
        }
        this.position = Math.trunc(position);
      }

      /**
       * Registers the required components provided by Zodiac.
       *
       * @returns A list of instantiated components.
       */
    }, {
      key: "registerComponents",
      value: function registerComponents() {
        return [ItemState, UpdateEffectiveOptions(Track), UpdateEffectiveOptions(Autoplay), Controls, UpdateEffectiveOptions(Drag), LiveRegion].map(function (Component) {
          return new Component();
        });
      }
    }]);
    return Zodiac;
  }();

  return Zodiac;

})();
//# sourceMappingURL=zodiac.js.map
