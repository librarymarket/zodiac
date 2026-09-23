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

    if (this.options.enableIndicators) {
      this.createIndicatorControls();
      this.setUpIndicatorControls();
    }

    this.setUpNextPreviousControls();
    this.setUpPlayPauseControls();
  }

  /**
   * Create an indicator control for each slider item.
   */
  protected createIndicatorControls(): void {
    const indicatorList = this.zodiac.getSliderElement().querySelector('.zodiac-indicators');

    if (!indicatorList || indicatorList.querySelector('.zodiac-indicator')) {
      return;
    }

    this.zodiac.getItems().forEach((_item, index) => {
      const indicator = document.createElement('button');

      indicator.classList.add('zodiac-indicator');
      indicator.setAttribute('aria-label', `Go to ${index + 1}`);
      indicator.setAttribute('aria-current', 'false');
      indicator.setAttribute('type', 'button');
      indicator.dataset.zodiacPosition = index.toString();

      indicatorList.appendChild(indicator);
    });
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

        if (position !== undefined) {
          this.zodiac.move(Number(position));
        }
      });
    });

    const updateIndicators = () => {
      const currentPosition = this.zodiac.getPosition();

      indicators.forEach((indicator) => {
        indicator.setAttribute('aria-current', 'false');
        indicator.classList.remove('active');
      });

      const activeIndicator = sliderElement.querySelector(`[data-zodiac-position="${currentPosition}"]`);

      activeIndicator?.classList?.add('active');
      activeIndicator?.setAttribute('aria-current', 'true');
    };

    updateIndicators();
    this.zodiac.getEventBus().on(['move.after', 'drag.after'], updateIndicators);
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

    const playBtn = sliderElement.querySelector<HTMLElement>('[data-zodiac-play]');
    const pauseBtn = sliderElement.querySelector<HTMLElement>('[data-zodiac-pause]');

    if (!playBtn || !pauseBtn) {
      return;
    }

    if (this.options.autoplay && this.options.autoplaySpeed > 0) {
      const updateControls = (playing: boolean) => {
        playBtn.classList.toggle('zodiac-hidden', playing);
        pauseBtn.classList.toggle('zodiac-hidden', !playing);
      };

      updateControls(!this.options.pauseOnLoad);

      const eventBus = this.zodiac.getEventBus();

      playBtn.addEventListener('click', () => {
        eventBus.emit(['play']);
      });

      pauseBtn.addEventListener('click', () => {
        eventBus.emit(['pause']);
      });

      eventBus.on(['play'], () => updateControls(true));
      eventBus.on(['pause'], () => updateControls(false));
    } else {
      playBtn.setAttribute('disabled', 'true');
      pauseBtn.setAttribute('disabled', 'true');
    }

  }

}
