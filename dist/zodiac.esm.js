/**
 * Defines a zodiac slider event.
 */

/**
 * Provides an event bus for tracking slider related events.
 */
class EventBus {
  /**
   * A list of subscribed events.
   */

  constructor() {
    this.events = [];
  }

  /**
   * Emits events by name with arguments for the callback function.
   *
   * @param names - The event names to emit.
   * @param args - Arguments for the callback function.
   */
  emit(names, ...args) {
    names.forEach(name => {
      this.filterByName(name).forEach(event => {
        event.callback(...args);
      });
    });
  }

  /**
   * Unsubscribes event(s) by name(s).
   *
   * @param names - A list of event names to unsubscribe.
   */
  off(names) {
    for (const name of names) {
      this.events = this.events.filter(event => event.name !== name);
    }
  }

  /**
   * Subscribes an event with a callback function.
   *
   * @param names - A list of event names to subscribe to.
   * @param callback - A callback function to run on the events.
   */
  on(names, callback) {
    names.forEach(name => this.events.push({
      name,
      callback
    }));
  }

  /**
   * Filter events by name.
   *
   * @param name - The name to filter by.
   *
   * @returns The result event set.
   */
  filterByName(name) {
    return this.events.filter(event => event.name === name);
  }
}

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
class Options {
  /**
   * The base options unrestricted by any media query.
   */
  baseOptions = {
    autoplay: true,
    autoplaySpeed: 5000,
    classes: {
      inner: 'zodiac-inner',
      items: 'zodiac-item',
      track: 'zodiac-track'
    },
    enableLiveRegion: true,
    gap: 8,
    infiniteScrolling: true,
    itemsPerView: 5,
    liveRegionText: 'Slide @position of @total @title',
    pauseOnHover: true,
    transitionSpeed: 500
  };

  /**
   * The active options based on the computed media queries.
   */

  /**
   * The event bus.
   *
   * The event bus is used to notify when a media query has changed.
   */

  /**
   * The media queries configured with options.
   */
  mediaQueryLists = [];

  /**
   * A collection of options applied at the specific media query.
   */
  mediaQueryOptions = {};

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
  constructor(eventBus, options = {}) {
    this.eventBus = eventBus;

    // Override the default base options with those provided by the user.
    Object.assign(this.baseOptions, options);

    // Check if any media query options were provided.
    if (options.mediaQueryOptions) {
      const mediaQueryOptions = options.mediaQueryOptions;
      for (const [mediaQuery, mediaQueryOptionSet] of Object.entries(mediaQueryOptions)) {
        if (mediaQueryOptionSet) {
          const mediaQueryList = matchMedia(mediaQuery);
          this.validateMediaQueryOptions(mediaQueryOptionSet);
          this.mediaQueryLists.push({
            mediaQueryList,
            options: mediaQueryOptionSet
          });
          mediaQueryList.addEventListener('change', () => {
            this.rebuildEffectiveOptions();
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
  getEffectiveOptions() {
    return this.effectiveOptions;
  }

  /**
   * Rebuilds the effective options.
   *
   * If there are any matching media query options, they will override the base
   * options.
   */
  rebuildEffectiveOptions() {
    this.eventBus.emit(['rebuildEffectiveOptions.before']);
    const effectiveOptions = Object.assign({}, this.baseOptions);
    for (const list of this.mediaQueryLists) {
      if (list.mediaQueryList.matches) {
        Object.assign(effectiveOptions, list.options);
      }
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
  validateMediaQueryOptions(options) {
    const invalidOptions = ['classes', 'enableLiveRegion', 'infiniteScrolling', 'liveRegionText'];
    invalidOptions.forEach(invalidOption => {
      if (Object.hasOwnProperty.call(options, invalidOption)) {
        throw new TypeError(`The ${invalidOption} property can only be set once.`);
      }
    });
  }
}

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
class ComponentBase {
  /**
   * The slider's options.
   */

  /**
   * The slider instance.
   */

  /**
   * {@inheritDoc ComponentInterface.mount}
   */
  mount(zodiac) {
    this.zodiac = zodiac;
    this.options = this.zodiac.getEffectiveOptions();
  }
}

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
  return class UpdatingEffectiveOptions extends Base {
    mount(zodiac) {
      super.mount(zodiac);
      this.zodiac.getEventBus().on(['rebuildEffectiveOptions.after'], () => {
        this.zodiac.getEventBus().emit(['updateEffectiveOptions.before']);
        this.options = this.zodiac.getEffectiveOptions();
        this.zodiac.getEventBus().emit(['updateEffectiveOptions.after']);
      });
    }
  };
}

/**
 * A collection of static helper methods.
 */
class Utilities {
  /**
   * CSS selectors for focusable elements.
   */
  static focusableSelectors = ['* a', '* area', '* input', '* select', '* textarea', '* button', '* iframe', '* object', '* embed', '* *[tabindex]', '* *[contenteditable]'];

  /**
   * Generates an array of numbers starting at a given position.
   *
   * @param size - The size of the array to generate.
   * @param startAt - The position to start at.
   *
   * @returns The generated array.
   */
  static range(size, startAt = 0) {
    return [...Array(size).keys()].map(index => index + startAt);
  }
}

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
class Autoplay extends ComponentBase {
  /**
   * The autoplay interval ID.
   */

  /**
   * An `AbortController` for resetting the mouse events in `this.pauseOnHover()`.
   */

  /**
   * {@inheritDoc ComponentBase.mount}
   */
  mount(zodiac) {
    super.mount(zodiac);
    this.abortController = new AbortController();
    this.start();
    this.pauseOnDrag();
    this.pauseOnFocus();
    this.pauseOnHover();

    // Reconfigure autoplay and pause on hover configuration when the options
    // are rebuilt.
    this.zodiac.getEventBus().on(['updateEffectiveOptions.after'], () => {
      this.abortController.abort();
      this.abortController = new AbortController();
      this.stop();
      this.start();
      this.pauseOnHover();
    });
  }

  /**
   * Pauses the slider's auto-rotation when the slider is being dragged.
   */
  pauseOnDrag() {
    this.zodiac.getEventBus().on(['drag.before'], () => {
      this.stop();
    });
    this.zodiac.getEventBus().on(['drag.after'], () => {
      this.start();
    });
  }

  /**
   * Pauses the slider's auto-rotation when any focusable element is focused.
   */
  pauseOnFocus() {
    const focusableSelectors = Utilities.focusableSelectors.join(', ');
    const focusable = this.zodiac.getSliderElement().querySelectorAll(focusableSelectors);
    focusable.forEach(element => {
      element.addEventListener('focusin', () => this.stop());
      element.addEventListener('focusout', () => this.start());
    });
  }

  /**
   * Pauses the slider's auto-rotation on hover (if applicable).
   *
   * If `pauseOnHover` is true, the slider's auto-rotation will be stopped when
   * the user's cursor enters the slider element, then resumed when it leaves.
   */
  pauseOnHover() {
    if (!this.options.pauseOnHover) {
      // This is a no-op method if pause on hover is not enabled.
      return;
    }
    const sliderElement = this.zodiac.getSliderElement();
    sliderElement.addEventListener('mouseenter', () => {
      this.stop();
    }, {
      signal: this.abortController.signal
    });
    sliderElement.addEventListener('mouseleave', () => {
      this.start();
    }, {
      signal: this.abortController.signal
    });
  }

  /**
   * Auto-rotates the slider using the configured interval.
   */
  start() {
    const {
      autoplay,
      autoplaySpeed
    } = this.options;

    // Check if autoplay is enabled with a positive interval duration.
    if (autoplay && autoplaySpeed > 0) {
      // Prevent multiple autoplay intervals from occurring simultaneously.
      this.stop();

      // Create an interval to continuously switch to the next item on a delay.
      this.interval = setInterval(() => {
        this.zodiac.getEventBus().emit(['autoplay.before']);
        this.zodiac.next();
        this.zodiac.getEventBus().emit(['autoplay.after']);
      }, autoplaySpeed);
    }
  }

  /**
   * Stops the slider's auto-rotation (if applicable).
   */
  stop() {
    clearInterval(this.interval);
  }
}

/**
 * Adds UI control capabilities to the slider.
 */
class Controls extends ComponentBase {
  /**
   * {@inheritDoc ComponentBase.mount}
   */
  mount(zodiac) {
    super.mount(zodiac);
    this.setUpControls();
  }

  /**
   * Attaches navigation buttons to the next & previous slider controls.
   */
  setUpControls() {
    // Create a flag that will disable control movement, if the slider is
    // transitioning.
    let allowMove = true;
    const eventBus = this.zodiac.getEventBus();
    eventBus.on(['transitionDuration.before'], () => allowMove = false);
    eventBus.on(['transitionDuration.after'], () => allowMove = true);
    const sliderElement = this.zodiac.getSliderElement();
    const nextBtn = sliderElement.querySelector('[data-zodiac-direction="right"]');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (allowMove) {
          this.zodiac.next();
        }
      });
    }
    const prevBtn = sliderElement.querySelector('[data-zodiac-direction="left"]');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (allowMove) {
          this.zodiac.previous();
        }
      });
    }
  }
}

/**
 * Keeps the state of each item updated.
 */
class ItemState extends ComponentBase {
  /**
   * The class that indicates an item is active.
   */
  activeClass = 'active';

  /**
   * {@inheritDoc ComponentBase.mount}
   */
  mount(zodiac) {
    super.mount(zodiac);
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
  addActiveClassToItem(item) {
    item.classList.add(this.activeClass);
  }

  /**
   * Adjusts each item's state by listening to slider events.
   */
  adjustItemStateOnMove() {
    this.zodiac.getEventBus().on(['move.after', 'drag.after'], () => {
      this.setActiveClass();
      this.setAccessibilityAttributes();
    });
  }

  /**
   * Removes the active class from each item in the slider.
   */
  removeActiveClass() {
    this.zodiac.getItems().forEach(item => item.classList.remove(this.activeClass));
  }

  /**
   * Applies the appropriate attributes for accessibility to each item.
   *
   * Items that aren't currently visible will be set as hidden (using
   * `aria-hidden`) and have a negative tab index applied to them.
   */
  setAccessibilityAttributes() {
    const {
      itemsPerView
    } = this.options;
    const position = this.zodiac.getPosition();

    // Compute a range of visible slide positions based on the the number of
    // items per view and the current position.
    const visibleRange = Utilities.range(itemsPerView, position);
    this.zodiac.getItems().forEach((item, index) => {
      const visible = visibleRange.includes(index);

      // This value must be converted to a string since `setAttribute()`
      // expects `value` to be a string.
      const ariaHidden = (!visible).toString();
      item.setAttribute('aria-hidden', ariaHidden);
      this.setTabindex(item, visible);

      // Collect a list of focusable items within each slider item.
      const focusableItems = item.querySelectorAll(Utilities.focusableSelectors.join(', '));

      // Set the tab index for each focusable element within each slider item.
      focusableItems.forEach(element => {
        this.setTabindex(element, visible);
      });
    });
  }

  /**
   * Sets the active class on the active item and removes it from the rest.
   *
   * There can only be one active item at a time. The active item is tracked by
   * `Zodiac.getPosition()`.
   */
  setActiveClass() {
    const currentPosition = this.zodiac.getPosition();
    const activeItem = this.zodiac.getItems().item(currentPosition);
    this.removeActiveClass();
    this.addActiveClassToItem(activeItem);
  }

  /**
   * Applies an indexing attribute to each item.
   */
  setInitialItemState() {
    this.zodiac.getItems().forEach((item, index) => {
      item.setAttribute('data-zodiac-item-index', (index + 1).toString());
    });
  }

  /**
   * Sets the tabindex of an element based on whether it is visible.
   *
   * @param element - The element to modify.
   * @param visible - Whether or not the element is active.
   */
  setTabindex(element, visible) {
    if (!visible) {
      element.setAttribute('tabindex', '-1');
    } else {
      element.removeAttribute('tabindex');
    }
  }
}

/**
 * Adds a live region, so the slide position can be announced to screen readers.
 */
class LiveRegion extends ComponentBase {
  /**
   * The live region element.
   */

  /**
   * {@inheritDoc ComponentBase.mount}
   */
  mount(zodiac) {
    super.mount(zodiac);
    if (this.options.enableLiveRegion) {
      this.createLiveRegion();
      this.updateLiveRegion();
    }
  }

  /**
   * Creates and adds the live region element to the slider.
   */
  createLiveRegion() {
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.classList.add('zodiac-live-region');
    this.zodiac.getSliderElement().appendChild(this.liveRegion);
  }

  /**
   * Retrieves the title of the active item that will be used in the live region.
   *
   * The title is expected to be placed in the `data-zodiac-live-region-title`
   * attribute. This can be on a `zodiac-item` element, or within.
   *
   * @returns The title of the active slider item.
   */
  getLiveRegionTitle() {
    let title = '';
    const sliderElement = this.zodiac.getSliderElement();
    const titleElement = sliderElement.querySelector('.zodiac-item.active[data-zodiac-live-region-title], .zodiac-item.active [data-zodiac-live-region-title]');
    if (titleElement) {
      title = titleElement.dataset.zodiacLiveRegionTitle;
    }
    return title;
  }

  /**
   * Updates the text of the live region when the slider is moved.
   */
  updateLiveRegion() {
    this.zodiac.getEventBus().on(['move.after', 'drag.after'], () => {
      const position = this.zodiac.getPosition() + 1;
      const total = this.zodiac.getItemTotal() + 1;
      const title = this.getLiveRegionTitle();
      this.liveRegion.innerText = this.options.liveRegionText.replace('@position', position.toString()).replace('@total', total.toString()).replace('@title', title).trim();
    });
  }
}

/**
 * Manipulates the width of the slider track and each slider item.
 */
class Track extends ComponentBase {
  /**
   * {@inheritDoc ComponentBase.mount}
   */
  mount(zodiac) {
    super.mount(zodiac);
    this.setItemWidth();
    if (this.options.infiniteScrolling) {
      this.cloneSliderItems();
    }
    this.setTrackWidth();
    this.setTrackTransitionDuration();
    this.updateTrackOnResize();
    this.disableTransition();
    this.zodiac.getEventBus().emit(['track.after']);
  }

  /**
   * Clones a node, returning it with the original type.
   *
   * @param node - The node to clone.
   *
   * @returns The cloned node.
   */
  cloneNode(node) {
    return node.cloneNode(true);
  }

  /**
   * Clones the slider items for the `infiniteScrolling` option.
   */
  cloneSliderItems() {
    const {
      itemsPerView
    } = this.options;
    const itemTotal = this.zodiac.getItemTotal();
    const items = this.zodiac.getItems();
    const trackElement = this.zodiac.getTrackElement();
    for (let i = itemTotal; i > itemTotal - itemsPerView; --i) {
      if (items[i]) {
        const cloned = this.getClonedSlide(items[i]);
        cloned.classList.add('zodiac-cloned-before');
        trackElement.prepend(cloned);
      }
    }
    for (let i = 0; i < itemTotal + itemsPerView; i += 1) {
      if (items[i]) {
        const cloned = this.getClonedSlide(items[i]);
        cloned.classList.add('zodiac-cloned-after');
        trackElement.append(cloned);
      }
    }
  }

  /**
   * Disables the track transition animation.
   */
  disableTransition() {
    const eventBus = this.zodiac.getEventBus();
    const trackElement = this.zodiac.getTrackElement();
    eventBus.on(['disableTransition.before'], () => {
      trackElement.style.transition = 'none';
    });
    eventBus.on(['disableTransition.after'], () => {
      trackElement.style.transition = null;
    });
  }

  /**
   * Clones the provided slider item.
   */
  getClonedSlide(slide) {
    const cloned = this.cloneNode(slide);
    cloned.removeAttribute('id');
    cloned.classList.add('zodiac-cloned');
    cloned.setAttribute('aria-hidden', 'true');
    const selector = Utilities.focusableSelectors.join(', ');
    cloned.querySelectorAll(selector).forEach(element => {
      // Ensure none of the links nested within the cloned items can
      // receive focus.
      element.setAttribute('tabindex', '-1');
    });
    return cloned;
  }

  /**
   * Gets the margin size for slider items by dividing the gap option in half.
   *
   * @returns The gap option value divided in half.
   */
  getSliderItemMargin() {
    return this.options.gap / 2;
  }

  /**
   * Retrieves the width of the slider's inner element.
   *
   * @returns The width of the slider.
   */
  getSliderWidth() {
    const selector = this.options.classes.inner;
    const inner = this.zodiac.getSliderElement().querySelector(`.${selector}`);
    const {
      width
    } = inner.getBoundingClientRect();
    return width;
  }

  /**
   * Sets the width and margin of each slider item.
   *
   * Each slider item's width is calculated by dividing the slider's width by
   * configured total items per view minus the configured gap setting.
   */
  setItemWidth() {
    const {
      itemsPerView
    } = this.options;

    // Calculate the width of each slider item by dividing the total size of
    // the inner slider by the total items per view.
    this.zodiac.setItemWidth(this.getSliderWidth() / itemsPerView);
    const sliderItemMargin = this.getSliderItemMargin();
    this.zodiac.getItems().forEach(item => {
      // Apply the width to the slide item.
      item.style.width = `${this.zodiac.getItemWidth() - sliderItemMargin * 2}px`;

      // Add spacing between each slider item with left and right margin.
      item.style.marginLeft = `${sliderItemMargin}px`;
      item.style.marginRight = `${sliderItemMargin}px`;
    });
  }

  /**
   * Applies the transition speed setting to the track.
   */
  setTrackTransitionDuration() {
    const {
      transitionSpeed
    } = this.options;
    const eventBus = this.zodiac.getEventBus();
    eventBus.on(['move.before', 'move.after', 'drag.after'], () => {
      eventBus.emit(['transitionDuration.before']);
      this.zodiac.getTrackElement().style.transitionDuration = `${transitionSpeed}ms`;
      setTimeout(() => {
        this.zodiac.getTrackElement().style.transitionDuration = '';
        eventBus.emit(['transitionDuration.after']);
      }, transitionSpeed);
    });
  }

  /**
   * Set the width of the track element.
   *
   * The width of track element is equal to the width of the slider multiplied
   * by the total number of items.
   */
  setTrackWidth() {
    // Get all slider items, included those that have been cloned.
    const items = this.zodiac.getTrackElement().querySelectorAll('.zodiac-item');
    const trackWidth = this.zodiac.getItemWidth() * items.length;
    this.zodiac.getTrackElement().style.width = `${trackWidth}px`;
  }

  /**
   * Update the track and item width when the window is resized.
   */
  updateTrackOnResize() {
    this.zodiac.getEventBus().on(['updateEffectiveOptions.after'], () => {
      this.zodiac.getEventBus().emit(['trackUpdated.before']);
      this.setItemWidth();
      this.setTrackWidth();
      this.setTrackTransitionDuration();
      this.zodiac.getEventBus().emit(['trackUpdated.after']);
    });
  }
}

/**
 * A map of events that will represent dragging.
 */

/**
 * Adds dragging capabilities to the slider (for both mouse & touch inputs).
 */
class Drag extends ComponentBase {
  /**
   * The class used to indicate that the slider is being dragged.
   */
  draggingClass = 'dragging';

  /**
   * The value used to track and apply the `translate` CSS while dragging.
   */
  dragPosition = 0;

  /**
   * The `AbortController` for the `this.move()` method.
   */
  moveController = null;

  /**
   * Events that move the slider when dragging.
   */
  moveEventKeys = ['mousemove', 'touchmove'];

  /**
   * A flag used to determine whether the clicking of links is disallowed.
   */
  preventClick = false;

  /**
   * The position that will be given to `Zodiac` after the dragging has stopped.
   */
  snapPosition = 0;

  /**
   * Events that signal when dragging should begin.
   */
  startEventKeys = ['mousedown', 'touchstart'];

  /**
   * The position of the event dispatcher at the start of the dragging process.
   */
  startingEventPosition = 0;

  /**
   * The `AbortController` for the `this.stop()` method.
   */
  stopController = null;

  /**
   * Events that signal when dragging should end.
   */
  stopEventKeys = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];

  /**
   * How far the slider must be dragged before moving begins.
   */
  threshold = 20;

  /**
   * {@inheritDoc ComponentBase.mount}
   */
  mount(zodiac) {
    super.mount(zodiac);
    this.addStartEvents();
    this.onDragEvents();
    this.preventDefaultOnDragStart();
    this.preventDefaultClickOnDragStart();
  }

  /**
   * Applies the move events to the slider.
   */
  addMoveEvents() {
    // Create an `AbortController` to remove these events after dragging is
    // complete. This controller is recreated every time this method is called
    // because it will be disabled after it's `abort` signal is sent.
    this.moveController = new AbortController();
    this.moveEventKeys.forEach(eventType => {
      this.zodiac.getTrackElement().addEventListener(eventType, event => this.move(event), {
        signal: this.moveController.signal
      });
    });
  }

  /**
   * Applies the start events to the slider.
   */
  addStartEvents() {
    this.startEventKeys.forEach(eventType => {
      this.zodiac.getTrackElement().addEventListener(eventType, event => this.start(event));
    });
  }

  /**
   * Applies the stop events to the slider.
   */
  addStopEvents() {
    // Create an `AbortController` to remove these events after dragging is
    // complete. This controller is recreated every time this method is called
    // because it will be disabled after it's `abort` signal is sent.
    this.stopController = new AbortController();
    this.stopEventKeys.forEach(eventType => {
      this.zodiac.getTrackElement().addEventListener(eventType, () => this.stop(), {
        signal: this.stopController.signal
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
  getScreenX(event) {
    let screenX = null;
    if (window.TouchEvent && event instanceof TouchEvent) {
      screenX = event.touches[0].screenX ?? 0;
    } else if (event instanceof MouseEvent) {
      screenX = event.screenX;
    }
    return screenX;
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
  getSnapPosition(dragPosition) {
    const clonedOffset = this.zodiac.getClonedOffset();
    return -Math.round(dragPosition / this.zodiac.getItemWidth()) - clonedOffset;
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
  modifyLinks(draggable) {
    // Retrieve all links within the track element.
    const links = this.zodiac.getTrackElement().querySelectorAll('a');

    // Prevent unnecessary modification by checking if the draggable value
    // matches the prevent click state.
    if (this.preventClick === draggable) {
      links.forEach(link => {
        // Determine the source and destination of the attribute modification
        // based on the whether draggability is being enabled or disabled.
        const source = draggable ? 'data-href' : 'href';
        const destination = draggable ? 'href' : 'data-href';

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
  move(event) {
    this.zodiac.getEventBus().emit(['drag.move.before']);

    // Determine the distance between the position of current event dispatcher
    // the starting event dispatcher position.
    const currentEventPosition = this.getScreenX(event) - this.zodiac.getSliderElement().offsetLeft;
    const distance = currentEventPosition - this.startingEventPosition;

    // Exit this method if the distance is less than the drag threshold.
    if (Math.abs(distance) < this.threshold) {
      return;
    }

    // Determine by drag position by adding distance multiplied by the
    // acceleration speed.
    const dragPosition = this.dragPosition + distance;
    event.preventDefault();

    // Get the snap position from the current drag position.
    this.snapPosition = this.getSnapPosition(dragPosition);
    // Animate the dragging.
    this.zodiac.getTrackElement().style.transform = `translate3d(${dragPosition}px, 0, 0)`;
    this.zodiac.getEventBus().emit(['drag.move.after']);
  }

  /**
   * Adds the `dragging` class to the slider track while it is being dragged.
   */
  onDragEvents() {
    this.zodiac.getEventBus().on(['drag.before'], () => {
      this.zodiac.getTrackElement().classList.add(this.draggingClass);
    });
    this.zodiac.getEventBus().on(['drag.after'], () => {
      this.zodiac.getTrackElement().classList.remove(this.draggingClass);
    });
  }

  /**
   * Prevent link clicking when the slider is being dragged.
   */
  preventDefaultClickOnDragStart() {
    this.zodiac.getEventBus().on(['drag.move.before'], () => {
      this.modifyLinks(false);
    });
    this.zodiac.getEventBus().on(['drag.after'], () => {
      // Wait for the slider to finishing animating before enabling the links.
      setTimeout(() => {
        this.modifyLinks(true);
      }, this.options.transitionSpeed);
    });
  }

  /**
   * Prevents unnecessary dragging for slider items.
   */
  preventDefaultOnDragStart() {
    this.zodiac.getItems().forEach(item => {
      item.addEventListener('dragstart', event => event.preventDefault());
    });
  }

  /**
   * Removes the move events from the slider to prevent unnecessary calculations.
   */
  removeMoveEvents() {
    this.moveController.abort();
  }

  /**
   * Removes the stop events from the slider to prevent unnecessary calculations.
   */
  removeStopEvents() {
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
  start(event) {
    this.zodiac.getEventBus().emit(['drag.before']);
    const clonedOffset = this.zodiac.getClonedOffset();

    // Calculate the drag position by multiplying the slider's current position
    // by the width of a single slide. The value of this calculation is
    // converted to a negative number to animate the slider since it will
    // eventually be passed into `translate3d`.
    this.dragPosition = -((this.zodiac.getPosition() + clonedOffset) * this.zodiac.getItemWidth());
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
  stop() {
    this.zodiac.move(this.snapPosition);
    this.removeMoveEvents();
    this.removeStopEvents();
    this.zodiac.getEventBus().emit(['drag.after']);
  }
}

/**
 * The entry point for the Zodiac Slider.
 *
 * This class contains all properties and methods shared between each component.
 *
 * Components are mounted in `Zodiac.mount()`. This function iterates over each
 * component, invoking their `mount()` method & supplying itself as an argument.
 */
class Zodiac {
  /**
   * The number of cloned slider items preceding the normal slider items.
   */

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
  constructor(selector, options) {
    this.eventBus = new EventBus();
    this.selector = selector;
    this.options = new Options(this.eventBus, options);
    const effectiveOptions = this.options.getEffectiveOptions();
    this.components = this.registerComponents();
    this.sliderElement = document.querySelector(this.selector);
    this.trackElement = this.sliderElement.querySelector(`.${effectiveOptions.classes.track}`);
    this.items = this.sliderElement.querySelectorAll(`.${effectiveOptions.classes.items}`);
    this.position = 0;

    // Set the slider's initial position
    this.eventBus.on(['track.after'], () => {
      this.eventBus.emit(['disableTransition.before']);
      this.next(0);
      this.eventBus.emit(['disableTransition.after']);
    });

    // Reposition the slider items on media query change.
    this.eventBus.on(['trackUpdated.after'], () => this.next(0));
  }

  /**
   * Retrieves the number of cloned slider items before the normal slider items.
   *
   * @returns The cloned offset value.
   */
  getClonedOffset() {
    if (this.clonedOffset === undefined) {
      this.loadClonedOffset();
    }
    return this.clonedOffset;
  }

  /**
   * Retrieves the slider's effective options.
   *
   * @returns The slider's effective options.
   */
  getEffectiveOptions() {
    return this.options.getEffectiveOptions();
  }

  /**
   * Retrieves the event bus.
   *
   * @returns The event bus.
   */
  getEventBus() {
    return this.eventBus;
  }

  /**
   * Retrieves the total number of items.
   *
   * @returns The total number of items offset by 1.
   */
  getItemTotal() {
    return this.items.length - 1;
  }

  /**
   * Retrieves the width of a slider item.
   *
   * @returns The width of individual slider items.
   */
  getItemWidth() {
    return this.itemWidth;
  }

  /**
   * Retrieves the slider's items.
   *
   * @returns The slider's items.
   */
  getItems() {
    return this.items;
  }

  /**
   * Retrieves the slider's position.
   *
   * @returns The position of the slider.
   */
  getPosition() {
    return this.position;
  }

  /**
   * Retrieves the slider element.
   *
   * @returns The slider element.
   */
  getSliderElement() {
    return this.sliderElement;
  }

  /**
   * Retrieves the track element.
   *
   * @returns The track element.
   */
  getTrackElement() {
    return this.trackElement;
  }

  /**
   * Mounts the sliders components.
   *
   * @param thirdPartyComponents - A list of user defined components.
   *
   * @returns The current `Zodiac` instance.
   */
  mount(thirdPartyComponents = []) {
    for (const component of this.components.concat(thirdPartyComponents)) {
      component.mount(this);
    }
    return this;
  }

  /**
   * Moves the slider based on the provided offset.
   *
   * @param position - The position to move the slider.
   */
  move(position) {
    this.eventBus.emit(['move.before']);
    const {
      infiniteScrolling,
      transitionSpeed
    } = this.getEffectiveOptions();
    if (infiniteScrolling) {
      this.trackElement.style.transform = `translate3d(${this.convertPositionToPixels(position)}px, 0px, 0px)`;

      // Convert the position into a value that is within range.
      const itemTotal = this.getItemTotal() + 1;
      position = (position % itemTotal + itemTotal) % itemTotal;
      setTimeout(() => {
        this.eventBus.emit(['disableTransition.before']);
        const transform = this.convertPositionToPixels(position);
        this.trackElement.style.transform = `translate3d(${transform}px, 0px, 0px)`;
        this.eventBus.emit(['disableTransition.after']);
      }, transitionSpeed);
    } else {
      if (position > this.getItemTotal()) {
        position = 0;
      }
      if (position < 0) {
        position = this.getItemTotal();
      }
      const transform = this.convertPositionToPixels(position);
      this.trackElement.style.transform = `translate3d(${transform}px, 0px, 0px)`;
    }
    this.setPosition(position);
    this.eventBus.emit(['move.after']);
  }

  /**
   * Move to the next slide.
   *
   * @param offset - How many slides to move forward.
   */
  next(offset = 1) {
    this.move(this.getPosition() + offset);
  }

  /**
   * Removes a custom event listener.
   *
   * @param names - A list of event names to unsubscribe.
   *
   * @returns The current `Zodiac` instance.
   */
  off(names) {
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
  on(names, callback) {
    this.eventBus.on(names, callback);
    return this;
  }

  /**
   * Move to the previous slide.
   *
   * @param offset - How many slides to move forward.
   */
  previous(offset = 1) {
    this.move(this.getPosition() - offset);
  }

  /**
   * Sets the width of individual slider items.
   *
   * @param itemWidth - The new item width.
   */
  setItemWidth(itemWidth) {
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
  setPosition(position) {
    if (Number.isNaN(position) || position < 0 || position > this.getItemTotal()) {
      throw new RangeError(`Invalid position: ${position}`);
    }
    this.position = Math.trunc(position);
  }

  /**
   * Converts the provided positional value into a pixel value.
   *
   * @param position - This position to convert.
   *
   * @returns The converted pixel value.
   */
  convertPositionToPixels(position) {
    const clonedOffset = this.getClonedOffset();
    return -1 * (this.getItemWidth() * (position + clonedOffset));
  }

  /**
   * Loads the cloned offset value.
   */
  loadClonedOffset() {
    this.clonedOffset = 0;
    if (this.options.getEffectiveOptions().infiniteScrolling) {
      this.clonedOffset = this.getTrackElement().querySelectorAll('.zodiac-cloned-before').length;
    }
  }

  /**
   * Registers the required components provided by Zodiac.
   *
   * @returns A list of instantiated components.
   */
  registerComponents() {
    return [ItemState, UpdateEffectiveOptions(Track), UpdateEffectiveOptions(Autoplay), Controls, UpdateEffectiveOptions(Drag), LiveRegion].map(Component => new Component());
  }
}

export { Zodiac as default };
//# sourceMappingURL=zodiac.esm.js.map
