import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 *
 * Combines clsx (for conditional classes) and tailwind-merge (for deduplication).
 * This is the shadcn/ui pattern for className merging.
 *
 * @example
 * cn('px-4 py-2', 'bg-blue-500', { 'text-white': isActive })
 * // => 'px-4 py-2 bg-blue-500 text-white' (if isActive is true)
 *
 * @example
 * // Resolves conflicting Tailwind classes (last one wins)
 * cn('px-2 px-4') // => 'px-4'
 * cn('text-red-500', 'text-blue-500') // => 'text-blue-500'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
