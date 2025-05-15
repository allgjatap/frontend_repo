import React, { PropsWithChildren, createContext, useEffect } from 'react';
import { View } from './View';

export type ViewSwitchProps = {
  selectedView: string;
} & PropsWithChildren;

const reactNodeIsOfType = (node: any, type: any) => typeof node === 'object' && node !== null && node.type === type;

export const ViewSwitchContext = createContext<{ selectedView: string }>({ selectedView: 'default' });

export const ViewSwitch = (props: ViewSwitchProps) => {
  useEffect(() => {
    let error = false;

    React.Children.forEach(props.children, (child) => {
      if (!reactNodeIsOfType(child, View)) {
        error = true;
      }
    });

    if (error) {
      throw new Error('ViewSwitch must contain only View components');
    }
  }, []);

  return (
    <ViewSwitchContext.Provider value={{ selectedView: props.selectedView }}>
      {props.children}
    </ViewSwitchContext.Provider>
  );
};
