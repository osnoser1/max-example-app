import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { Artist } from "@framework/artist";
import { createAction, createReducer, on, props } from "@lib/state";

interface InternalState {
  artists: Record<string, Artist>;
}

interface UIContextState {
  addArtist: (args: Omit<typeof addArtist, "type">) => void;
  removeArtist: (args: Omit<typeof removeArtist, "type">) => void;
}

const addArtist = createAction("Add Artist", props<{ artist: Artist }>());
const removeArtist = createAction("Remove Artist", props<{ id: number }>());
const loadArtists = createAction(
  "Load Artists",
  props<{ artists: Record<number, Artist> }>(),
);

const UIContext = createContext<UIContextState & InternalState>({} as any);

const uiReducer = createReducer<InternalState>(
  on(addArtist, (state, { artist }) => ({
    ...state,
    artists: { ...state.artists, [artist.id]: artist },
  })),
  on(removeArtist, (state, { id }) => {
    const cloneArtists = { ...state.artists };
    delete cloneArtists[id];
    return { ...state, artists: cloneArtists };
  }),
  on(loadArtists, (state, { artists }) => ({ ...state, artists })),
);

export function useMyListContext() {
  return useContext(UIContext);
}

export const MyListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, dispatch] = useReducer(uiReducer, { artists: {} });

  function addArtist(data: Omit<typeof addArtist, "type">) {
    dispatch({ type: "Add Artist", ...data });
  }

  function removeArtist(data: Omit<typeof addArtist, "type">) {
    dispatch({ type: "Remove Artist", ...data });
  }

  useEffect(() => {
    const artists = JSON.parse(localStorage.getItem("artists") ?? "{}") ?? [];
    dispatch({ type: "Load Artists", artists });
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    console.log("isLoaded", isLoaded);
    if (!isLoaded) {
      return;
    }

    localStorage.setItem("artists", JSON.stringify(state.artists));
  }, [isLoaded, state]);

  return (
    <UIContext.Provider value={{ ...state, addArtist, removeArtist }}>
      {children}
    </UIContext.Provider>
  );
};
