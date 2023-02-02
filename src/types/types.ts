import { PropsWithChildren } from 'react';

interface WizardProps<T extends string> {
  screenByName: Record<T, JSX.Element>;
  defaultStep: T;
}

type StepWrapperComponent<T extends string> = (
  props: React.PropsWithChildren<{
    name: T;
  }>,
) => JSX.Element;

type RootWizardComponent<T extends string> = (
  props: PropsWithChildren<WizardProps<T>>,
) => JSX.Element;

interface StepWrapperSubProperty<T extends string> {
  Step: StepWrapperComponent<T>;
}

export type ComponentByStep<T extends string> = Record<T, JSX.Element>;
export interface IContext<T extends string = string> {
  activeStep?: T;
  goToStep(step: T): void;
  goBackStep(): void;
}

export type Wizard<T extends string> = RootWizardComponent<T> &
  StepWrapperSubProperty<T>;

export type CustomWizardHookType<T extends string> = () => IContext<T>;