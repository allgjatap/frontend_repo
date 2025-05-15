import { PropsWithChildren, useContext } from 'react';
import { ViewSwitchContext } from './ViewSwitch';

export type ViewProps = { value: string } & PropsWithChildren;

export const View = ({ value, children }: ViewProps) => {
  const { selectedView } = useContext(ViewSwitchContext);

  if (value !== selectedView) return <></>;

  return children;
};
