import type React from 'react';
import { type ReactNode, createContext, useContext, useState } from 'react';

// Define the types for the context
interface StepperContextType {
  totalSteps: number;
  setTotalSteps: (steps: number) => void;
  activeStep: number;
  setActiveStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

// Create default context to avoid undefined issues
const StepperContext = createContext<StepperContextType | undefined>(undefined);

// Define the provider props
interface StepperProviderProps {
  children: ReactNode;
  initialSteps: number;
}

// Stepper Provider Component
export const StepperProvider: React.FC<StepperProviderProps> = ({
  children,
  initialSteps,
}) => {
  const [totalSteps, _setTotalSteps] = useState<number>(initialSteps);
  const [activeStep, setActiveStep] = useState<number>(0);

  const nextStep = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const setTotalSteps = (step: number) => {
    _setTotalSteps(step);
    setActiveStep(0);
  };

  return (
    <StepperContext.Provider
      value={{
        totalSteps,
        setTotalSteps,
        activeStep,
        setActiveStep,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

// Hook for using the context
export const useStepper = (): StepperContextType => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a StepperProvider');
  }
  return context;
};
