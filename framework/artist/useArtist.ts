import useSWR from "swr";

import { Artist } from "@framework/artist/Artist";
import { fetcher } from "@lib/fetcher";
import { Maybe } from "@lib/types/maybe";

export function useArtist(id: Maybe<string | number>) {
  return useSWR(
    // @ts-ignore it's intentional, it'll throw an exception when genre is undefined, and it won't do the request
    () => (id ? `/api/v1/music/artists/${id}/` : null),
    path => fetcher<{ data: Artist[] }>(path).then(result => result.data[0]),
  );
}
