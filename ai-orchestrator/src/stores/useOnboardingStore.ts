import { create } from 'zustand';
import type { OnboardingData } from '@/types/onboarding';
import { DEFAULT_ONBOARDING_DATA } from '@/types/onboarding';

interface OnboardingState {
  currentStep: number;
  data: OnboardingData;
  completedSteps: number[];
  errors: Record<string, string>;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (partial: Partial<OnboardingData>) => void;
  setErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
  markStepCompleted: (step: number) => void;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  currentStep: 1,
  data: DEFAULT_ONBOARDING_DATA,
  completedSteps: [],
  errors: {},

  setStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 6) {
      set((state) => ({
        currentStep: currentStep + 1,
        completedSteps: state.completedSteps.includes(currentStep)
          ? state.completedSteps
          : [...state.completedSteps, currentStep],
        errors: {},
      }));
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1, errors: {} });
    }
  },

  updateData: (partial) =>
    set((state) => ({ data: { ...state.data, ...partial } })),

  setErrors: (errors) => set({ errors }),
  clearErrors: () => set({ errors: {} }),

  markStepCompleted: (step) =>
    set((state) => ({
      completedSteps: state.completedSteps.includes(step)
        ? state.completedSteps
        : [...state.completedSteps, step],
    })),
}));
