/**
 * Mocks the `Window.matchMedia` method.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia}
 */

/**
 * Type alias for a media query event listener.
 */
type MediaQueryListener = (this: MediaQueryList, ev: MediaQueryListEvent) => unknown;


interface MediaQueryList {

  /**
   * Whether or not the media query matches.
   */
  readonly matches: boolean;

  /**
   * A string representing a serialized media query.
   */
  readonly media: string;

  /**
   * A shortcut for the change event listener.
   */
  onchange: MediaQueryListener | null;

  /**
   * Adds a callback for when the media query changes.
   *
   * @deprecated Use {@link addEventListener} instead.
   *
   * @param listener - The callback to add.
   */
  addListener(listener: MediaQueryListener): void;

  /**
   * Removes a previously added callback.
   *
   * @deprecated Use {@link removeEventListener} instead.
   *
   * @param listener - The callback to remove.
   */
  removeListener(listener: MediaQueryListener): void;

  /**
   * Adds a callback for when the media query changes.
   *
   * @param listener - The callback to add.
   */
  addEventListener(type: 'change', listener: MediaQueryListener): void;

  /**
   * Removes a previously added callback.
   *
   * @param listener - The callback to remove.
   */
  removeEventListener(type: 'change', listener: MediaQueryListener): void;

  /**
   * Dispatches a change event.
   */
  dispatchEvent(event: Event): boolean;

}

/**
 * Mocks the `matchMedia` function.
 */
export default class MatchMediaMock {

  constructor() {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: (query: string): MediaQueryList => {
        this.mediaQueryList = {
          matches: query === this.currentMediaQuery,
          media: query,
          onchange: null,
          addListener: (listener) => {
            this.addListener(query, listener);
          },
          removeListener: (listener) => {
            this.removeListener(query, listener);
          },
          addEventListener: (type, listener) => {
            if (type !== 'change') return;

            this.addListener(query, listener);
          },
          removeEventListener: (type, listener) => {
            if (type !== 'change') return;

            this.removeListener(query, listener);
          },
          dispatchEvent: jest.fn(),
        };

        return this.mediaQueryList;
      },
    });
  }

  /**
   * The currently active media query.
   */
  private currentMediaQuery!: string;

  /**
   * The event listeners for each media query.
   */
  private mediaQueries: {
    [key: string]: MediaQueryListener[];
  } = {};

  /**
   * The `MediaQueryList` object for the currently active media query.
   */
  private mediaQueryList!: MediaQueryList;

  /**
   * Clears all of the registered media queries and their listeners
   */
  public clear(): void {
    this.mediaQueries = {};
  }

  /**
   * Retrieves all the registered event listeners.
   *
   * @returns An array of the registered event listeners.
   */
  public getListeners(mediaQuery: string): MediaQueryListener[] {
    let listeners = [];

    if (this.mediaQueries[mediaQuery]) {
      listeners = this.mediaQueries[mediaQuery];
    }

    return listeners;
  }

  /**
   * Retrieves the registered media queries.
   */
  public getMediaQueries(): string[] {
    return Object.keys(this.mediaQueries);
  }

  /**
   * Sets the active media query and runs the listeners for the previous one.
   *
   * @param mediaQuery - The new media query to set as active.
   */
  public useMediaQuery(mediaQuery: string): never | void {
    const previousMediaQuery = this.currentMediaQuery;

    this.currentMediaQuery = mediaQuery;

    if (this.currentMediaQuery !== previousMediaQuery) {
      if (this.mediaQueries[previousMediaQuery]) {
        const mediaQueryListEvent: Partial<MediaQueryListEvent> = {
          matches: false,
          media: mediaQuery,
        };

        const events = this.mediaQueries[previousMediaQuery].slice();

        events.forEach((listener) => {
          listener.call(this.mediaQueryList, mediaQueryListEvent as MediaQueryListEvent);
        });
      }
    }
  }

  /**
   * Adds a new listener for the specified media query.
   *
   * @param mediaQuery - The media query to add the listener too.
   * @param listener - The event listener to add.
   */
  private addListener(mediaQuery: string, listener: MediaQueryListener): void {
    if (!this.mediaQueries[mediaQuery]) {
      this.mediaQueries[mediaQuery] = [];
    }

    this.mediaQueries[mediaQuery].push(listener);
  }

  /**
   * Removes a previously added listener for the specified media query.
   *
   * @param mediaQuery - The media query to remove with the listener from.
   * @param listener - The event listener to remove.
   */
  private removeListener(mediaQuery: string, listener: MediaQueryListener): void {
    const query = this.mediaQueries[mediaQuery];
    const listenerIndex = query.indexOf(listener);

    if (listenerIndex > -1) {
      query.splice(listenerIndex, 1);
    }
  }

}
