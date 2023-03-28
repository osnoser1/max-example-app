import { FC } from "react";
import Link from "next/link";

import { Button, Item, Label } from "semantic-ui-react";

import { Artist } from "@framework/artist";

interface Props {
  artist: Artist;
  showAllInfo?: boolean;
}

const ArtistCard: FC<Props> = ({ artist, showAllInfo }) => {
  return (
    <Item key={`artist-${artist.id}`}>
      <Item.Image size="small" src={artist.image} />
      <Item.Content verticalAlign="middle">
        <Item.Header>
          <Link href={`/artists/${artist.id}`}>{artist.name}</Link>
        </Item.Header>
        <Item.Extra>
          <Button primary floated="right">
            Add
          </Button>
          {showAllInfo ? (
            artist.genres.map(({ id, name }) => (
              <Label key={`genre-${id}`}>{name}</Label>
            ))
          ) : (
            <Label>
              {artist.genres.find(({ is_primary }) => is_primary)?.name ||
                artist.genres[0]?.name}
            </Label>
          )}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ArtistCard;
