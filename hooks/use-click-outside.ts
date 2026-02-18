import { useEffect, useRef } from 'react';

/**
 * Click Outside Hook
 *
 * Detects clicks outside a ref'd element and triggers a callback.
 * Useful for closing dropdowns, modals, popovers, etc.
 *
 * React 16.8+ compatible (replaces Radix Popover dismiss behavior)
 *
 * @example
 * const Dropdown = ({ onClose }) => {
 *   const dropdownRef = useClickOutside<HTMLDivElement>(onClose, true);
 *   return <div ref={dropdownRef}>Dropdown content</div>;
 * };
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  isActive: boolean = true,
  excludeRefs?: React.RefObject<HTMLElement>[]
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isActive) return;

    function handleClick(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;

      // Ignore if clicking on the ref'd element or its children
      if (ref.current && ref.current.contains(target)) {
        return;
      }

      // Ignore if clicking on any excluded elements
      if (excludeRefs) {
        for (const excludeRef of excludeRefs) {
          if (excludeRef.current && excludeRef.current.contains(target)) {
            return;
          }
        }
      }

      // Trigger the handler
      handler(event);
    }

    // Use mousedown/touchstart instead of click for better UX
    // (triggers before focus change)
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [handler, isActive, excludeRefs]);

  return ref;
}

/**
 * Variant that accepts multiple refs to monitor
 *
 * @example
 * const [buttonRef, dropdownRef] = useMultipleClickOutside<[HTMLButtonElement, HTMLDivElement]>(
 *   handleClose,
 *   true
 * );
 */
export function useMultipleClickOutside<
  T extends HTMLElement[] = HTMLElement[]
>(
  handler: (event: MouseEvent | TouchEvent) => void,
  isActive: boolean = true,
  count: number = 2
): React.RefObject<T[number]>[] {
  const refs = useRef<React.RefObject<T[number]>[]>(
    Array.from({ length: count }, () => ({ current: null }))
  ).current;

  useEffect(() => {
    if (!isActive) return;

    function handleClick(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;

      // Check if click is inside any of the refs
      for (const ref of refs) {
        if (ref.current && ref.current.contains(target)) {
          return;
        }
      }

      // Click is outside all refs, trigger handler
      handler(event);
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [handler, isActive, refs]);

  return refs;
}
