import { htmlFixture } from '../../fixtures/html';

import Zodiac from '../../../src/zodiac';

const defaultSelector = '.zodiac';

describe('LiveRegion', () => {
  beforeEach(() => {
    document.body.innerHTML = htmlFixture;
  });

  test('should create a live region element', () => {
    const zodiac = new Zodiac(defaultSelector).mount();

    const liveRegion = zodiac.getSliderElement().querySelector<HTMLElement>('.zodiac-live-region');

    expect(liveRegion).toBeTruthy();
  });

  test('should update the live region element when the slider moves', () => {
    const zodiac = new Zodiac(defaultSelector).mount();

    zodiac.next();

    const liveRegion = zodiac.getSliderElement().querySelector<HTMLElement>('.zodiac-live-region');

    expect(liveRegion.innerText).toBe('Slide 2 of 9 2. Text');
  });

  test('should get the title from the .zodiac-item, if present', () => {
    const zodiac = new Zodiac(defaultSelector).mount();

    // Move the title to the `zodiac-item` element.
    zodiac.getItems().forEach((item) => {
      const title = item.querySelector<HTMLElement>('a').dataset.zodiacLiveRegionTitle;

      item.querySelector<HTMLElement>('a').dataset.zodiacLiveRegionTitle = '';

      item.dataset.zodiacLiveRegionTitle = title;
    });

    zodiac.next();

    const liveRegion = zodiac.getSliderElement().querySelector<HTMLElement>('.zodiac-live-region');

    expect(liveRegion.innerText).toBe('Slide 2 of 9 2. Text');
  });

  test('should update the live region if there is no title', () => {
    const zodiac = new Zodiac(defaultSelector).mount();

    // Move the title to the `zodiac-item` element.
    zodiac.getItems().forEach((item) => {
      item.querySelector<HTMLElement>('a').dataset.zodiacLiveRegionTitle = '';
    });

    zodiac.next();

    const liveRegion = zodiac.getSliderElement().querySelector<HTMLElement>('.zodiac-live-region');

    expect(liveRegion.innerText).toBe('Slide 2 of 9');
  });
});
