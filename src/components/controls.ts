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
