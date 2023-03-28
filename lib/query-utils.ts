import { Maybe } from "@lib/types/maybe";

export function toStringQuery(query: Maybe<string | string[]>) {
  return !Array.isArray(query) ? query : undefined;
}
