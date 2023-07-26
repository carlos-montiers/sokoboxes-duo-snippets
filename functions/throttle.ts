/*
 * Author: Carlos Montiers Aguilera
 * Project: Sokoboxes Duo
 */

/**
 * Throttles the execution of a function by delaying subsequent invocations.
 * @param fn The function to be throttled.
 * @param ms The delay in milliseconds between consecutive invocations.
 * @returns A throttled function.
 */
export const throttle = (fn: (...args: any[]) => any, ms: number) => {
  let executing = false;
  return function (this: any, ...args: any[]) {
    if (executing) {
      return;
    }
    executing = true;
    fn.apply(this, args);
    setTimeout(() => {
      executing = false;
    }, ms);
  };
};
