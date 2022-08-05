import { FeatureResult } from "@growthbook/growthbook";

export type SaveResult = (key: string, result: FeatureResult) => Promise<void>;

export const saveResults =
  (saveResult: SaveResult) => (results: Record<string, FeatureResult>) =>
    Promise.all(
      Object.entries(results).map(([key, result]) => saveResult(key, result))
    );
