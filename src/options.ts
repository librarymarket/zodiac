import { EventBus } from './events/eventBus';

/**
 * A collection of classes used by the slider to identify specific elements.
 *
 * These classes cannot be set in the media query options.
 */
export interface ClassesInterface {

  /**
   * The class used for the inner slider container.
   */
  inner?: string;

  /**
   * The class used by the slider items.
   */
  items?: string;

  /**
   * The class for the track slider div surrounding the items.
   */
  track?: string;

}

/**
 * A collection of options used to configure the slider.
 */
export interface OptionsInterface {

  /**
   * Whether or not the slider should autoplay.
   */
  autoplay?: boolean;

  /**
   * The delay before the carousel will transition.
   */
  autoplaySpeed?: number;

  /**
   * A collection of classes used by the slider to identify specific elements.
   *
   * These classes cannot be set in the media query options.
   */
  classes?: ClassesInterface;

  /**
   * Enables the live region element.
   */
  enableLiveRegion?: boolean;

  /**
   * The gap between slides.
   */
  gap?: number;

  /**
   * The total number of items to display per view.
   */
  itemsPerView?: number;

  /**
   * A template that is used for the live region's text.
   *
   * The following patterns will be replaced programmatically:
   * - `@position` - The position of the active slider item.
   * - `@total` - The total number of slider items
   * - `@title` - The title of the slider item. The title is derived from the
   *   `data-zodiac-live-region-title` attribute within or on an item.
   */
  liveRegionText?: string;

  /**
   * The media queries configured with options.
   */
  mediaQueryLists?: {

    [key: string]: MediaQueryList;

  };

  /**
   * A collection of options applied at the specific media query.
   */
  mediaQueryOptions?: MediaQueryOptionsInterface;

  /**
   * Whether or not autoplay should pause on hover.
   */
  pauseOnHover?: boolean;

  /**
   * The speed at which slides will transition.
   */
  transitionSpeed?: number;

}

/**
 * A collection of options applied at the specific media query.
 */
export interface MediaQueryOptionsInterface {

  [key: string]: OptionsInterface;

}

/**
 * The media queries configured with options.
 */
export interface MediaQueryListsInterface {

  /**
   * The `MediaQueryList` for the supplied options.
   */
  mediaQueryList: MediaQueryList;

  /**
   * The options for the provided `MediaQueryList`.
   */
  options: OptionsInterface;
}

/**
 * An object used to configure the slider.
 */
export class Options {

  /**
   * The base options unrestricted by any media query.
   */
  protected baseOptions: OptionsInterface = {
    autoplay: true,
    autoplaySpeed: 5000,
    classes: {
      inner: 'zodiac-inner',
      items: 'zodiac-item',
      track: 'zodiac-track',
    },
    enableLiveRegion: true,
    gap: 8,
    itemsPerView: 5,
    liveRegionText: 'Slide @position of @total @title',
    pauseOnHover: true,
    transitionSpeed: 500,
  };

  /**
   * The active options based on the computed media queries.
   */
  protected effectiveOptions: OptionsInterface;

  /**
   * The event bus.
   *
   * The event bus is used to notify when a media query has changed.
   */
  protected eventBus: EventBus;

  /**
   * The media queries configured with options.
   */
  protected mediaQueryLists: MediaQueryListsInterface[] = [];

  /**
   * A collection of options applied at the specific media query.
   */
  protected mediaQueryOptions: MediaQueryOptionsInterface = {};

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
  public constructor(eventBus: EventBus, options: OptionsInterface = {}) {
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
            options: mediaQueryOptionSet,
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
  public getEffectiveOptions(): OptionsInterface {
    return this.effectiveOptions;
  }

  /**
   * Rebuilds the effective options.
   *
   * If there are any matching media query options, they will override the base
   * options.
   */
  protected rebuildEffectiveOptions() {
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
  protected validateMediaQueryOptions(options: OptionsInterface) {
    const invalidOptions = [
      'classes',
      'enableLiveRegion',
      'liveRegionText',
    ];

    invalidOptions.forEach((invalidOption) => {
      if (Object.hasOwnProperty.call(options, invalidOption)) {
        throw new TypeError(`The ${invalidOption} property can only be set once.`);
      }
    });
  }

}
