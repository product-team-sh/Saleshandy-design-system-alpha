import { useState, useCallback, useRef, useEffect } from 'react';

export interface KeyboardNavOptions {
  /**
   * Orientation of the navigation (vertical = ArrowUp/Down, horizontal = ArrowLeft/Right)
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * Whether navigation should loop (wrap around at edges)
   * @default true
   */
  loop?: boolean;

  /**
   * Callback when an item is selected (Enter or Space)
   */
  onSelect?: (index: number) => void;

  /**
   * Callback when the active index changes
   */
  onChange?: (index: number) => void;

  /**
   * Whether to automatically focus items on navigation
   * @default false
   */
  autoFocus?: boolean;
}

/**
 * Keyboard Navigation Hook
 *
 * Provides arrow key navigation for lists (dropdowns, radio groups, tabs, etc.)
 * React 16.8+ compatible (replaces Radix Listbox keyboard behavior)
 *
 * @example
 * const Dropdown = ({ items }) => {
 *   const { activeIndex, handleKeyDown, setActiveIndex } = useKeyboardNav(
 *     items.length,
 *     { onSelect: (index) => selectItem(items[index]) }
 *   );
 *
 *   return (
 *     <div onKeyDown={handleKeyDown}>
 *       {items.map((item, index) => (
 *         <div
 *           key={index}
 *           data-active={index === activeIndex}
 *           onMouseEnter={() => setActiveIndex(index)}
 *         >
 *           {item}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * };
 */
export function useKeyboardNav(
  itemCount: number,
  options: KeyboardNavOptions = {}
) {
  const {
    orientation = 'vertical',
    loop = true,
    onSelect,
    onChange,
    autoFocus = false,
  } = options;

  const [activeIndex, setActiveIndexState] = useState(-1);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Wrapper for setActiveIndex that triggers onChange
  const setActiveIndex = useCallback(
    (index: number | ((prev: number) => number)) => {
      setActiveIndexState((prev) => {
        const newIndex = typeof index === 'function' ? index(prev) : index;
        if (newIndex !== prev) {
          onChange?.(newIndex);

          // Auto-focus the item if enabled
          if (autoFocus && itemRefs.current[newIndex]) {
            itemRefs.current[newIndex]?.focus();
          }
        }
        return newIndex;
      });
    },
    [onChange, autoFocus]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
      const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';

      switch (e.key) {
        case nextKey: {
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev + 1;
            if (next >= itemCount) {
              return loop ? 0 : prev;
            }
            return next;
          });
          break;
        }

        case prevKey: {
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev - 1;
            if (next < 0) {
              return loop ? itemCount - 1 : prev;
            }
            return next;
          });
          break;
        }

        case 'Home': {
          e.preventDefault();
          setActiveIndex(0);
          break;
        }

        case 'End': {
          e.preventDefault();
          setActiveIndex(itemCount - 1);
          break;
        }

        case 'Enter':
        case ' ': {
          if (activeIndex >= 0 && activeIndex < itemCount) {
            e.preventDefault();
            onSelect?.(activeIndex);
          }
          break;
        }

        default:
          // No action for other keys
          break;
      }
    },
    [itemCount, orientation, loop, activeIndex, onSelect, setActiveIndex]
  );

  // Reset active index when item count changes
  useEffect(() => {
    if (activeIndex >= itemCount) {
      setActiveIndex(-1);
    }
  }, [itemCount, activeIndex, setActiveIndex]);

  return {
    /**
     * Current active index (for highlighting)
     */
    activeIndex,

    /**
     * Set the active index manually (e.g., on mouse hover)
     */
    setActiveIndex,

    /**
     * Keyboard event handler - attach to the container element
     */
    handleKeyDown,

    /**
     * Ref to store item elements for auto-focus
     * Usage: ref={(el) => (itemRefs.current[index] = el)}
     */
    itemRefs,
  };
}

/**
 * Simplified keyboard navigation for roving tabindex pattern
 *
 * @example
 * const RadioGroup = ({ options }) => {
 *   const { activeIndex, handleKeyDown } = useRovingTabIndex(options.length);
 *
 *   return (
 *     <div role="radiogroup" onKeyDown={handleKeyDown}>
 *       {options.map((option, index) => (
 *         <button
 *           role="radio"
 *           tabIndex={activeIndex === index ? 0 : -1}
 *           aria-checked={activeIndex === index}
 *         >
 *           {option}
 *         </button>
 *       ))}
 *     </div>
 *   );
 * };
 */
export function useRovingTabIndex(
  itemCount: number,
  options?: Omit<KeyboardNavOptions, 'autoFocus'>
) {
  return useKeyboardNav(itemCount, { ...options, autoFocus: true });
}
