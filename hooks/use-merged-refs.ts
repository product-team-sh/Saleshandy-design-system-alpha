import { useCallback } from 'react';

/**
 * Merged Refs Hook
 *
 * Combines multiple refs into a single ref callback.
 * Useful when a component needs to forward a ref AND use a ref internally.
 *
 * React 16.8+ compatible (replaces Radix ref composition utilities)
 *
 * @example
 * const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
 *   const internalRef = useRef<HTMLButtonElement>(null);
 *   const mergedRef = useMergedRefs(forwardedRef, internalRef);
 *
 *   useEffect(() => {
 *     // Can use internalRef here
 *     internalRef.current?.focus();
 *   }, []);
 *
 *   return <button ref={mergedRef} {...props} />;
 * });
 */
export function useMergedRefs<T = any>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return useCallback(
    (value: T) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T | null>).current = value;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}

/**
 * Utility to set a ref's value imperatively
 *
 * @example
 * setRef(myRef, element);
 */
export function setRef<T>(
  ref: React.Ref<T> | undefined,
  value: T
): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

/**
 * Check if a ref has been assigned a value
 *
 * @example
 * if (hasRef(myRef)) {
 *   // myRef.current is not null
 *   myRef.current.focus();
 * }
 */
export function hasRef<T>(
  ref: React.RefObject<T> | undefined
): ref is React.RefObject<T> {
  return ref != null && ref.current != null;
}
