import { z } from "zod";

import { featureResults } from "./feature-results";

const request = z.object({
  attributes: z.object({}).passthrough(),
});

export const features = featureResults(request);
