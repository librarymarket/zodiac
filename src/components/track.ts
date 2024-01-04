import Zodiac from '../zodiac';

import { ComponentBase } from './componentBase';

/**
 * Manipulates the width of the slider track and each slider item.
 */
export class Track extends ComponentBase {

  /**
   * {@inheritDoc ComponentBase.mount}
   */
  public mount(zodiac: Zodiac): void {
    super.mount(zodiac);

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
  protected getSliderItemMargin(): number {
    return this.options.gap / 2;
  }

  /**
   * Retrieves the width of the slider's inner element.
   *
   * @returns The width of the slider.
   */
  protected getSliderWidth(): number {
    const selector = this.options.classes.inner;
    const inner = this.zodiac.getSliderElement().querySelector(`.${selector}`);

    const { width } = inner.getBoundingClientRect();

    return width;
  }

  /**
   * Sets the width and margin of each slider item.
   *
   * Each slider item's width is calculated by dividing the slider's width by
   * configured total items per view minus the configured gap setting.
   */
  protected setItemWidth(): void {
    const { itemsPerView } = this.options;

    // Calculate the width of each slider item by dividing the total size of
    // the inner slider by the total items per view.
    this.zodiac.setItemWidth(this.getSliderWidth() / itemsPerView);

    const sliderItemMargin = this.getSliderItemMargin();

    this.zodiac.getItems().forEach((item) => {
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
  protected setTrackTransitionDuration(): void {
    const { transitionSpeed } = this.options;
    this.zodiac.getTrackElement().style.transitionDuration = `${transitionSpeed}ms`;
  }

  /**
   * Set the width of the track element.
   *
   * The width of track element is equal to the width of the slider multiplied
   * by the total number of items.
   */
  protected setTrackWidth(): void {
    const trackWidth = this.zodiac.getItemWidth() * this.zodiac.getItems().length;

    this.zodiac.getTrackElement().style.width = `${trackWidth}px`;
  }

  /**
   * Update the track and item width when the window is resized.
   */
  protected updateTrackOnResize(): void {
    this.zodiac.getEventBus().on(['updateEffectiveOptions.after'], () => {
      this.zodiac.getEventBus().emit(['trackUpdated.before']);
      this.setItemWidth();
      this.setTrackWidth();
      this.setTrackTransitionDuration();
      this.zodiac.getEventBus().emit(['trackUpdated.after']);
    });
  }

}
