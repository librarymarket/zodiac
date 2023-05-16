import MatchMediaMock from '../matchMediaMock';
import { htmlFixture } from '../fixtures/html';

import Zodiac from '../../src/zodiac';
import { Options } from '../../src/options';
import { EventBus } from '../../src/events/eventBus';

const defaultSelector = '.zodiac';

const matchMedia = new MatchMediaMock();

describe('Options', () => {
  describe('constructor', () => {
    beforeEach(() => {
      document.body.innerHTML = htmlFixture;
    });

    afterEach(() => {
      matchMedia.clear();
    });

    test.each([
      {mediaQuery: '(min-width: 600px)', expected: 2},
      {mediaQuery: '(min-width: 768px)', expected: 3},
      {mediaQuery: '(min-width: 992px)', expected: 4},
      {mediaQuery: '(min-width: 1200px)', expected: 5},
      {mediaQuery: '(min-width: 1400px)', expected: 6},
    ])('should get $expected from $mediaQuery', ({ mediaQuery, expected }) => {
      matchMedia.useMediaQuery(mediaQuery);

      const zodiac = new Zodiac(defaultSelector, {
        itemsPerView: 2,
        mediaQueryOptions: {
          "(min-width: 768px)": {
            itemsPerView: 3,
          },
          "(min-width: 992px)": {
            itemsPerView: 4,
          },
          "(min-width: 1200px)": {
            itemsPerView: 5,
          },
          "(min-width: 1400px)": {
            itemsPerView: 6,
          },
        },
      }).mount();

      const effectiveOptions = zodiac.getEffectiveOptions();

      expect(effectiveOptions.itemsPerView).toBe(expected);
    });

    test.each([
      {mediaQuery: '(max-width: 1024px)', expected: 3},
      {mediaQuery: '(max-width: 992px)', expected: 2},
      {mediaQuery: '(max-width: 768px)', expected: 1},
    ])('should get $expected from $mediaQuery', ({ mediaQuery, expected }) => {
      matchMedia.useMediaQuery(mediaQuery);

      const zodiac = new Zodiac(defaultSelector, {
        itemsPerView: 3,
        mediaQueryOptions: {
          '(max-width: 992px)': {
            itemsPerView: 2,
          },
          '(max-width: 768px)': {
            itemsPerView: 1,
          },
        },
      });

      const effectiveOptions = zodiac.getEffectiveOptions();

      expect(effectiveOptions.itemsPerView).toBe(expected);
    });

    test('should throw error if classes are set in the media query options', () => {
      const eventBus = new EventBus();

      expect(() => {
        return new Options(eventBus, {
          mediaQueryOptions: {
            '(max-width: 992px)': {
              classes: {
                track: 'test',
              }
            },
          }
        });
      }).toThrow(TypeError);
    });
  });
});
