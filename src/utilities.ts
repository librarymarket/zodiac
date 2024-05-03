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

}
