import { LogFn } from "./logger";

const getLabel = ({ label, name }: { label?: string; name?: string }) =>
  `${label || name || "<anonymous function>"}`;

/**
 * Logs the inputs of a given function.
 * Note: If the given function throws, the thrown exception will not be logged
 * and will propagate to the caller
 */
export const inputs =
  (log: LogFn) =>
  <T extends readonly unknown[], R>(fn: (...args: T) => R, label?: string) =>
  (...args: T) => {
    // eslint-disable-next-line fp/no-unused-expression
    log({ args }, `${getLabel({ label, name: fn.name })} called with`);

    return fn(...args);
  };

/**
 * Logs the outputs of a given function.
 * Note: If the given function throws, the thrown exception will not be logged
 * and will propagate to the caller
 */
export const outputs =
  (logFn: LogFn) =>
  <T extends readonly unknown[], R>(fn: (...args: T) => R, label?: string) => {
    const log = (result: R) =>
      logFn({ result }, `${getLabel({ label, name: fn.name })} returned`);

    return (...args: T) => {
      const result = fn(...args);

      if (result instanceof Promise) {
        return result.then((result) => {
          // eslint-disable-next-line fp/no-unused-expression
          log(result);
          return result;
        });
      } else {
        // eslint-disable-next-line fp/no-unused-expression
        log(result);
        return result;
      }
    };
  };

/**
 * Logs the inputs and outputs of a given function.
 * Note: If the given function throws, the thrown exception will not be logged
 * and will propagate to the caller
 */
export const track =
  (log: LogFn) =>
  <T extends readonly unknown[], R>(fn: (...args: T) => R, label?: string) => {
    const l = getLabel({ label, name: fn.name });
    return outputs(log)(inputs(log)(fn, l), l);
  };
