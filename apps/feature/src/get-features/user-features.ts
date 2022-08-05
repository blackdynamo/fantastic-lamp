import { z } from "zod";

import { featureResults } from "./feature-results";

const userAttributes = z.object({
  primaryEmail: z.string(),
  userId: z.string(),
});

const request = z.object({
  attributes: userAttributes,
});

export const userFeatures = featureResults(request);
