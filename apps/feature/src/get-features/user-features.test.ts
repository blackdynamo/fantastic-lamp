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
});
