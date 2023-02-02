import React, { createContext, useContext, useRef, useState } from 'react';
import { CustomWizardHookType, IContext, Wizard } from './types';
import { Stack } from './dataStructures/Stack';

export const Context = createContext<IContext | undefined>(undefined);

export function createReactCrispyWizard<T extends string>(): [
  Wizard<T>,
  CustomWizardHookType<T>,
] {
  const useWizardContext = () => useContext(Context) as IContext<T>;

  // Provider
  const InternalWizardProvider: Wizard<T> = props => {
    const histRef = useRef(new Stack<T>());
    const historyStack = histRef.current;
    const [activeStep, setActiveStep] = useState(props.defaultStep);
    return (
      <Context.Provider value={{ activeStep, goBackStep, goToStep }}>
        {props.children}
      </Context.Provider>
    );

    function goBackStep(step?: T) {
      if (!step) {
        historyStack.pop();
        return setActiveStep(historyStack.peek() || props.defaultStep);
      }

      const reversedStack = historyStack.toArray()?.reverse();
      let popCounter = 1;
      for (const stepCheck of reversedStack) {
        popCounter++;

        if (stepCheck === step) {
          for (let i = 0; i < popCounter; i++) {
            historyStack.pop();
          }
          return setActiveStep(historyStack.peek() || props.defaultStep);
        }
      }
    }

    function goToStep(step: T) {
      const stackList = historyStack.toArray();
      const existingStackStep = stackList.find(a => a === step);
      if (existingStackStep) {
        throw new Error(
          "Can't use goToStep to traverse steps backwards, please use goBackStep",
        );
      }

      historyStack.push(step);
      setActiveStep(step || props.defaultStep);
    }
  };

  // StepWrapper
  InternalWizardProvider.Step = props => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const context = useWizardContext();
    return context?.activeStep === props.name ? (
      (props.children as JSX.Element)
    ) : (
      <></>
    );
  };

  return [InternalWizardProvider, useWizardContext];
}
