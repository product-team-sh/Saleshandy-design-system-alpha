/**
 * Keyboard utility constants and helpers
 *
 * Provides consistent key names and utilities for keyboard event handling.
 */

/**
 * Standard keyboard key constants
 */
export const Keys = {
  Enter: 'Enter',
  Space: ' ',
  Escape: 'Escape',
  Tab: 'Tab',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Home: 'Home',
  End: 'End',
  PageUp: 'PageUp',
  PageDown: 'PageDown',
  Backspace: 'Backspace',
  Delete: 'Delete',
} as const;

/**
 * Check if a keyboard event matches a specific key
 *
 * @example
 * onKeyDown={(e) => {
 *   if (isKey(e, Keys.Enter)) {
 *     handleSubmit();
 *   }
 * }}
 */
export function isKey(
  event: React.KeyboardEvent | KeyboardEvent,
  key: string
): boolean {
  return event.key === key;
}

/**
 * Check if a keyboard event matches any of the provided keys
 *
 * @example
 * onKeyDown={(e) => {
 *   if (isAnyKey(e, [Keys.Enter, Keys.Space])) {
 *     handleActivate();
 *   }
 * }}
 */
export function isAnyKey(
  event: React.KeyboardEvent | KeyboardEvent,
  keys: string[]
): boolean {
  return keys.includes(event.key);
}

/**
 * Check if Enter or Space key was pressed (standard activation keys)
 *
 * @example
 * onKeyDown={(e) => {
 *   if (isActivationKey(e)) {
 *     handleClick();
 *   }
 * }}
 */
export function isActivationKey(
  event: React.KeyboardEvent | KeyboardEvent
): boolean {
  return isAnyKey(event, [Keys.Enter, Keys.Space]);
}

/**
 * Check if an arrow key was pressed
 */
export function isArrowKey(
  event: React.KeyboardEvent | KeyboardEvent
): boolean {
  return isAnyKey(event, [
    Keys.ArrowUp,
    Keys.ArrowDown,
    Keys.ArrowLeft,
    Keys.ArrowRight,
  ]);
}

/**
 * Check if a navigation key was pressed (arrows, home, end, page up/down)
 */
export function isNavigationKey(
  event: React.KeyboardEvent | KeyboardEvent
): boolean {
  return isAnyKey(event, [
    Keys.ArrowUp,
    Keys.ArrowDown,
    Keys.ArrowLeft,
    Keys.ArrowRight,
    Keys.Home,
    Keys.End,
    Keys.PageUp,
    Keys.PageDown,
  ]);
}

/**
 * Prevent default behavior for specific keys
 *
 * @example
 * onKeyDown={(e) => {
 *   preventDefaultForKeys(e, [Keys.ArrowUp, Keys.ArrowDown]);
 *   // Handle arrow navigation without scrolling the page
 * }}
 */
export function preventDefaultForKeys(
  event: React.KeyboardEvent | KeyboardEvent,
  keys: string[]
): void {
  if (isAnyKey(event, keys)) {
    event.preventDefault();
  }
}

/**
 * Stop propagation for specific keys
 *
 * @example
 * onKeyDown={(e) => {
 *   stopPropagationForKeys(e, [Keys.Escape]);
 *   // Prevent Escape from bubbling to parent components
 * }}
 */
export function stopPropagationForKeys(
  event: React.KeyboardEvent | KeyboardEvent,
  keys: string[]
): void {
  if (isAnyKey(event, keys)) {
    event.stopPropagation();
  }
}

/**
 * Create a keyboard event handler that maps keys to actions
 *
 * @example
 * const handleKeyDown = createKeyHandler({
 *   [Keys.Enter]: handleSubmit,
 *   [Keys.Escape]: handleCancel,
 *   [Keys.ArrowDown]: handleNext,
 *   [Keys.ArrowUp]: handlePrevious,
 * });
 */
export function createKeyHandler(
  keyMap: Record<string, (event: React.KeyboardEvent | KeyboardEvent) => void>
): (event: React.KeyboardEvent | KeyboardEvent) => void {
  return (event) => {
    const handler = keyMap[event.key];
    if (handler) {
      handler(event);
    }
  };
}
