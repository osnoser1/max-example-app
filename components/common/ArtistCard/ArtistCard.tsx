import { FC, useMemo } from "react";
import Link from "next/link";

import { Button, Item, Label } from "semantic-ui-react";

import { Artist } from "@framework/artist";

interface Props {
  artist: Artist;
  showAllInfo?: boolean;
}

const ArtistCard: FC<Props> = ({ artist, showAllInfo }) => {
  const primaryGenre = useMemo(
    () => artist.genres.find(({ is_primary }) => is_primary),
    [artist],
  );
  const additionalGenres = useMemo(
    () => artist.genres.filter(genre => genre !== primaryGenre),
    [artist, primaryGenre],
  );

  return (
    <Item key={`artist-${artist.id}`}>
      <Item.Image size={showAllInfo ? "medium" : "small"} src={artist.image} />
      <Item.Content verticalAlign="middle">
        <Item.Header>
          <Link href={`/artists/${artist.id}`}>{artist.name}</Link>
        </Item.Header>
        {showAllInfo && (
          <Item.Description>
            <p>
              Primary Genre: <Label>{primaryGenre?.name || "None"}</Label>
            </p>
            <p>Popularity Score: {artist.popularity}</p>
            {!!additionalGenres.length && (
              <p>
                Additional Genres:{" "}
                {additionalGenres.map(({ id, name }) => (
                  <Label key={`genre-${id}`}>{name}</Label>
                ))}
              </p>
            )}
          </Item.Description>
        )}
        <Item.Extra>
          <Button primary floated="right">
            Add
          </Button>
          {!showAllInfo && <Label>{primaryGenre?.name || "None"}</Label>}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ArtistCard;
