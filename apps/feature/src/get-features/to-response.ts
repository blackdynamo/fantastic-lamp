import { FeatureResult } from "@growthbook/growthbook";

export const toResponse = (results: Record<string, FeatureResult>) =>
  Object.fromEntries(
    Object.entries(results).map(([key, { value }]) => [key, { value }])
  );
