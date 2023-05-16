import Zodiac from '../zodiac';

import { ComponentBase } from './componentBase';
import { Utilities } from '../utilities';

/**
 * Keeps the state of each item updated.
 */
export class ItemState extends ComponentBase {

  /**
   * The class that indicates an item is active.
   */
  protected readonly activeClass = 'active';

  /**
   * {@inheritDoc ComponentBase.mount}
   */
  public mount(zodiac: Zodiac): void {
    super.mount(zodiac);

    this.setActiveClass();
    this.setAccessibilityAttributes();
    this.setInitialItemState();
    this.adjustItemStateOnMove();
  }

  /**
   * Adds the active class to an item.
   *
   * @param item - The element to apply the active class to.
   */
  protected addActiveClassToItem(item: HTMLElement): void {
    item.classList.add(this.activeClass);
  }

  /**
   * Adjusts each item's state by listening to slider events.
   */
  protected adjustItemStateOnMove(): void {
    this.zodiac.getEventBus().on([
      'move.after',
      'drag.after',
    ], () => {
      this.setActiveClass();
      this.setAccessibilityAttributes();
    });
  }

  /**
   * Removes the active class from each item in the slider.
   */
  protected removeActiveClass(): void {
    this.zodiac.getItems().forEach((item) => item.classList.remove(this.activeClass));
  }

  /**
   * Applies the appropriate attributes for accessibility to each item.
   *
   * Items that aren't currently visible will be set as hidden (using
   * `aria-hidden`) and have a negative tab index applied to them.
   */
  protected setAccessibilityAttributes(): void {
    const { itemsPerView } = this.options;
    const position = this.zodiac.getPosition();

    // Compute a range of visible slide positions based on the the number of
    // items per view and the current position.
    const visibleRange = Utilities.range(itemsPerView, position);

    this.zodiac.getItems().forEach((item, index) => {
      const visible = visibleRange.includes(index);

      // This value must be converted to a string since `setAttribute()`
      // expects `value` to be a string.
      const ariaHidden = (!visible).toString();

      item.setAttribute('aria-hidden', ariaHidden);
      this.setTabindex(item, visible);

      // Collect a list of focusable items within each slider item.
      const focusableItems = item.querySelectorAll(Utilities.focusableSelectors.join(', '));

      // Set the tab index for each focusable element within each slider item.
      focusableItems.forEach((element: HTMLElement) => {
        this.setTabindex(element, visible);
      });
    });
  }

  /**
   * Sets the active class on the active item and removes it from the rest.
   *
   * There can only be one active item at a time. The active item is tracked by
   * `Zodiac.getPosition()`.
   */
  protected setActiveClass(): void {
    const currentPosition = this.zodiac.getPosition();

    const activeItem = this.zodiac.getItems().item(currentPosition);
    this.removeActiveClass();
    this.addActiveClassToItem(activeItem);
  }

  /**
   * Applies an indexing attribute to each item.
   */
  protected setInitialItemState(): void {
    this.zodiac.getItems().forEach((item, index) => {
      item.setAttribute('data-zodiac-item-index', (index + 1).toString());
    });
  }

  /**
   * Sets the tabindex of an element based on whether it is visible.
   *
   * @param element - The element to modify.
   * @param visible - Whether or not the element is active.
   */
  protected setTabindex(element: HTMLElement, visible: boolean): void {
    if (!visible) {
      element.setAttribute('tabindex', '-1');
    } else {
      element.removeAttribute('tabindex');
    }
  }

}
