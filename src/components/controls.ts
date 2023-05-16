import Zodiac from '../zodiac';

import { ComponentBase } from './componentBase';

/**
 * Adds UI control capabilities to the slider.
 */
export class Controls extends ComponentBase {

  /**
   * {@inheritDoc ComponentBase.mount}
   */
  public mount(zodiac: Zodiac): void {
    super.mount(zodiac);

    this.setUpControls();
  }

  /**
   * Attaches navigation buttons to the next & previous slider controls.
   */
  protected setUpControls(): void {
    const sliderElement = this.zodiac.getSliderElement();

    const nextBtn = sliderElement.querySelector('[data-zodiac-direction="right"]');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.zodiac.next());
    }

    const prevBtn = sliderElement.querySelector('[data-zodiac-direction="left"]');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.zodiac.previous());
    }
  }

}
