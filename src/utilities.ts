/**
 * A collection of static helper methods.
 */
export class Utilities {

  /**
   * CSS selectors for focusable elements.
   */
  public static readonly focusableSelectors = [
    '* a',
    '* area',
    '* input',
    '* select',
    '* textarea',
    '* button',
    '* iframe',
    '* object',
    '* embed',
    '* *[tabindex]',
    '* *[contenteditable]',
  ];

  /**
   * Generates an array of numbers starting at a given position.
   *
   * @param size - The size of the array to generate.
   * @param startAt - The position to start at.
   *
   * @returns The generated array.
   */
  public static range(size: number, startAt = 0): number[] {
    return [...Array(size).keys()].map((index) => index + startAt);
  }

  /**
   * Maps a number in an input range to a number in an output range.
   *
   * This method takes an input number that exists with a specific range, and
   * outputs a number scaled to an output range.
   *
   * @see {@link https://math.stackexchange.com/questions/377169/going-from-a-value-inside-1-1-to-a-value-in-another-range}
   *
   * @param item - The original number within the input range.
   * @param inMin - The minimum number in the input range.
   * @param inMax - The maximum number in the input range.
   * @param outMin - The minimum number in the output range.
   * @param outMax - The maximum number in the output range.
   *
   * @returns The new number within the output range.
   */
  public static rangeMap(item: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return (item - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

}
