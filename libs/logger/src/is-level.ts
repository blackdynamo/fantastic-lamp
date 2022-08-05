import { Level, levels } from "./levels";

const logLevels = Object.keys(levels.values);

export const DEFAULT_IS_LEVEL_PARAMS = {
  message: `Must be one of ${logLevels.join(", ")}`,
} as const;

export const isLevel = (s: string): s is Level => logLevels.includes(s);
