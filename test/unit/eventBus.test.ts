import { EventBus } from '../../src/events/eventBus';

let eventBus: EventBus = null;

describe('EventBus', () => {
  beforeEach(() => {
    eventBus = new EventBus();
  });

  test('should run subscribed callback on emit', () => {
    const mockFn: CallableFunction = jest.fn();

    eventBus.on(['test.event'], mockFn);

    eventBus.emit(['test.event']);

    expect(mockFn).toHaveBeenCalled();
  });

  test('should run callback for multiple subscriptions on emit', () => {
    const mockFn: CallableFunction = jest.fn();

    const events = [
      'test.event.1',
      'test.event.2',
      'test.event.3',
    ];

    eventBus.on(events, mockFn);

    eventBus.emit(events);

    expect(mockFn).toHaveBeenCalledTimes(events.length);
  });

  test('should unsubscribe from provided events', () => {
    const mockFn = jest.fn();

    eventBus.on(['test.event'], mockFn);

    eventBus.off(['test.event']);

    eventBus.emit(['test.event']);

    expect(mockFn).not.toHaveBeenCalled();
  });
});
