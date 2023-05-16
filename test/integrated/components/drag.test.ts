import { htmlFixture } from '../../fixtures/html';

import Zodiac from '../../../src/zodiac';

const sliderWidth = 1400;

describe('Drag', () => {
  beforeEach(() => {
    document.body.innerHTML = htmlFixture;

    document.querySelector<HTMLElement>('.zodiac').style.width = `${sliderWidth}px`;
    document.querySelector<HTMLElement>('.zodiac-inner').style.width = `${sliderWidth}px`;
  });

  test('should move the slider by dragging with a mouse', () => {
    const zodiac = new Zodiac('.zodiac').mount();

    const beforeDrag = document.body.innerHTML;
    expect(zodiac.getPosition()).toBe(0);

    const sliderElement = document.querySelector<HTMLElement>('.zodiac-track');

    sliderElement.dispatchEvent(new MouseEvent('mousedown', {
      view: window,
      bubbles: true,
      cancelable: true,
    }));

    const trackElement = document.querySelector<HTMLElement>('.zodiac-track');
    expect(trackElement.classList.contains('dragging')).toBe(true);

    sliderElement.dispatchEvent(new MouseEvent('mousemove', {
      view: window,
      bubbles: true,
      cancelable: true,
      screenX: 0,
    }));

    sliderElement.dispatchEvent(new MouseEvent('mousemove', {
      view: window,
      bubbles: true,
      cancelable: true,
      screenX: -zodiac.getItemWidth(),
    }));

    sliderElement.dispatchEvent(new MouseEvent('mouseleave', {
      bubbles: true,
      cancelable: true,
    }));

    expect(trackElement.classList.contains('dragging')).toBe(false);

    expect(beforeDrag).not.toBe(document.body.innerHTML);
    expect(zodiac.getPosition()).toBe(2);
  });

  test('should move the slider to the end when dragging backwards at the beginning', () => {
    const zodiac = new Zodiac('.zodiac').mount();

    const beforeDrag = document.body.innerHTML;
    expect(zodiac.getPosition()).toBe(0);

    const sliderElement = document.querySelector<HTMLElement>('.zodiac-track');

    sliderElement.dispatchEvent(new MouseEvent('mousedown', {
      view: window,
      bubbles: true,
      cancelable: true,
    }));

    const trackElement = document.querySelector<HTMLElement>('.zodiac-track');
    expect(trackElement.classList.contains('dragging')).toBe(true);

    sliderElement.dispatchEvent(new MouseEvent('mousemove', {
      view: window,
      bubbles: true,
      cancelable: true,
      screenX: 0,
    }));

    sliderElement.dispatchEvent(new MouseEvent('mousemove', {
      view: window,
      bubbles: true,
      cancelable: true,
      screenX: zodiac.getItemWidth(),
    }));

    sliderElement.dispatchEvent(new MouseEvent('mouseleave', {
      bubbles: true,
      cancelable: true,
    }));

    expect(trackElement.classList.contains('dragging')).toBe(false);

    expect(beforeDrag).not.toBe(document.body.innerHTML);
    expect(zodiac.getPosition()).toBe(zodiac.getItemTotal());
  });

  test('should move the slider to the start when dragging forwards at the end', () => {
    const zodiac = new Zodiac('.zodiac').mount();

    const beforeDrag = document.body.innerHTML;
    expect(zodiac.getPosition()).toBe(0);

    const sliderElement = document.querySelector<HTMLElement>('.zodiac-track');

    zodiac.previous();

    expect(zodiac.getPosition()).toBe(zodiac.getItemTotal());

    sliderElement.dispatchEvent(new MouseEvent('mousedown', {
      view: window,
      bubbles: true,
      cancelable: true,
    }));

    const trackElement = document.querySelector<HTMLElement>('.zodiac-track');
    expect(trackElement.classList.contains('dragging')).toBe(true);

    sliderElement.dispatchEvent(new MouseEvent('mousemove', {
      view: window,
      bubbles: true,
      cancelable: true,
      screenX: -zodiac.getItemWidth() * zodiac.getItemTotal(),
    }));

    sliderElement.dispatchEvent(new MouseEvent('mousemove', {
      view: window,
      bubbles: true,
      cancelable: true,
      screenX: -zodiac.getItemWidth() * (zodiac.getItemTotal() * 2),
    }));

    sliderElement.dispatchEvent(new MouseEvent('mouseleave', {
      bubbles: true,
      cancelable: true,
    }));

    expect(trackElement.classList.contains('dragging')).toBe(false);

    expect(beforeDrag).not.toBe(document.body.innerHTML);
    expect(zodiac.getPosition()).toBe(0);
  });

  test('should move the slider by dragging with via touch', () => {
    new Zodiac('.zodiac').mount();

    const beforeDrag = document.body.innerHTML;

    const sliderElement = document.querySelector<HTMLElement>('.zodiac-track');

    sliderElement.dispatchEvent(new TouchEvent('touchstart', {
      bubbles: true,
      cancelable: true,
      touches: [
        new Touch({
          identifier: 122,
          target: sliderElement,
          screenX: 0,
        }),
      ],
    }));

    const trackElement = document.querySelector<HTMLElement>('.zodiac-track');
    expect(trackElement.classList.contains('dragging')).toBe(true);

    sliderElement.dispatchEvent(new TouchEvent('touchmove', {
      view: window,
      bubbles: true,
      cancelable: true,
      touches: [
        new Touch({
          identifier: 123,
          target: sliderElement,
          screenX: 300,
        }),
      ],
    }));

    sliderElement.dispatchEvent(new TouchEvent('touchend', {
      bubbles: true,
      cancelable: true,
      touches: [
        new Touch({
          identifier: 124,
          target: sliderElement,
          screenX: 300,
        }),
      ],
    }));

    expect(beforeDrag).not.toBe(document.body.innerHTML);
  });

  test('should modify link attributes on drag.', () => {
    const zodiac = new Zodiac('.zodiac').mount();
    const eventBus = zodiac.getEventBus();

    const links: Array<{href: string, element: HTMLAnchorElement}> = [];

    document.querySelectorAll<HTMLAnchorElement>('.zodiac-item a').forEach((link) => {
      links.push({
        href: link.getAttribute('href'),
        element: link,
      });
    });

    eventBus.emit(['drag.move.before']);

    links.forEach((link) => {
      expect(link.element.hasAttribute('href')).not.toBe(true);
      expect(link.element.getAttribute('data-href')).toBe(link.href);
      expect(link.element.draggable).toBe(false);
    });

    eventBus.emit(['drag.after']);

    const effectiveOptions = zodiac.getEffectiveOptions();

    jest.advanceTimersByTime(effectiveOptions.transitionSpeed);

    links.forEach((link) => {
      expect(link.element.getAttribute('href')).toBe(link.href);
      expect(link.element.hasAttribute('data-href')).not.toBe(true);
      expect(link.element.draggable).toBe(true);
    });
  });

  test('should disable item dragging while track is being dragged', () => {
    new Zodiac('.zodiac').mount();

    const firstItem = document.querySelector<HTMLElement>('.zodiac-item');

    const dragstartEvent = new Event('dragstart', {
      bubbles: true,
    });

    Object.assign(dragstartEvent, { clientX: 0, clientY: 1 });

    dragstartEvent.preventDefault = jest.fn();

    firstItem.dispatchEvent(dragstartEvent);

    expect(dragstartEvent.preventDefault).toBeCalled();
  });
});
