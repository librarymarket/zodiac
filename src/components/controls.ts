import Zodiac from '../zodiac';

import { ComponentBase } from './componentBase';

/**
 * Adds UI control capabilities to the slider.
 */
export class Controls extends ComponentBase {

  /**
   * A flag that determines whether movement by controls is allowed.
   */
  protected allowControlMovement = true;

  /**
   * {@inheritDoc ComponentBase.mount}
   */
  public mount(zodiac: Zodiac): void {
    super.mount(zodiac);

    this.determineIfControlMovementAllowed();
    this.setUpNextPreviousControls();
    this.setUpPlayPauseControls();
  }


  /**
   * Determines if movement by controls is allowed.
   *
   * Movement by controls is disabled when the slider is actively transitioning.
   */
  protected determineIfControlMovementAllowed(): void {
    const eventBus = this.zodiac.getEventBus();

    eventBus.on(['transitionDuration.before'], () => this.allowControlMovement = false);
    eventBus.on(['transitionDuration.after'], () => this.allowControlMovement = true);
  }

  /**
   * Set up the next and previous controls.
   */
  protected setUpNextPreviousControls(): void {
    const sliderElement = this.zodiac.getSliderElement();

    const nextBtn = sliderElement.querySelector('[data-zodiac-direction="right"]');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.allowControlMovement) {
          this.zodiac.next();
        }
      });
    }

    const prevBtn = sliderElement.querySelector('[data-zodiac-direction="left"]');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.allowControlMovement) {
          this.zodiac.previous();
        }
      });
    }
  }

  /**
   * Set up the play and pause controls.
   */
  protected setUpPlayPauseControls() {
    const sliderElement = this.zodiac.getSliderElement();
    const eventBus = this.zodiac.getEventBus();

    const playBtn = sliderElement.querySelector('[data-zodiac-play]');

    if (playBtn) {
      playBtn.classList.add('zodiac-hidden');

      playBtn.addEventListener('click', () => {
        eventBus.emit(['play']);
      });
    }

    const pauseBtn = sliderElement.querySelector('[data-zodiac-pause]');

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        eventBus.emit(['pause']);
      });
    }

    if (playBtn && pauseBtn) {
      eventBus.on(['play', 'pause'], () => {
        playBtn.classList.toggle('zodiac-hidden');
        pauseBtn.classList.toggle('zodiac-hidden');
      });
    }
  }

}
