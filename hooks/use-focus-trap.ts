import { useEffect, useRef, useCallback } from 'react';

/**
 * Focus Trap Hook
 *
 * Traps focus within a container element (for modals, dropdowns, etc.)
 * Restores focus to the previously focused element when deactivated.
 *
 * React 16.8+ compatible (replaces Radix Dialog focus management)
 *
 * @example
 * const Modal = ({ isOpen, children }) => {
 *   const containerRef = useFocusTrap(isOpen);
 *   return isOpen ? <div ref={containerRef}>{children}</div> : null;
 * };
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  isActive: boolean
): React.RefObject<T> {
  const containerRef = useRef<T>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback((container: HTMLElement) => {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(
      container.querySelectorAll<HTMLElement>(selector)
    ).filter(
      el =>
        !el.hasAttribute('disabled') &&
        el.tabIndex !== -1 &&
        el.offsetParent !== null // Visible elements only
    );
  }, []);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    // Save the currently focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Get all focusable elements
    const focusableElements = getFocusableElements(container);

    if (focusableElements.length === 0) {
      // If no focusable elements, focus the container itself
      if (container.tabIndex === -1) {
        container.tabIndex = 0;
      }
      container.focus();
      return;
    }

    // Focus the first element
    focusableElements[0]?.focus();

    // Handle Tab key to trap focus
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !containerRef.current) return;

      const focusableElements = getFocusableElements(containerRef.current);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (e.shiftKey) {
        // Shift + Tab: move focus backwards
        if (activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab: move focus forwards
        if (activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the previously focused element
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    };
  }, [isActive, getFocusableElements]);

  return containerRef;
}
