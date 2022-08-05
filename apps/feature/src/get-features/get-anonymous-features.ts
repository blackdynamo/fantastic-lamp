import { z } from "zod";

import { featureResults } from "./feature-results";

const anonymousAttributes = z.object({
  anonymousId: z.string(),
});

const request = z.object({
  attributes: anonymousAttributes,
});

export const anonymousFeatures = featureResults(request);
