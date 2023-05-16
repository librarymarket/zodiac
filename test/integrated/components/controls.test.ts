import { htmlFixture, htmlFixtureNoControls } from '../../fixtures/html';

import Zodiac from '../../../src/zodiac';

describe('Controls', () => {
  describe('setupControls()', () => {
    beforeEach(() => {
      document.body.innerHTML = htmlFixture;
    });

    test('should cycle to the next slide on click', () => {
      const zodiac = new Zodiac('.zodiac').mount();

      expect(zodiac.getPosition()).toBe(0);

      document.querySelector<HTMLElement>('[data-zodiac-direction="right"]').click();

      expect(zodiac.getPosition()).toBe(1);
    });

    test('should cycle to the previous slide on click', () => {
      const zodiac = new Zodiac('.zodiac').mount();

      expect(zodiac.getPosition()).toBe(0);

      document.querySelector<HTMLElement>('[data-zodiac-direction="left"]').click();

      expect(zodiac.getPosition()).toBe(8);
    });

    test('should not throw error if there are no controls', () => {
      document.body.innerHTML = htmlFixtureNoControls;

      expect(() => new Zodiac('.zodiac').mount()).not.toThrowError(TypeError);
    });
  });
});
