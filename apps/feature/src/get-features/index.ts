import { FeatureDefinition } from "@growthbook/growthbook";
import process from "node:process";

import { createLogger, track } from "@blackdynamo/logger";

import { env } from "../schemas";

import { anonymousFeatures } from "./get-anonymous-features";
import { features } from "./features";
import { userFeatures } from "./user-features";

const { LOG_LEVEL } = env.parse(process.env);

const logger = createLogger({ level: LOG_LEVEL });
const debug = track(logger.debug.bind(logger));

const fetchFeatures = async (): Promise<Record<string, FeatureDefinition>> => {
  return {};
};

export const getAnonymousFeatures = debug(
  anonymousFeatures({ fetchFeatures }),
  "getAnonymousFeatures"
);

export const getFeatures = debug(features({ fetchFeatures }), "getFeatures");

export const getUserFeatures = debug(
  userFeatures({ fetchFeatures }),
  "getUserFeatures"
);
