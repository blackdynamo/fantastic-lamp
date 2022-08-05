import pino, { LoggerOptions } from "pino";

import { Level } from "./levels";

export interface LogFn {
  <T extends object>(obj: T, msg?: string, ...args: unknown[]): void;
  (obj: unknown, msg?: string, ...args: unknown[]): void;
  (msg: string, ...args: unknown[]): void;
}

export type Logger = Record<Level, LogFn>;

export const createLogger = <Options extends LoggerOptions & { level: Level }>(
  options?: Options
): Logger =>
  pino({
    ...options,
    formatters: {
      ...options?.formatters,
      // Defaulting the level to label instead of number. Pino by default sets the level to number
      level: options?.formatters?.level ?? ((label) => ({ level: label })),
    },
  });
