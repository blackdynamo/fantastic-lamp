import { FeatureResult, GrowthBook } from "@growthbook/growthbook";

export const evalFeatures =
  (gb: GrowthBook) => (): Record<string, FeatureResult> => {
    const features = gb.getFeatures();

    return Object.fromEntries(
      Object.keys(features).map((key) => [key, gb.evalFeature(key)])
    );
  };
