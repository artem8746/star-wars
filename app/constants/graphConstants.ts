import { Axis } from '../types/Axis';

// If the primary axis is 'x', the graph will be rendered from left to right.
// If the primary axis is 'y', the graph will be rendered from bottom to top.
// Therefore, if you want to change the direction of the graph, you can switch the primary and secondary axes.
export const primaryAxis: Axis = 'x';
export const secondaryAxis: Axis = 'y';
export const nodeWidth = 150;
export const nodeHeight = 40;
export const stepBetweenSecondary =
  50 +
  // @ts-ignore
  (secondaryAxis === 'x' ? nodeWidth : nodeHeight);
export const stepBetweenPrimary =
  100 +
  // @ts-ignore
  (primaryAxis === 'y' ? nodeHeight : nodeWidth);
