'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiSelect?: boolean;
  placeholder?: string;
  fieldColor?: 'white' | 'grey';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: string;
  className?: string;
}

const sizeClasses: Record<NonNullable<DropdownProps['size']>, string> = {
  sm: 'h-8 px-2 text-sm',
  md: 'h-9 px-3 text-base',
  lg: 'h-10 px-4 text-base',
};

export function Dropdown({
  options,
  value,
  onChange,
  multiSelect = false,
  placeholder = 'Select...',
  fieldColor = 'white',
  size = 'md',
  disabled = false,
  error,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedValues = multiSelect
    ? (Array.isArray(value) ? value : [])
    : (typeof value === 'string' ? [value] : []);

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (multiSelect) {
        const current = Array.isArray(value) ? value : [];
        const next = current.includes(optionValue)
          ? current.filter((v) => v !== optionValue)
          : [...current, optionValue];
        onChange?.(next);
      } else {
        onChange?.(optionValue);
        setIsOpen(false);
      }
    },
    [multiSelect, value, onChange]
  );

  const handleRemoveTag = useCallback(
    (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (multiSelect && Array.isArray(value)) {
        onChange?.(value.filter((v) => v !== optionValue));
      }
    },
    [multiSelect, value, onChange]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayLabel = multiSelect
    ? null
    : options.find((o) => o.value === value)?.label;

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          'w-full flex items-center gap-2 rounded-sm border font-normal transition-colors duration-150',
          'focus:outline-none focus:border-primary-700 focus:shadow-focused',
          'hover:border-sand-300',
          sizeClasses[size],
          fieldColor === 'grey' ? 'bg-sand-50' : 'bg-white',
          error ? 'border-red-700' : 'border-sand-200',
          disabled && 'bg-sand-50 text-sand-400 cursor-not-allowed hover:border-sand-200'
        )}
      >
        <div className="flex-1 flex items-center gap-1 overflow-hidden text-left min-w-0">
          {multiSelect && selectedValues.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedValues.map((v) => {
                const opt = options.find((o) => o.value === v);
                return (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1 bg-sand-100 text-sand-700 text-sm px-1.5 py-0.5 rounded-sm"
                  >
                    {opt?.label || v}
                    <X
                      className="w-3 h-3 cursor-pointer hover:opacity-70"
                      onClick={(e) => handleRemoveTag(v, e)}
                    />
                  </span>
                );
              })}
            </div>
          ) : displayLabel ? (
            <span className="text-sand-800 truncate">{displayLabel}</span>
          ) : (
            <span className="text-sand-400 truncate">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-sand-400 shrink-0 transition-transform duration-150',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {error && (
        <p className="text-sm text-red-700 mt-1" role="alert">
          {error}
        </p>
      )}

      {isOpen && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 w-full bg-white border border-sand-200 rounded-md shadow-lg max-h-[240px] overflow-y-auto"
        >
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                onClick={() => !option.disabled && handleSelect(option.value)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors',
                  'hover:bg-sand-50',
                  isSelected && 'bg-primary-50',
                  option.disabled && 'text-sand-300 cursor-not-allowed hover:bg-transparent'
                )}
              >
                {multiSelect && (
                  <div
                    className={cn(
                      'w-4 h-4 rounded-sm border flex items-center justify-center shrink-0',
                      isSelected
                        ? 'bg-primary-700 border-primary-700'
                        : 'border-sand-200'
                    )}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                )}
                <span className="flex-1 truncate">{option.label}</span>
                {!multiSelect && isSelected && (
                  <Check className="w-4 h-4 text-primary-700 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
