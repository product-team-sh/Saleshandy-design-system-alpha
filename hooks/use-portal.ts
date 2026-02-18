import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Portal Hook
 *
 * Renders children into a portal container (for modals, tooltips, dropdowns, toasts).
 * React 16.8+ compatible (replaces Radix Portal)
 *
 * @example
 * const Tooltip = ({ children, content }) => {
 *   const { Portal } = usePortal('tooltip-root');
 *   const [isOpen, setOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <button onMouseEnter={() => setOpen(true)}>
 *         {children}
 *       </button>
 *       {isOpen && <Portal>{content}</Portal>}
 *     </>
 *   );
 * };
 */
export function usePortal(containerId: string = 'portal-root') {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Try to find existing container
    let el = document.getElementById(containerId);

    // Create container if it doesn't exist
    if (!el) {
      el = document.createElement('div');
      el.id = containerId;
      document.body.appendChild(el);
    }

    setContainer(el);

    // Cleanup is not needed - we want the portal container to persist
    // across component mounts/unmounts
  }, [containerId]);

  const Portal = container
    ? ({ children }: { children: React.ReactNode }) =>
        createPortal(children, container)
    : ({ children }: { children: React.ReactNode }) => null;

  return { container, Portal };
}

/**
 * Simpler portal that always renders to document.body
 *
 * @example
 * const Modal = ({ isOpen, children }) => {
 *   const Portal = useBodyPortal();
 *   return isOpen ? <Portal>{children}</Portal> : null;
 * };
 */
export function useBodyPortal() {
  const Portal = ({ children }: { children: React.ReactNode }) =>
    createPortal(children, document.body);

  return Portal;
}

/**
 * Portal with z-index management for stacking contexts
 *
 * Useful when you need multiple portals that stack (modal over dropdown, etc.)
 *
 * @example
 * const Modal = ({ children }) => {
 *   const { Portal, zIndex } = useStackedPortal('modal');
 *   return (
 *     <Portal>
 *       <div style={{ zIndex }}>{children}</div>
 *     </Portal>
 *   );
 * };
 */
export function useStackedPortal(
  type: 'dropdown' | 'modal' | 'popover' | 'tooltip' | 'sticky' = 'modal'
) {
  const zIndexMap = {
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    tooltip: 1400,
  };

  const zIndex = zIndexMap[type];
  const { Portal, container } = usePortal(`${type}-portal`);

  return { Portal, container, zIndex };
}

/**
 * Hook to check if component is rendered in a portal
 *
 * @example
 * const isInPortal = useIsInPortal();
 * // true if component is inside a portal, false otherwise
 */
export function useIsInPortal(): boolean {
  const [isInPortal, setIsInPortal] = useState(false);

  useEffect(() => {
    // Check if any ancestor has a portal-related ID
    let node: HTMLElement | null = document.activeElement as HTMLElement;
    while (node && node !== document.body) {
      if (
        node.id.includes('portal') ||
        node.id.includes('tooltip') ||
        node.id.includes('modal') ||
        node.id.includes('dropdown')
      ) {
        setIsInPortal(true);
        return;
      }
      node = node.parentElement;
    }
    setIsInPortal(false);
  }, []);

  return isInPortal;
}
