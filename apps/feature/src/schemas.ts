import { z } from "zod";

import { DEFAULT_IS_LEVEL_PARAMS, isLevel } from "@blackdynamo/logger";

export const env = z.object({
  LOG_LEVEL: z.string().refine(isLevel, DEFAULT_IS_LEVEL_PARAMS),
});
