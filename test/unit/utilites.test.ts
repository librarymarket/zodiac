import { Utilities } from '../../src/utilities';

describe('Utilities', () => {
  describe('range()', () => {
    test('should generate an array of numbers', () => {
      const size = 5;

      const actual = Utilities.range(size);
      const expected = [0, 1, 2, 3, 4];

      expect(actual).toStrictEqual(expected);
    });

    test('should generate an array of numbers starting at the given position', () => {
      const size = 5;
      const startAt = 3;

      const actual = Utilities.range(size, startAt);
      const expected = [3, 4, 5, 6, 7];

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('rangeMap', () => {
    test.each([
      [3, 1, 4, 4, 2, 5],
      [20, 1, 40, 30, 11, 50],
      [55, 20, 100, 101.5625, 25, 200],
    ])('should shift %i at range %i to %i to %i at range %i to %i', (item, aMin, aMax, expected, bMin, bMax) => {
      const actual = Utilities.rangeMap(item, aMin, aMax, bMin, bMax);

      expect(actual).toBe(expected);
    });
  });
});
