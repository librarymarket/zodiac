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

    if (this.options.infiniteScrolling) {
      this.cloneSliderItems();
    }

    this.setTrackWidth();
    this.setTrackTransitionDuration();
    this.updateTrackOnResize();
    this.zodiac.getEventBus().emit(['track.after']);
  }

  /**
   * Clones the slider items for the `infiniteScrolling` option.
   */
  protected cloneSliderItems(): void {
    const { itemsPerView } = this.options;
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
   * Clones the provided slider item.
   */
  protected getClonedSlide(slide: HTMLElement): HTMLElement {
    const cloned = slide.cloneNode(true);

    if (!(cloned instanceof HTMLElement)) {
      throw new TypeError(`Expected cloned to be HTMLElement instance, received ${cloned.constructor.name} instead.`);
    }

    cloned.removeAttribute('id');
    cloned.classList.add('zodiac-cloned');

    return cloned;
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

    const eventBus = this.zodiac.getEventBus();

    eventBus.on(['move.before', 'move.after', 'drag.after'], () => {
      this.zodiac.getTrackElement().style.transitionDuration = `${transitionSpeed}ms`;

      setTimeout(() => {
        this.zodiac.getTrackElement().style.transitionDuration = '';
      }, transitionSpeed);
    });
  }

  /**
   * Set the width of the track element.
   *
   * The width of track element is equal to the width of the slider multiplied
   * by the total number of items.
   */
  protected setTrackWidth(): void {
    // Get all slider items, included those that have been cloned.
    const items = this.zodiac.getTrackElement().querySelectorAll('.zodiac-item');
    const trackWidth = this.zodiac.getItemWidth() * items.length;

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
