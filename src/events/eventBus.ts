/**
 * Defines a zodiac slider event.
 */
export interface EventInterface {
  /**
   * The callback function for the event.
   */
  callback: CallableFunction;

  /**
   * The name of the event.
   */
  name: string;
}

/**
 * Provides an event bus for tracking slider related events.
 */
export class EventBus {

  /**
   * A list of subscribed events.
   */
  protected events: EventInterface[];

  constructor() {
    this.events = [];
  }

  /**
   * Emits events by name with arguments for the callback function.
   *
   * @param names - The event names to emit.
   * @param args - Arguments for the callback function.
   */
  public emit(names: string[], ...args: unknown[]): void {
    names.forEach((name) => {
      this.filterByName(name).forEach((event) => {
        event.callback(...args);
      });
    });
  }

  /**
   * Unsubscribes event(s) by name(s).
   *
   * @param names - A list of event names to unsubscribe.
   */
  public off(names: string[]): void {
    for (const name of names) {
      this.events = this.events.filter((event) => event.name !== name);
    }
  }

  /**
   * Subscribes an event with a callback function.
   *
   * @param names - A list of event names to subscribe to.
   * @param callback - A callback function to run on the events.
   */
  public on(names: string[], callback: CallableFunction): void {
    names.forEach((name) => this.events.push({name, callback}));
  }

  /**
   * Filter events by name.
   *
   * @param name - The name to filter by.
   *
   * @returns The result event set.
   */
  protected filterByName(name: string): EventInterface[] {
    return this.events.filter((event) => event.name === name);
  }

}
