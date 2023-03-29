import { useCallback, useMemo } from "react";

import { useMyListContext } from "@framework/myList/context";

export function useMyList() {
  const { artists, addArtist, removeArtist } = useMyListContext();
  const artistList = useMemo(() => Object.values(artists), [artists]);
  const existArtist = useCallback((id: number) => !!artists[id], [artists]);
  return { artists: artistList, existArtist, addArtist, removeArtist };
}
