import { htmlFixture } from '../../fixtures/html';

import Zodiac from '../../../src/zodiac';

const autoplaySpeed = 1000;

describe('Autoplay', () => {
  beforeEach(() => {
    document.body.innerHTML = htmlFixture;
  });

  describe('pauseOnFocus()', () => {
    test('should pause autoplay on focus', () => {
      new Zodiac('.zodiac', {
        autoplaySpeed,
      }).mount();

      const beforeFocus = document.body.innerHTML;

      const zodiacItem = document.querySelector<HTMLElement>('.zodiac-item a');

      zodiacItem.focus();

      jest.advanceTimersByTime(autoplaySpeed);

      // Should pause autoplay on focus.
      expect(document.body.innerHTML).toBe(beforeFocus);

      const beforeBlur = document.body.innerHTML;

      zodiacItem.blur();

      jest.advanceTimersByTime(autoplaySpeed);

      // Should continue autoplay on blur.
      expect(document.body.innerHTML).not.toBe(beforeBlur);
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
      new Zodiac('.zodiac', {
        autoplaySpeed,
        pauseOnHover: true,
      }).mount();

      const beforeMouseenter = document.body.innerHTML;

      const zodiacElement = document.querySelector<HTMLElement>('.zodiac');

      zodiacElement.dispatchEvent(new MouseEvent('mouseenter', {
        view: window,
        bubbles: true,
        cancelable: true,
      }));

      jest.advanceTimersByTime(autoplaySpeed);

      // Should pause autoplay on mouseenter.
      expect(document.body.innerHTML).toBe(beforeMouseenter);

      const beforeMouseleave = document.body.innerHTML;

      zodiacElement.dispatchEvent(new MouseEvent('mouseleave', {
        view: window,
        bubbles: true,
        cancelable: true,
      }));

      jest.advanceTimersByTime(autoplaySpeed);

      // Should continue autoplay on mouseleave.
      expect(document.body.innerHTML).not.toBe(beforeMouseleave);
    });

    test('should no pause autoplay on hover if pauseOnHover is false', () => {
      new Zodiac('.zodiac', {
        autoplaySpeed,
        pauseOnHover: false,
      }).mount();

      const beforeMouseenter = document.body.innerHTML;

      const zodiacElement = document.querySelector<HTMLElement>('.zodiac');

      zodiacElement.dispatchEvent(new MouseEvent('mouseenter', {
        view: window,
        bubbles: true,
        cancelable: true,
      }));

      jest.advanceTimersByTime(autoplaySpeed);

      expect(document.body.innerHTML).not.toBe(beforeMouseenter);
    });
  });

  describe('start()', () => {
    test('should not autoplay when autoplay is set to false', () => {
      new Zodiac('.zodiac', {
        autoplay: false,
        autoplaySpeed,
      }).mount();

      const beforeAutoplay = document.body.innerHTML;

      jest.advanceTimersByTime(autoplaySpeed);

      expect(document.body.innerHTML).toBe(beforeAutoplay);
    });
  });
});
