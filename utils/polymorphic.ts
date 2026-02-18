import React from 'react';

/**
 * Polymorphic Component Types
 *
 * Allows components to accept an "as" prop to render as different HTML elements
 * while maintaining full type safety for the target element's props.
 *
 * @example
 * <Button as="a" href="/dashboard">Go to Dashboard</Button>
 * // Renders as <a> with full anchor props (href, target, etc.)
 *
 * @example
 * <Button as="div" onClick={handler}>Not a button</Button>
 * // Renders as <div> with div props
 */

type AsProp<C extends React.ElementType> = {
  /**
   * The element or component to render as
   */
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

/**
 * Polymorphic component props that merge:
 * - The "as" prop
 * - The component's own props
 * - The target element's native props
 */
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

/**
 * Polymorphic component with ref support
 */
export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };

/**
 * Polymorphic ref type
 */
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

/**
 * Example usage in a component:
 *
 * type ButtonOwnProps = {
 *   variant?: 'primary' | 'secondary';
 *   size?: 'sm' | 'md' | 'lg';
 * };
 *
 * type ButtonProps<C extends React.ElementType = 'button'> =
 *   PolymorphicComponentPropsWithRef<C, ButtonOwnProps>;
 *
 * export const Button = forwardRef(
 *   <C extends React.ElementType = 'button'>(
 *     { as, variant = 'primary', size = 'md', children, ...props }: ButtonProps<C>,
 *     ref?: PolymorphicRef<C>
 *   ) => {
 *     const Component = as || 'button';
 *     return (
 *       <Component ref={ref} className={cn(buttonVariants({ variant, size }))} {...props}>
 *         {children}
 *       </Component>
 *     );
 *   }
 * );
 */
