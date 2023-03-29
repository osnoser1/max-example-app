import Link from "next/link";

import { Button, Icon, Item } from "semantic-ui-react";

import { ArtistCard, Container } from "@components/common";
import { useMyList } from "@framework/myList";

const MyList = () => {
  const { artists } = useMyList();

  return (
    <Container>
      <Link href="/">
        <Button as="span" icon>
          <Icon name="angle left" />
          Back to search
        </Button>
      </Link>
      <h1 className="text-center">My List</h1>
      {!artists.length && <p>No Artists in List</p>}
      <Item.Group divided>
        {artists.map(artist => (
          <ArtistCard key={`artist-${artist.id}`} artist={artist} />
        ))}
      </Item.Group>
    </Container>
  );
};

export default MyList;
