import { EventBus } from './events/eventBus';
import { Options, OptionsInterface } from './options';

import { ComponentInterface, UpdateEffectiveOptions } from './components/componentBase';
import { Autoplay } from './components/autoplay';
import { Controls } from './components/controls';
import { ItemState } from './components/itemState';
import { Track } from './components/track';
import { Drag } from './components/drag';

/**
 * The entry point for the Zodiac Slider.
 *
 * This class contains all properties and methods shared between each component.
 *
 * Components are mounted in `Zodiac.mount()`. This function iterates over each
 * component, invoking their `mount()` method & supplying itself as an argument.
 */
export default class Zodiac {

  /**
   * The slider components.
   */
  protected components: ComponentInterface[];

  /**
   * The event bus.
   */
  protected eventBus: EventBus;

  /**
   * The slider items.
   */
  protected items: NodeListOf<HTMLElement>;

  /**
   * The width of each slider item.
   */
  protected itemWidth: number;

  /**
   * The slider options.
   */
  protected options: Options;

  /**
   * The slider's current position in the item sequence (zero-indexed).
   */
  protected position: number;

  /**
   * The CSS selector for identifying the slider.
   */
  protected selector: string;

  /**
   * The element on which the slider has been initialized.
   */
  protected readonly sliderElement: HTMLElement;

  /**
   * The slider track element.
   */
  protected readonly trackElement: HTMLElement;

  /**
   * Constructs a `Zodiac` instance based on the provided selector and options.
   *
   * @param selector - The base selector to use.
   * @param options - The options to initialize the slider with.
   */
  public constructor(selector: string, options?: OptionsInterface) {
    this.eventBus = new EventBus();

    this.selector = selector;
    this.options = new Options(this.eventBus, options);

    const effectiveOptions = this.options.getEffectiveOptions();

    this.components = this.registerComponents();

    this.sliderElement = document.querySelector(this.selector);
    this.trackElement = this.sliderElement.querySelector(`.${effectiveOptions.classes.track}`);
    this.items = this.sliderElement.querySelectorAll(`.${effectiveOptions.classes.items}`);

    this.position = 0;

    // Reposition the slider items on media query change.
    this.eventBus.on(['trackUpdated.after'], () => this.next(0));
  }

  /**
   * Retrieves the slider's effective options.
   *
   * @returns The slider's effective options.
   */
  public getEffectiveOptions(): OptionsInterface {
    return this.options.getEffectiveOptions();
  }

  /**
   * Retrieves the event bus.
   *
   * @returns The event bus.
   */
  public getEventBus(): EventBus {
    return this.eventBus;
  }

  /**
   * Retrieves the total number of items.
   *
   * @returns The total number of items offset by 1.
   */
  public getItemTotal(): number {
    return this.items.length - 1;
  }

  /**
   * Retrieves the width of a slider item.
   *
   * @returns The width of individual slider items.
   */
  public getItemWidth(): number {
    return this.itemWidth;
  }

  /**
   * Retrieves the slider's items.
   *
   * @returns The slider's items.
   */
  public getItems(): NodeListOf<HTMLElement> {
    return this.items;
  }

  /**
   * Retrieves the slider's position.
   *
   * @returns The position of the slider.
   */
  public getPosition(): number {
    return this.position;
  }

  /**
   * Retrieves the slider element.
   *
   * @returns The slider element.
   */
  public getSliderElement(): HTMLElement {
    return this.sliderElement;
  }

  /**
   * Retrieves the track element.
   *
   * @returns The track element.
   */
  public getTrackElement(): HTMLElement {
    return this.trackElement;
  }

  /**
   * Mounts the sliders components.
   *
   * @param thirdPartyComponents - A list of user defined components.
   *
   * @returns The current `Zodiac` instance.
   */
  public mount(thirdPartyComponents: ComponentInterface[] = []): this {
    for (const component of this.components.concat(thirdPartyComponents)) {
      component.mount(this);
    }

    return this;
  }

  /**
   * Moves the slider based on the provided offset.
   *
   * @param offset - The position to move the slider.
   */
  public move(offset: number): void {
    const transform = -1 * (this.getItemWidth() * offset);

    this.trackElement.style.transform = `translate3d(${transform}px, 0px, 0px)`;
  }

  /**
   * Move to the next slide.
   *
   * @param offset - How many slides to move forward.
   */
  public next(offset = 1): void {
    this.eventBus.emit(['move.before']);

    let position = this.getPosition();

    position = position + offset;

    if (position > this.getItemTotal()) {
      position = 0;
    }

    this.move(position);

    this.setPosition(position);

    this.eventBus.emit(['move.after']);
  }

  /**
   * Removes a custom event listener.
   *
   * @param names - A list of event names to unsubscribe.
   *
   * @returns The current `Zodiac` instance.
   */
  public off(names: string[]): this {
    this.eventBus.off(names);

    return this;
  }

  /**
   * Adds a custom event listener with a callback function.
   *
   * @param names - A list of event names to subscribe to.
   * @param callback - A callback function to run on the events.
   *
   * @returns The current `Zodiac` instance.
   */
  public on(names: string[], callback: CallableFunction): this {
    this.eventBus.on(names, callback);

    return this;
  }

  /**
   * Move to the previous slide.
   *
   * @param offset - How many slides to move forward.
   */
  public previous(offset = 1): void {
    this.eventBus.emit(['move.before']);

    let position = this.getPosition();

    position = position - offset;

    if (position < 0) {
      position = this.getItemTotal();
    }

    this.move(position);

    this.setPosition(position);

    this.eventBus.emit(['move.after']);
  }

  /**
   * Sets the width of individual slider items.
   *
   * @param itemWidth - The new item width.
   */
  public setItemWidth(itemWidth: number): void {
    this.itemWidth = itemWidth;
  }

  /**
   * Sets the sliders position.
   *
   * @throws {@link RangeError}
   * Will throw an error if the position is `Nan`, less than zero, or greater
   * than the total number of items.
   *
   * @param position - The position to set.
   */
  public setPosition(position: number): void {
    if (Number.isNaN(position) || position < 0 || position > this.getItemTotal()) {
      throw new RangeError(`Invalid position: ${position}`);
    }

    this.position = Math.trunc(position);
  }

  /**
   * Registers the required components provided by Zodiac.
   *
   * @returns A list of instantiated components.
   */
  protected registerComponents(): ComponentInterface[] {
    return [
      ItemState,
      UpdateEffectiveOptions(Track),
      UpdateEffectiveOptions(Autoplay),
      Controls,
      UpdateEffectiveOptions(Drag),
    ].map((Component) => new Component());
  }

}
