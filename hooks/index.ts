/**
 * Custom Hooks for React 16.8+ Compatibility
 *
 * These hooks replace Radix UI primitives for components
 * that need to work with React 16.8+
 */

export { useFocusTrap } from './use-focus-trap';
export { useClickOutside, useMultipleClickOutside } from './use-click-outside';
export {
  useKeyboardNav,
  useRovingTabIndex,
  type KeyboardNavOptions,
} from './use-keyboard-nav';
export {
  useControllableState,
  useControllableBooleanState,
  useControllableOpenState,
} from './use-controllable-state';
export { useMergedRefs, setRef, hasRef } from './use-merged-refs';
export {
  usePortal,
  useBodyPortal,
  useStackedPortal,
  useIsInPortal,
} from './use-portal';
