import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Dimmer, Icon, Image, Item } from "semantic-ui-react";

import { ArtistCard, Container } from "@components/common";
import { useArtist, useSimilarArtists } from "@framework/artist";
import { toStringQuery } from "@lib/query-utils";

const ArtistDetail: FC = () => {
  const {
    query: { id },
  } = useRouter();
  const { data: artist, isLoading } = useArtist(toStringQuery(id));
  const { data: similarArtists = [], isLoading: isSimilarArtistsLoading } =
    useSimilarArtists(toStringQuery(id));

  return (
    <>
      <Container>
        <Link href="/">
          <Button as="span" icon>
            <Icon name="angle left" />
            Back to search
          </Button>
        </Link>
        <h1 className="sr-only">Artist Detail</h1>
        {isLoading && (
          <Dimmer.Dimmable blurring dimmed>
            <Dimmer inverted />
            <p>
              <Image src="/short-paragraph.png" />
            </p>
            <p>
              <Image src="/short-paragraph.png" />
            </p>
          </Dimmer.Dimmable>
        )}
        {artist && (
          <Item.Group divided>
            <ArtistCard artist={artist} showAllInfo />
          </Item.Group>
        )}

        <h2>Related Artists:</h2>
        {similarArtists.length === 0 && !isSimilarArtistsLoading && (
          <p>No related artists</p>
        )}
        {isSimilarArtistsLoading && (
          <Dimmer.Dimmable blurring dimmed>
            <Dimmer inverted />
            <p>
              <Image src="/short-paragraph.png" />
            </p>
            <p>
              <Image src="/short-paragraph.png" />
            </p>
            <p>
              <Image src="/short-paragraph.png" />
            </p>
          </Dimmer.Dimmable>
        )}
        <Item.Group divided>
          {similarArtists.map(artist => (
            <ArtistCard key={`artist-${artist.id}`} artist={artist} />
          ))}
        </Item.Group>
      </Container>
    </>
  );
};

export default ArtistDetail;
