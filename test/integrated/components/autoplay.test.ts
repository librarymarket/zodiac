import { htmlFixture } from '../../fixtures/html';

import Zodiac from '../../../src/zodiac';

const autoplaySpeed = 1000;

describe('Autoplay', () => {
  beforeEach(() => {
    document.body.innerHTML = htmlFixture;
  });

  describe('pauseOnFocus()', () => {
    test('should pause autoplay on focus', () => {
      const zodiac = new Zodiac('.zodiac', {
        autoplaySpeed,
      }).mount();

      const zodiacItem = document.querySelector<HTMLElement>('.zodiac-item a');

      zodiacItem.focus();

      jest.advanceTimersByTime(autoplaySpeed);

      // Should pause autoplay on focus.
      expect(zodiac.getPosition()).toBe(0);

      zodiacItem.blur();

      jest.advanceTimersByTime(autoplaySpeed);

      // Should continue autoplay on blur.
      expect(zodiac.getPosition()).toBe(1);
    });
  });

  describe('pauseOnHover()', () => {
    test('should move slides after the specified speed', () => {
      new Zodiac('.zodiac', {
        autoplaySpeed,
      }).mount();

      const unmodifiedMouseover = document.body.innerHTML;

      jest.advanceTimersByTime(autoplaySpeed);

      expect(document.body.innerHTML).not.toBe(unmodifiedMouseover);
    });

    test('should pause autoplay on hover', () => {
      const zodiac = new Zodiac('.zodiac', {
        autoplaySpeed,
        pauseOnHover: true,
      }).mount();

      const zodiacElement = document.querySelector<HTMLElement>('.zodiac');

      zodiacElement.dispatchEvent(new MouseEvent('mouseenter', {
        view: window,
        bubbles: true,
        cancelable: true,
      }));

      jest.advanceTimersByTime(autoplaySpeed);

      // Should pause autoplay on mouseenter.
      expect(zodiac.getPosition()).toBe(0);

      zodiacElement.dispatchEvent(new MouseEvent('mouseleave', {
        view: window,
        bubbles: true,
        cancelable: true,
      }));

      jest.advanceTimersByTime(autoplaySpeed);

      // Should continue autoplay on mouseleave.
      expect(zodiac.getPosition()).toBe(1);
    });

    test('should not pause autoplay on hover if pauseOnHover is false', () => {
      const zodiac = new Zodiac('.zodiac', {
        autoplaySpeed,
        pauseOnHover: false,
      }).mount();

      const zodiacElement = document.querySelector<HTMLElement>('.zodiac');

      zodiacElement.dispatchEvent(new MouseEvent('mouseenter', {
        view: window,
        bubbles: true,
        cancelable: true,
      }));

      jest.advanceTimersByTime(autoplaySpeed);

      expect(zodiac.getPosition()).not.toBe(0);
    });
  });

  describe('start()', () => {
    test('should not autoplay when autoplay is set to false', () => {
      const zodiac = new Zodiac('.zodiac', {
        autoplay: false,
        autoplaySpeed,
      }).mount();

      jest.advanceTimersByTime(autoplaySpeed);

      expect(zodiac.getPosition()).toBe(0);
    });
  });
});
