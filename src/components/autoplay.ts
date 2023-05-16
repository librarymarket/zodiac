import Zodiac from '../zodiac';

import { ComponentBase } from './componentBase';
import { Utilities } from '../utilities';

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
export class Autoplay extends ComponentBase {

  /**
   * The autoplay interval ID.
   */
  protected interval: NodeJS.Timeout;

  /**
   * An `AbortController` for resetting the mouse events in `this.pauseOnHover()`.
   */
  protected abortController: AbortController;

  /**
   * {@inheritDoc ComponentBase.mount}
   */
  public mount(zodiac: Zodiac): void {
    super.mount(zodiac);

    this.abortController = new AbortController();

    this.start();
    this.pauseOnDrag();
    this.pauseOnFocus();
    this.pauseOnHover();

    // Reconfigure autoplay and pause on hover configuration when the options
    // are rebuilt.
    this.zodiac.getEventBus().on(['rebuildEffectiveOptions.after'], () => {
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
  protected pauseOnDrag(): void {
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
  protected pauseOnFocus(): void {
    const focusableSelectors = Utilities.focusableSelectors.join(', ');
    const focusable = this.zodiac.getSliderElement().querySelectorAll<HTMLElement>(focusableSelectors);

    focusable.forEach((element) => {
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
  protected pauseOnHover(): void {
    if (!this.options.pauseOnHover) {
      // This is a no-op method if pause on hover is not enabled.
      return;
    }

    const sliderElement = this.zodiac.getSliderElement();

    sliderElement.addEventListener('mouseenter', () => {
      this.stop();
    }, { signal: this.abortController.signal });
    sliderElement.addEventListener('mouseleave', () => {
      this.start();
    }, { signal: this.abortController.signal });
  }

  /**
   * Auto-rotates the slider using the configured interval.
   */
  protected start(): void {
    const { autoplay, autoplaySpeed } = this.options;

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
  protected stop(): void {
    clearInterval(this.interval);
  }

}
