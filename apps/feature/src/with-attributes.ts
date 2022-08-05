type AnyRecord = Record<string, unknown>;

export const withAttributes = ({
  attributes = {},
  ...input
}: AnyRecord): AnyRecord => ({
  ...input,
  attributes,
});
