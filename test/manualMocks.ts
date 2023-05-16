/**
 * A implementation of `getBoundingClientRect` that only retrieves the width.
 *
 * This is necessary because `jsdom` doesn't contain a layout engine.
 *
 * @see https://github.com/jsdom/jsdom/issues/653
 *
 * @returns A mock `DOMRect` object.
 */
window.HTMLElement.prototype.getBoundingClientRect = function(): DOMRect {
  return {
    width: parseFloat(this.style.width) || 0,
    x: 0,
    y: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    toJSON: () => jest.fn(),
  };
};

/**
 * An implementation of the `Touch` class.
 *
 * @see https://github.com/jsdom/jsdom/issues/1508
 */
window.Touch = class implements Touch {

  altitudeAngle: number;

  azimuthAngle: number;

  clientX: number;

  clientY: number;

  force: number;

  identifier: number;

  pageX: number;

  pageY: number;

  radiusX: number;

  radiusY: number;

  rotationAngle: number;

  screenX: number;

  screenY: number;

  target: EventTarget;

  touchType: TouchType;

  constructor(touchInitDict: TouchInit) {
    for (const key in touchInitDict) {
      if (touchInitDict[key]) {
        this[key] = touchInitDict[key];
      }
    }
  }

};
