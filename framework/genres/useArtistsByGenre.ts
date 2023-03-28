import useSWR from "swr";

import { Artist } from "@framework/artist";
import { Genre } from "@framework/genres/Genre";
import { fetcher } from "@lib/fetcher";
import { Maybe } from "@lib/types/maybe";

export function useArtistsByGenre(genre: Maybe<Genre>) {
  return useSWR(
    // @ts-ignore it's intentional, it'll throw an exception when genre is undefined, and it won't do the request
    () => `/api/v1/music/genres/${genre.id}/artists`,
    path => fetcher<{ data: Artist[] }>(path).then(result => result.data),
    { keepPreviousData: true },
  );
}
