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
    this.setUpIndicatorControls();
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
   * Set up indicator controls.
   */
  protected setUpIndicatorControls(): void {
    const sliderElement = this.zodiac.getSliderElement();

    const indicators = sliderElement.querySelectorAll<HTMLElement>('.zodiac-indicator');

    indicators.forEach((indicator) => {
      indicator.addEventListener('click', (event) => {
        event.preventDefault();

        const position = indicator.dataset.zodiacPosition;

        if (position) {
          this.zodiac.move(Number(position));
        }
      });
    });

    this.zodiac.getEventBus().on(['move.after', 'drag.after'], () => {
      const currentPosition = this.zodiac.getPosition();

      indicators.forEach((indicator) => {
        indicator.setAttribute('aria-current', 'false');
        indicator.classList.remove('active');
      });

      const activeIndicator = sliderElement.querySelector(`[data-zodiac-position="${currentPosition}"]`);

      activeIndicator?.classList?.add('active');
      activeIndicator?.setAttribute('aria-current', 'true');
    });
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

    const toggleHidden = (element: HTMLElement) => element.classList.toggle('zodiac-hidden');

    const playBtn = sliderElement.querySelector('[data-zodiac-play]');

    if (playBtn) {
      playBtn.classList.add('zodiac-hidden');

      playBtn.addEventListener('click', () => {
        eventBus.emit(['play'], playBtn);
      });

      eventBus.on(['play'], toggleHidden);
    }

    const pauseBtn = sliderElement.querySelector('[data-zodiac-pause]');

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        eventBus.emit(['pause'], pauseBtn);
      });

      eventBus.on(['pause'], toggleHidden);
    }

    if (playBtn && pauseBtn) {
      eventBus.on(['play', 'pause'], () => {
        playBtn.classList.toggle('zodiac-hidden');
        pauseBtn.classList.toggle('zodiac-hidden');
      });
    }
  }

}
