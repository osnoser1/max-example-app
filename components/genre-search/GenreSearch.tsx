import { FC, useCallback, useMemo, useState } from "react";
import Link from "next/link";

import { debounce } from "lodash-es";
import {
  Dropdown,
  DropdownItemProps,
  Item,
  StrictDropdownProps,
} from "semantic-ui-react";

import { ArtistCard, Container, Loading } from "@components/common";
import { Genre, useArtistsByGenre, useGenres } from "@framework/genres";

import s from "./GenreSearch.module.scss";

const GenreSearch: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre>();

  const { data: genres, isLoading } = useGenres(searchQuery);

  const { data: artists, isLoading: isArtistsLoading } =
    useArtistsByGenre(selectedGenre);

  const options = useMemo<DropdownItemProps[]>(
    () =>
      genres?.map(genre => ({
        key: genre.id,
        text: genre.name,
        value: genre as any,
      })) ?? [],
    [genres],
  );

  const debounceSearchChange: StrictDropdownProps["onSearchChange"] =
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(
      debounce((event, data) => setSearchQuery(data.searchQuery), 300),
      [],
    );

  return (
    <div className={s.root}>
      <Container>
        <div className="flex justify-between">
          <h1>Genre Search</h1>
          <Link href="/my-list">View My List</Link>
        </div>
        <p>Enter a genre to find artists:</p>
        <div className="my-5">
          <Dropdown
            fluid
            loading={isLoading}
            openOnFocus={!isLoading}
            options={options}
            search
            selection
            selectOnNavigation={false}
            style={{ width: 300 }}
            placeholder="input here"
            onSearchChange={debounceSearchChange}
            // @ts-ignore
            onChange={(event, { value }) => setSelectedGenre(value)}
          />
        </div>
      </Container>
      <Container className="overflow-auto">
        {artists && (
          <Item.Group divided>
            {artists.map(artist => (
              <ArtistCard key={`artist-${artist.id}`} artist={artist} />
            ))}
          </Item.Group>
        )}
        {isArtistsLoading && <Loading />}
      </Container>
    </div>
  );
};

export default GenreSearch;
