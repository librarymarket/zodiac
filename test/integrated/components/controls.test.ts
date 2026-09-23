import {
  htmlFixture,
  htmlFixtureIndicators,
  htmlFixtureNoControls,
  htmlFixturePlayPauseControls,
} from '../../fixtures/html';

import Zodiac from '../../../src/zodiac';

describe('Controls', () => {
  describe('setupControls()', () => {
    beforeEach(() => {
      document.body.innerHTML = htmlFixture;
    });

    test('should cycle to the next slide on click', () => {
      const zodiac = new Zodiac('.zodiac').mount();

      expect(zodiac.getPosition()).toBe(0);

      document.querySelector<HTMLElement>('[data-zodiac-direction="right"]')!.click();

      expect(zodiac.getPosition()).toBe(1);
    });

    test('should cycle to the previous slide on click', () => {
      const zodiac = new Zodiac('.zodiac').mount();

      expect(zodiac.getPosition()).toBe(0);

      document.querySelector<HTMLElement>('[data-zodiac-direction="left"]')!.click();

      expect(zodiac.getPosition()).toBe(8);
    });

    test('should not throw error if there are no controls', () => {
      document.body.innerHTML = htmlFixtureNoControls;

      expect(() => new Zodiac('.zodiac').mount()).not.toThrow(TypeError);
    });

    test('should create and update indicator controls', () => {
      document.body.innerHTML = htmlFixtureIndicators;

      const zodiac = new Zodiac('.zodiac').mount();
      const indicators = document.querySelectorAll<HTMLElement>('.zodiac-indicator');

      expect(indicators).toHaveLength(zodiac.getItems().length);
      expect(indicators[0].dataset.zodiacPosition).toBe('0');
      expect(indicators[0].getAttribute('aria-current')).toBe('true');
      expect(indicators[0].classList).toContain('active');

      indicators[1].click();

      expect(zodiac.getPosition()).toBe(1);
      expect(indicators[0].getAttribute('aria-current')).toBe('false');
      expect(indicators[1].getAttribute('aria-current')).toBe('true');

      indicators[0].click();

      expect(zodiac.getPosition()).toBe(0);
    });

    test('should not create indicators when they are disabled', () => {
      document.body.innerHTML = htmlFixtureIndicators;

      new Zodiac('.zodiac', { enableIndicators: false }).mount();

      expect(document.querySelectorAll('.zodiac-indicator')).toHaveLength(0);
    });

    test('should update play and pause control visibility on click', () => {
      document.body.innerHTML = htmlFixturePlayPauseControls;

      new Zodiac('.zodiac').mount();

      const playBtn = document.querySelector<HTMLElement>('[data-zodiac-play]')!;
      const pauseBtn = document.querySelector<HTMLElement>('[data-zodiac-pause]')!;

      expect(playBtn.classList).toContain('zodiac-hidden');
      expect(pauseBtn.classList).not.toContain('zodiac-hidden');

      pauseBtn.click();

      expect(playBtn.classList).not.toContain('zodiac-hidden');
      expect(pauseBtn.classList).toContain('zodiac-hidden');

      playBtn.click();

      expect(playBtn.classList).toContain('zodiac-hidden');
      expect(pauseBtn.classList).not.toContain('zodiac-hidden');
    });

    test('should disable the controls when autoplay is disabled', () => {
      document.body.innerHTML = htmlFixturePlayPauseControls;

      new Zodiac('.zodiac', { autoplay: false }).mount();

      const playBtn = document.querySelector<HTMLElement>('[data-zodiac-play]')!;
      const pauseBtn = document.querySelector<HTMLElement>('[data-zodiac-pause]')!;

      expect(playBtn.hasAttribute('disabled')).toBe(true);
      expect(pauseBtn.hasAttribute('disabled')).toBe(true);
    });

    test('should show the play control when pauseOnLoad is enabled', () => {
      document.body.innerHTML = htmlFixturePlayPauseControls;

      new Zodiac('.zodiac', { pauseOnLoad: true }).mount();

      const playBtn = document.querySelector<HTMLElement>('[data-zodiac-play]')!;
      const pauseBtn = document.querySelector<HTMLElement>('[data-zodiac-pause]')!;

      expect(playBtn.classList).not.toContain('zodiac-hidden');
      expect(pauseBtn.classList).toContain('zodiac-hidden');
    });
  });
});
