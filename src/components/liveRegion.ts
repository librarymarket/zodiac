import Zodiac from '../zodiac';

import { ComponentBase } from './componentBase';

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

    this.createLiveRegion();
    this.updateLiveRegion();
  }

  protected createLiveRegion() {
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.classList.add('zodiac-live-region');

    this.zodiac.getSliderElement().appendChild(this.liveRegion);
  }

  protected updateLiveRegion() {
    this.zodiac.getEventBus().on(['move.after'], () => {
      const position = this.zodiac.getPosition() + 1;
      const itemTotal = this.zodiac.getItemTotal();

      this.liveRegion.innerText = `Slide ${position} of ${itemTotal}`;
    });
  }

}
