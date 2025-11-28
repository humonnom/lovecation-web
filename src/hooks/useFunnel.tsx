import { ReactElement, ReactNode, useState } from 'react';

export interface StepProps<T extends readonly string[]> {
  name: T[number];
  children: ReactNode;
}

export interface FunnelProps<T extends readonly string[]> {
  children: Array<ReactElement<StepProps<T>>>;
}

export function useFunnel<T extends readonly string[]>(steps: T, initialStep?: T[number]) {
  const [currentStep, setCurrentStep] = useState<T[number]>(initialStep ?? steps[0]);

  const Step = ({ name, children }: StepProps<T>) => {
    return <>{currentStep === name ? children : null}</>;
  };

  const Funnel = ({ children }: FunnelProps<T>) => {
    const targetStep = children.find((child) => child.props.name === currentStep);
    return <>{targetStep}</>;
  };

  return {
    Funnel,
    Step,
    currentStep,
    setStep: setCurrentStep,
  } as const;
}
