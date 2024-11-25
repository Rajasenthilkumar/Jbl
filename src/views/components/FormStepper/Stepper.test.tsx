import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StepperProvider, useStepper } from './StepperProvider';

describe('code snippet', () => {
  // StepperProvider initializes with the correct initialSteps value
  it('should initialize totalSteps with initialSteps value', () => {
    const initialSteps = 5;
    const { result } = renderHook(() => useStepper(), {
      wrapper: ({ children }) => (
        <StepperProvider initialSteps={initialSteps}>
          {children}
        </StepperProvider>
      ),
    });

    expect(result.current.totalSteps).toBe(initialSteps);
  });

  // nextStep does not increment activeStep when activeStep is equal to totalSteps - 1
  it('should not increment activeStep when activeStep is equal to totalSteps - 1', () => {
    const initialSteps = 3;
    const { result } = renderHook(() => useStepper(), {
      wrapper: ({ children }) => (
        <StepperProvider initialSteps={initialSteps}>
          {children}
        </StepperProvider>
      ),
    });

    act(() => {
      result.current.setActiveStep(2);
    });

    expect(result.current.activeStep).toBe(2);
  });
});
