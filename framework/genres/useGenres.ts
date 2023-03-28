import useSWR from "swr";

import { Genre } from "@framework/genres/Genre";

import { fetcher } from "../../lib/fetcher";

export function useGenres(q: string) {
  return useSWR(
    () => (q ? { path: "/api/v1/music/genres", params: { q } } : null),
    ({ path, params }) =>
      fetcher<{ data: Genre[] }>(path, { params }).then(result => result.data),
  );
}
