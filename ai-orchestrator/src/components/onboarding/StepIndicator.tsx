'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ONBOARDING_STEPS } from '@/types/onboarding';

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
}

export function StepIndicator({ currentStep, completedSteps }: StepIndicatorProps) {
  return (
    <nav aria-label="Setup progress" className="flex items-center justify-center gap-0">
      {ONBOARDING_STEPS.map((step, idx) => {
        const isCompleted = completedSteps.includes(step.number);
        const isActive = step.number === currentStep;
        const isPending = !isCompleted && !isActive;

        return (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-base',
                  isCompleted && 'bg-primary-700 text-white',
                  isActive && 'bg-primary-700 text-white',
                  isPending && 'bg-white border-2 border-sand-200 text-sand-400'
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <span
                className={cn(
                  'text-sm font-medium whitespace-nowrap',
                  isCompleted && 'text-sand-800',
                  isActive && 'text-primary-700 font-semibold',
                  isPending && 'text-sand-400'
                )}
              >
                {step.title}
              </span>
            </div>
            {idx < ONBOARDING_STEPS.length - 1 && (
              <div
                className={cn(
                  'w-10 h-0.5 mx-1 mt-[-20px]',
                  completedSteps.includes(step.number) ? 'bg-primary-700' : 'bg-sand-200'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
