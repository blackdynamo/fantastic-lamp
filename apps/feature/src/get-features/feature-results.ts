import {
  Attributes,
  FeatureDefinition,
  GrowthBook,
} from "@growthbook/growthbook";

import { z, ZodSchema } from "zod";

import { evalFeatures } from "./eval-features";
import { toResponse } from "./to-response";

type Options = {
  fetchFeatures: () => Promise<Record<string, FeatureDefinition>>;
};

export const featureResults =
  <T extends { attributes: Attributes }>(schema: ZodSchema<T>) =>
  ({ fetchFeatures }: Options) => {
    type Request = z.infer<typeof schema>;

    return async (request: Request) => {
      const { attributes } = schema.parse(request);
      const features = await fetchFeatures();
      const gb = new GrowthBook({ attributes, features });

      return (
        Promise.resolve(evalFeatures(gb)())
          // TODO: Save results
          // .then(tap(saveResults(saveResult({ attributes, identifier }))))
          .then(toResponse)
      );
    };
  };
