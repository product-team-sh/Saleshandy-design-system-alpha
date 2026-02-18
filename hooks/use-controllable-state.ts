import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Controllable State Hook
 *
 * Implements the controlled/uncontrolled pattern for form components.
 * Allows components to work in both controlled and uncontrolled modes.
 *
 * React 16.8+ compatible (replaces Radix controlled/uncontrolled utilities)
 *
 * @example
 * // Uncontrolled usage
 * <Toggle defaultValue={false} onChange={console.log} />
 *
 * @example
 * // Controlled usage
 * const [value, setValue] = useState(false);
 * <Toggle value={value} onChange={setValue} />
 *
 * @example
 * // Component implementation
 * function Toggle({ value, defaultValue = false, onChange }) {
 *   const [state, setState] = useControllableState({
 *     value,
 *     defaultValue,
 *     onChange,
 *   });
 *
 *   return <button onClick={() => setState(!state)}>{state ? 'On' : 'Off'}</button>;
 * }
 */
export function useControllableState<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: {
  /**
   * Controlled value (if provided, component is controlled)
   */
  value?: T;

  /**
   * Default value for uncontrolled mode
   */
  defaultValue: T;

  /**
   * Callback when value changes
   */
  onChange?: (value: T) => void;
}): [T, (value: T | ((prev: T) => T)) => void] {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const wasControlled = useRef(isControlled);

  // Warn if component switches between controlled/uncontrolled
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (wasControlled.current !== isControlled) {
        console.warn(
          'Component is changing from ' +
            (wasControlled.current ? 'controlled' : 'uncontrolled') +
            ' to ' +
            (isControlled ? 'controlled' : 'uncontrolled') +
            '. ' +
            'This is likely a bug. Decide between using a controlled or uncontrolled component for the lifetime of the component.'
        );
      }
    }
    wasControlled.current = isControlled;
  }, [isControlled]);

  // Use controlled value if provided, otherwise use internal value
  const value = isControlled ? (controlledValue as T) : internalValue;

  const setValue = useCallback(
    (nextValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof nextValue === 'function'
          ? (nextValue as (prev: T) => T)(value)
          : nextValue;

      // Update internal value if uncontrolled
      if (!isControlled) {
        setInternalValue(resolvedValue);
      }

      // Always trigger onChange (whether controlled or uncontrolled)
      onChange?.(resolvedValue);
    },
    [isControlled, value, onChange]
  );

  return [value, setValue];
}

/**
 * Simpler version for boolean states (common for toggles, checkboxes, etc.)
 *
 * @example
 * function Checkbox({ checked, defaultChecked = false, onCheckedChange }) {
 *   const [isChecked, setChecked] = useControllableBooleanState({
 *     value: checked,
 *     defaultValue: defaultChecked,
 *     onChange: onCheckedChange,
 *   });
 *
 *   return (
 *     <input
 *       type="checkbox"
 *       checked={isChecked}
 *       onChange={(e) => setChecked(e.target.checked)}
 *     />
 *   );
 * }
 */
export function useControllableBooleanState({
  value,
  defaultValue = false,
  onChange,
}: {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return useControllableState<boolean>({
    value,
    defaultValue,
    onChange,
  });
}

/**
 * Version for open/closed state (modals, dropdowns, etc.)
 *
 * @example
 * function Modal({ open, defaultOpen = false, onOpenChange }) {
 *   const [isOpen, setOpen] = useControllableOpenState({
 *     value: open,
 *     defaultValue: defaultOpen,
 *     onChange: onOpenChange,
 *   });
 *
 *   return isOpen ? (
 *     <div>
 *       <button onClick={() => setOpen(false)}>Close</button>
 *       Modal content
 *     </div>
 *   ) : null;
 * }
 */
export function useControllableOpenState({
  value,
  defaultValue = false,
  onChange,
}: {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return useControllableState<boolean>({
    value,
    defaultValue,
    onChange,
  });
}
