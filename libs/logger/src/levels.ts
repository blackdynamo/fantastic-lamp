const values = {
  fatal: 60,
  error: 50,
  warn: 40,
  info: 30,
  debug: 20,
  trace: 10,
} as const;

export type Level = keyof typeof values;

export const levels = {
  labels: Object.fromEntries(
    Object.entries(values).map(([key, value]) => [value, key])
  ),
  values,
};
