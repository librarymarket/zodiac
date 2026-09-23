import MatchMediaMock from '../matchMediaMock';
import { htmlFixture } from '../fixtures/html';

import Zodiac from '../../src/zodiac';
import { Options, OptionsInterface } from '../../src/options';
import { EventBus } from '../../src/eventBus';

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

    test.each([undefined, {}])('fills omitted options from defaults', (input) => {
      const options = new Options(new EventBus(), input).getEffectiveOptions();

      expect(options.autoplay).toBe(true);
      expect(options.enableIndicators).toBe(true);
      expect(options.pauseOnLoad).toBe(false);
      expect(options.itemsPerView).toBe(5);
      expect(options.classes).toEqual({
        inner: 'zodiac-inner',
        items: 'zodiac-item',
        track: 'zodiac-track',
      });
      expect(options).not.toHaveProperty('mediaQueryLists');
      expect(options).not.toHaveProperty('mediaQueryOptions');
    });

    test('fills omitted class names when one is supplied', () => {
      const input: OptionsInterface = {
        classes: {track: 'custom-track'},
      };
      const options = new Options(new EventBus(), input).getEffectiveOptions();

      expect(options.classes).toEqual({
        inner: 'zodiac-inner',
        items: 'zodiac-item',
        track: 'custom-track',
      });
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

    test.each([
      {optionName: 'classes', value: {track: 'test'}},
      {optionName: 'enableIndicators', value: true},
      {optionName: 'enableLiveRegion', value: true},
      {optionName: 'liveRegionText', value: 'test'},
      {optionName: 'pauseOnLoad', value: true},
    ])('should throw error if $optionName is set in the media query options', ({ optionName, value }) => {
      const eventBus = new EventBus();

      expect(() => {
        return new Options(eventBus, {
          mediaQueryOptions: {
            '(max-width: 992px)': {
              [optionName]: value,
            },
          }
        });
      }).toThrow(TypeError);
    });
  });
});
