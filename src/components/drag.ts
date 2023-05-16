import Zodiac from '../zodiac';

import { ComponentBase } from './componentBase';
import { Utilities } from '../utilities';

type DragEvent = MouseEvent | TouchEvent;

/**
 * A map of events that will represent dragging.
 */
interface DragEventMap {
  'mousedown': DragEvent,
  'mousemove': DragEvent,
  'mouseleave': DragEvent,
  'mouseup': DragEvent,
  'touchcancel': DragEvent,
  'touchend': DragEvent,
  'touchmove': DragEvent,
  'touchstart': DragEvent,
}

type EventKey = keyof DragEventMap;

/**
 * Adds dragging capabilities to the slider (for both mouse & touch inputs).
 */
export class Drag extends ComponentBase {

  /**
   * The class used to indicate that the slider is being dragged.
   */
  protected readonly draggingClass = 'dragging';

  /**
   * The value used to track and apply the `translate` CSS while dragging.
   */
  protected dragPosition = 0;

  /**
   * The `AbortController` for the `this.move()` method.
   */
  protected moveController: AbortController = null;

  /**
   * Events that move the slider when dragging.
   */
  protected readonly moveEventKeys: EventKey[] = [
    'mousemove',
    'touchmove',
  ];

  /**
   * A flag used to determine whether the clicking of links is disallowed.
   */
  protected preventClick = false;

  /**
   * The position that will be given to `Zodiac` after the dragging has stopped.
   */
  protected snapPosition = 0;

  /**
   * Events that signal when dragging should begin.
   */
  protected readonly startEventKeys: EventKey[] = [
    'mousedown',
    'touchstart',
  ];

  /**
   * The position of the event dispatcher at the start of the dragging process.
   */
  protected startingEventPosition = 0;

  /**
   * The `AbortController` for the `this.stop()` method.
   */
  protected stopController: AbortController = null;

  /**
   * Events that signal when dragging should end.
   */
  protected readonly stopEventKeys: EventKey[] = [
    'mouseup',
    'mouseleave',
    'touchend',
    'touchcancel',
  ];

  /**
   * How far the slider must be dragged before moving begins.
   */
  protected readonly threshold = 20;

  /**
   * {@inheritDoc ComponentBase.mount}
   */
  public mount(zodiac: Zodiac): void {
    super.mount(zodiac);

    this.addStartEvents();
    this.onDragEvents();
    this.preventDefaultOnDragStart();
    this.preventDefaultClickOnDragStart();
  }

  /**
   * Applies the move events to the slider.
   */
  protected addMoveEvents(): void {
    // Create an `AbortController` to remove these events after dragging is
    // complete. This controller is recreated every time this method is called
    // because it will be disabled after it's `abort` signal is sent.
    this.moveController = new AbortController();

    this.moveEventKeys.forEach((eventType) => {
      this.zodiac.getTrackElement().addEventListener(eventType, (event) => this.move(event), { signal: this.moveController.signal });
    });
  }

  /**
   * Applies the start events to the slider.
   */
  protected addStartEvents(): void {
    this.startEventKeys.forEach((eventType) => {
      this.zodiac.getTrackElement().addEventListener(eventType, (event) => this.start(event));
    });
  }

  /**
   * Applies the stop events to the slider.
   */
  protected addStopEvents(): void {
    // Create an `AbortController` to remove these events after dragging is
    // complete. This controller is recreated every time this method is called
    // because it will be disabled after it's `abort` signal is sent.
    this.stopController = new AbortController();

    this.stopEventKeys.forEach((eventType) => {
      this.zodiac.getTrackElement().addEventListener(eventType, () => this.stop(), { signal: this.stopController.signal });
    });
  }

  /**
   * Retrieves the `screenX` value from an event depending on the event type.
   *
   * @param event - The event in which to derive the `screenX` value.
   *
   * @returns The `screenX` value of the event.
   */
  protected getScreenX(event: DragEvent): number {
    if (event instanceof TouchEvent) {
      return event.touches[0].screenX ?? 0;
    }

    return event.screenX;
  }

  /**
   * Snaps a drag position into a valid `Zodiac` position.
   *
   * The `Drag` component tracks the drag position with a pixel value to
   * animate dragging. This method snaps a drag position into valid `Zodiac`
   * position to set the active slide.
   *
   * @param dragPosition - The position in pixels.
   *
   * @returns The position as a numeric index.
   */
  protected getSnapPosition(dragPosition: number): number {
    let snapPosition = -Math.round(dragPosition / this.zodiac.getItemWidth());

    const itemTotal = this.zodiac.getItemTotal();

    // If the calculated position is greater than the total number of slider
    // items then restart at the beginning.
    if (snapPosition > itemTotal) {
      snapPosition = 0;
    }

    // If the calculated position is less than zero then move to the end of
    // the slider.
    if (snapPosition < 0) {
      snapPosition = itemTotal;
    }

    return snapPosition;
  }

  /**
   * Mark all links within the slider track as draggable or un-draggable.
   *
   * Depending on the value of `draggable`, links within the slider track will
   * be enabled or disabled by swapping between storing the link in an `href`
   * or `data-href` attribute and toggling the `draggable` attribute.
   *
   * @param draggable - Whether to mark the items as draggable or un-draggable.
   */
  protected modifyLinks(draggable: boolean): void {
    // Retrieve all links within the track element.
    const links = this.zodiac.getTrackElement().querySelectorAll('a');

    // Prevent unnecessary modification by checking if the draggable value
    // matches the prevent click state.
    if (this.preventClick === draggable) {
      links.forEach((link) => {
        // Determine the source and destination of the attribute modification
        // based on the whether draggability is being enabled or disabled.
        const source = draggable ? 'data-href' : 'href';
        const destination = draggable ? 'href' : 'data-href';

        // Add or remove the draggable attribute on the link element.
        link.draggable = draggable;

        link.setAttribute(destination, link.getAttribute(source));
        link.removeAttribute(source);
      });

      // Indicate click has or hasn't been prevented.
      this.preventClick = !this.preventClick;
    }
  }

  /**
   * Calculates & updates the position of the slider track on drag.
   *
   * During the move stage of the dragging, this method has the following side
   * effects:
   * - Calculates the dragging distance based on where the user clicked or
   *   touched.
   * - Determines how fast the slider should be dragged based on how close to
   *   the edge the mouse cursor is moved.
   * - Computes which slide to snap to after dragging is complete.
   * - Animates the slider track while dragging.
   *
   * @param event - The DOM event emitted during the drag movement.
   */
  protected move(event: DragEvent): void {
    this.zodiac.getEventBus().emit(['drag.move.before']);

    // Determine the distance between the position of current event dispatcher
    // the starting event dispatcher position.
    const currentEventPosition = this.getScreenX(event) - this.zodiac.getSliderElement().offsetLeft;
    const distance = currentEventPosition - this.startingEventPosition;

    // Exit this method if the distance is less than the drag threshold.
    if (Math.abs(distance) < this.threshold) {
      return;
    }

    // Increase the acceleration speed based on how far the user has dragged
    // the slider.
    const accelerate = Utilities.rangeMap(Math.abs(distance), this.threshold, window.innerWidth, 1, 3);
    // Determine by drag position by adding distance multiplied by the
    // acceleration speed.
    const dragPosition = this.dragPosition + (distance * accelerate);

    event.preventDefault();

    // Get the snap position from the current drag position.
    this.snapPosition = this.getSnapPosition(dragPosition);
    // Animate the dragging.
    this.zodiac.getTrackElement().style.transform = `translate3d(${dragPosition}px, 0, 0)`;

    this.zodiac.getEventBus().emit(['drag.move.after']);
  }

  /**
   * Adds the `dragging` class to the slider track while it is being dragged.
   */
  protected onDragEvents(): void {
    this.zodiac.getEventBus().on(['drag.before'], () => {
      this.zodiac.getTrackElement().classList.add(this.draggingClass);
    });

    this.zodiac.getEventBus().on(['drag.after'], () => {
      this.zodiac.getTrackElement().classList.remove(this.draggingClass);
    });
  }

  /**
   * Prevent link clicking when the slider is being dragged.
   */
  protected preventDefaultClickOnDragStart(): void {
    this.zodiac.getEventBus().on(['drag.move.before'], () => {
      this.modifyLinks(false);
    });

    this.zodiac.getEventBus().on(['drag.after'], () => {
      // Wait for the slider to finishing animating before enabling the links.
      setTimeout(() => {
        this.modifyLinks(true);
      }, this.options.transitionSpeed);
    });
  }

  /**
   * Prevents unnecessary dragging for slider items.
   */
  protected preventDefaultOnDragStart(): void {
    this.zodiac.getItems().forEach((item) => {
      item.addEventListener('dragstart', (event) => event.preventDefault());
    });
  }

  /**
   * Removes the move events from the slider to prevent unnecessary calculations.
   */
  protected removeMoveEvents(): void {
    this.moveController.abort();
  }

  /**
   * Removes the stop events from the slider to prevent unnecessary calculations.
   */
  protected removeStopEvents(): void {
    this.stopController.abort();
  }

  /**
   * Prepares the slider to be dragged when dragging has started.
   *
   * The slider is prepared by calculating the current drag position, relative
   * to the `Zodiac`'s current position, and the position of the event
   * dispatcher.
   *
   * @param event - The DOM event which fired this method.
   */
  protected start(event: DragEvent): void {
    this.zodiac.getEventBus().emit(['drag.before']);

    // Calculate the drag position by multiplying the slider's current position
    // by the width of a single slide. The value of this calculation is
    // converted to a negative number to animate the slider since it will
    // eventually be passed into `translate3d`.
    this.dragPosition = -Math.abs(this.zodiac.getPosition() * this.zodiac.getItemWidth());

    // Determine the position of the event dispatcher by subtracting the event
    // dispatcher's position on the screen by the slider's offset of it's
    // parent element.
    this.startingEventPosition = this.getScreenX(event) - this.zodiac.getSliderElement().offsetLeft;

    this.addMoveEvents();
    this.addStopEvents();
  }

  /**
   * Positions the slider after the dragging is complete.
   */
  protected stop(): void {
    this.zodiac.setPosition(this.snapPosition);
    this.zodiac.move(this.snapPosition);

    this.removeMoveEvents();
    this.removeStopEvents();

    this.zodiac.getEventBus().emit(['drag.after']);
  }

}
