/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

export interface IfComponentProps {
  /**
   * The component internally does a double exclamation point assertion (`!!condition`).
   * If you would like to customize the behavior, it is recommended to pass a boolean instead.
   */
  // In this use case, any makes sense because we want to verify the truthfulness of the value.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  condition: any;
  el?: React.ReactElement;
}

export const If: React.FC<IfComponentProps> = ({ condition, children, el }) =>
  !!condition && children ? <>{children}</> : el ?? null;

export interface ForComponentProps<T = unknown> {
  items: Array<T>;
  render?: (item: T, index: number, array: Array<T>) => React.ReactNode | null;
}
export const For: React.FC<ForComponentProps> = ({
  items,
  children,
  render,
}) => <>{render ? items.map(render) : items.map(() => <>{children}</>)}</>;
