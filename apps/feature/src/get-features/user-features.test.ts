import { setTimeout } from "node:timers/promises";

import { FeatureDefinition } from "@growthbook/growthbook";

import { userFeatures } from "./user-features";

const createFetchFeatures =
  (features: Record<string, FeatureDefinition>) => async () =>
    features;

describe("userFeatures", () => {
  it("should get user features", async () => {
    const fetchFeatures = createFetchFeatures({});
    const getFeatures = userFeatures({ fetchFeatures });

    const actual = await getFeatures({
      attributes: { primaryEmail: "hello@goodbye.com", userId: "userId" },
    });

    expect(actual).toEqual({});
  });

  it("long timeout", async () => {
    await setTimeout(30000);
    expect(true).toBe(true);
  }, 60000);
});
