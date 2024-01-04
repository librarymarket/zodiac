import { OptionsInterface } from '../options';

import Zodiac from '../zodiac';

/**
 * Defines the structure of a component.
 *
 * Components in Zodiac are used to compartmentalize specific areas of concern
 * within the slider. Functionality that is common between all components is
 * placed in the base `Zodiac` instance.
 */
export interface ComponentInterface {

  /**
   * Mounts the component to the slider.
   */
  mount(zodiac: Zodiac): void;

}

/**
 * A base implementation of ComponentInterface.
 * @api
 */
export abstract class ComponentBase implements ComponentInterface {

  /**
   * The slider's options.
   */
  protected options: OptionsInterface;

  /**
   * The slider instance.
   */
  protected zodiac: Zodiac;

  /**
   * {@inheritDoc ComponentInterface.mount}
   */
  public mount(zodiac: Zodiac): void {
    this.zodiac = zodiac;
    this.options = this.zodiac.getEffectiveOptions();
  }

}

// The constructor for the `UpdateEffectiveOptions` mixin. The `any` type is
// required for the mixin's constructor.
// @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UpdateEffectiveOptionsContructor = new (...args: any[]) => ComponentBase;

/**
 * A mixin that rebuilds the options when they are changed.
 *
 * @returns A mixin that rebuilds the effective options.
 */
export function UpdateEffectiveOptions<TBase extends UpdateEffectiveOptionsContructor>(Base: TBase) {
  return class UpdatingEffectiveOptions extends Base {

    public mount(zodiac: Zodiac): void {
      super.mount(zodiac);

      this.zodiac.getEventBus().on(['rebuildEffectiveOptions.after'], () => {
        this.zodiac.getEventBus().emit(['updateEffectiveOptions.before']);
        this.options = this.zodiac.getEffectiveOptions();
        this.zodiac.getEventBus().emit(['updateEffectiveOptions.after']);
      });
    }

  };
}
