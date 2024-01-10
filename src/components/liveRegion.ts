import Zodiac from '../zodiac';

import { ComponentBase } from './componentBase';

/**
 * Adds a live region, so the slide position can be announced to screen readers.
 */
export class LiveRegion extends ComponentBase {

  /**
   * The live region element.
   */
  protected liveRegion: HTMLDivElement;

  /**
   * {@inheritDoc ComponentBase.mount}
   */
  public mount(zodiac: Zodiac): void {
    super.mount(zodiac);

    if (this.options.enableLiveRegion) {
      this.createLiveRegion();
      this.updateLiveRegion();
    }
  }

  /**
   * Creates and adds the live region element to the slider.
   */
  protected createLiveRegion() {
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
  protected getLiveRegionTitle(): string {
    let title = '';

    const sliderElement = this.zodiac.getSliderElement();
    const titleElement = sliderElement.querySelector<HTMLElement>(
      '.zodiac-item.active[data-zodiac-live-region-title], .zodiac-item.active [data-zodiac-live-region-title]',
    );

    if (titleElement) {
      title = titleElement.dataset.zodiacLiveRegionTitle;
    }

    return title;
  }

  /**
   * Updates the text of the live region when the slider is moved.
   */
  protected updateLiveRegion() {
    this.zodiac.getEventBus().on(['move.after', 'drag.after'], () => {
      const position = this.zodiac.getPosition() + 1;
      const total = this.zodiac.getItemTotal() + 1;
      const title = this.getLiveRegionTitle();

      this.liveRegion.innerText = this.options.liveRegionText
        .replace('@position', position.toString())
        .replace('@total', total.toString())
        .replace('@title', title)
        .trim();
    });
  }

}
