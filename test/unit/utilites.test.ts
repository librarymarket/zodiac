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
});
