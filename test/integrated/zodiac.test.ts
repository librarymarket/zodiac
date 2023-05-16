import { htmlFixture, htmlFixtureMultipleSliders } from '../fixtures/html';

import Zodiac from '../../src/zodiac';

import { ComponentBase } from '../../src/components/componentBase';
import { Options } from '../../src/options';

const defaultSelector = '.zodiac';

describe('Zodiac', () => {
  beforeEach(() => {
    document.body.innerHTML = htmlFixture;
  });

  describe('constructor()', () => {
    test('should initialize with default options', () => {
      const zodiac = new Zodiac(defaultSelector);

      const expected = (new Options(zodiac.getEventBus())).getEffectiveOptions();

      expect(zodiac.getEffectiveOptions()).toStrictEqual(expected);
    });

    test('should initialize with modified options', () => {
      const modifiedOptions = {
        autoplay: false,
        autoplaySpeed: 3000,
        classes: {
          controls: 'test-zodiac-controls',
          inner: 'test-zodiac-inner',
          items: 'test-zodiac-item',
          track: 'test-zodiac-track',
        },
        gap: 4,
        itemsPerView: 3,
        pauseOnHover: false,
      };

      const zodiac = new Zodiac(defaultSelector, modifiedOptions);

      const expected = new Options(zodiac.getEventBus(), modifiedOptions).getEffectiveOptions();

      expect(zodiac.getEffectiveOptions()).toStrictEqual(expected);
    });

    test('should have a unique track element between multiple sliders', () => {
      document.body.innerHTML = htmlFixtureMultipleSliders;

      const zodiac1 = new Zodiac('#zodiac-1');
      const zodiac2 = new Zodiac('#zodiac-2');

      expect(zodiac1.getTrackElement()).not.toStrictEqual(zodiac2.getTrackElement());
    });
  });

  describe('mount()', () => {
    test('should successfully mount the slider components', () => {
      const unmodifiedHtml = document.body.innerHTML;

      const zodiac = new Zodiac(defaultSelector).mount();

      const modifiedHtml = document.body.innerHTML;

      expect(zodiac).toBeTruthy();
      expect(modifiedHtml).not.toEqual(unmodifiedHtml);
    });

    test('should mount third party components', () => {
      const mockFunction = jest.fn();

      /**
       * A test component that will run a jest mock function.
       */
      class TestComponent extends ComponentBase {

        /**
         * {@inheritDoc ComponentBase.mount}
         */
        public mount(zodiac: Zodiac) {
          super.mount(zodiac);

          mockFunction();
        }

      }

      new Zodiac(defaultSelector).mount([
        new TestComponent(),
      ]);

      expect(mockFunction).toHaveBeenCalled();
    });
  });

  describe('off()', () => {
    test('should unsubscribe events from the main zodiac instance', () => {
      const zodiac = new Zodiac(defaultSelector).mount();
      const eventBus = zodiac.getEventBus();

      const mockFn = jest.fn();

      zodiac.on(['test.event'], mockFn);

      const result = zodiac.off(['test.event']);

      eventBus.emit(['test.event']);

      expect(mockFn).not.toHaveBeenCalled();
      // Test chain-ability
      expect(zodiac).toStrictEqual(result);
    });
  });

  describe('on()', () => {
    test('should run subscribed callback on emit', () => {
      const zodiac = new Zodiac(defaultSelector).mount();
      const eventBus = zodiac.getEventBus();

      const mockFn: CallableFunction = jest.fn();

      const result = zodiac.on(['test.event'], mockFn);

      eventBus.emit(['test.event']);

      expect(mockFn).toHaveBeenCalled();
      // Test chain-ability
      expect(zodiac).toStrictEqual(result);
    });
  });

  describe('position', () => {
    test('should have a initial position of 0', () => {
      const zodiac = new Zodiac(defaultSelector).mount();

      expect(zodiac.getPosition()).toEqual(0);
    });

    test('should increase position by 1 on move', () => {
      const zodiac = new Zodiac(defaultSelector).mount();

      zodiac.next();

      expect(zodiac.getPosition()).toEqual(1);
    });

    test('should not increase position above the total number of items', () => {
      const zodiac = new Zodiac(defaultSelector).mount();

      zodiac.getItems().forEach(() => {
        zodiac.next();
      });

      expect(zodiac.getPosition()).toEqual(0);
    });

    test('should not decrease position below 0', () => {
      const zodiac = new Zodiac(defaultSelector).mount();

      zodiac.previous(2);

      expect(zodiac.getPosition()).not.toEqual(-1);
      expect(zodiac.getPosition()).toEqual(zodiac.getItemTotal());
    });

    test('should only set whole numbers as positions', () => {
      const zodiac = new Zodiac(defaultSelector).mount();

      zodiac.setPosition(1.5);

      expect(zodiac.getPosition()).toBe(1);
    });

    test.each([
      -1,
      300,
      NaN,
    ])('should throw RangeError if an invalid range is provided', (position) => {
      const zodiac = new Zodiac(defaultSelector).mount();

      const setPosition = () => {
        zodiac.setPosition(position);
      };

      expect(setPosition).toThrowError(RangeError);
    });
  });
});
