import MatchMediaMock from '../../matchMediaMock';
import { htmlFixture } from '../../fixtures/html';

import Zodiac from '../../../src/zodiac';

const defaultSelector = '.zodiac';

const matchMedia = new MatchMediaMock();
let sliderWidth = 1400;

describe('Track', () => {
  describe('initializeTrack()', () => {
    beforeEach(() => {
      document.body.innerHTML = htmlFixture;

      document.querySelector<HTMLElement>('.zodiac').style.width = `${sliderWidth}px`;
      document.querySelector<HTMLElement>('.zodiac-inner').style.width = `${sliderWidth}px`;
    });

    test('should calculate item and track widths', () => {
      new Zodiac(defaultSelector, {
        itemsPerView: 4,
        gap: 8,
      }).mount();

      const trackWidth = document.querySelector<HTMLElement>('.zodiac-track').getBoundingClientRect().width;
      const itemWidth = document.querySelector<HTMLElement>('.zodiac-item').getBoundingClientRect().width;

      expect(trackWidth).toBe(3150);
      expect(itemWidth).toBe(342);
    });
  });

  describe('updateTrackOnResize()', () => {
    beforeEach(() => {
      document.body.innerHTML = htmlFixture;

      document.querySelector<HTMLElement>('.zodiac').style.width = `${sliderWidth}px`;
      document.querySelector<HTMLElement>('.zodiac-inner').style.width = `${sliderWidth}px`;
    });

    afterEach(() => {
      matchMedia.clear();
    });

    test('should reconfigure the options when the media query changes ', () => {
      matchMedia.useMediaQuery('(min-width: 992px)');

      const modifiedOptions = {
        itemsPerView: 3,
        mediaQueryOptions: {
          '(min-width: 992px)': {
            itemsPerView: 6,
          },
        }
      };

      const zodiac = new Zodiac(defaultSelector, modifiedOptions).mount();

      expect(zodiac.getItemWidth()).toBe(233.33333333333334);

      // Simulate the slider width changing with the media query change.
      sliderWidth = 300;
      document.querySelector<HTMLElement>('.zodiac').style.width = `${sliderWidth}px`;
      document.querySelector<HTMLElement>('.zodiac-inner').style.width = `${sliderWidth}px`;

      matchMedia.useMediaQuery('(min-width: 400px)');

      expect(zodiac.getItemWidth()).toBe(50);
    });
  });
});
