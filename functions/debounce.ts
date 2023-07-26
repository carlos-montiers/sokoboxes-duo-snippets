/*
 * Author: Carlos Montiers Aguilera
 * Project: Sokoboxes Duo
 */

/**
 * Executes a function after a specified delay, canceling any previous pending invocation.
 * @param fn The function to be debounced.
 * @param ms The delay in milliseconds before the debounced function is executed.
 * @returns A debounced function.
 */
export const debounce = (fn: (...args: any[]) => any, ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let executing = false;
  return function (this: any, ...args: any[]) {
    if (executing) {
      return;
    }
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      executing = true;
      fn.apply(this, args);
      timeoutId = null;
      executing = false;
    }, ms);
  };
};
