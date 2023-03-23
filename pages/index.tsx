import { Button } from "semantic-ui-react";

import { Layout } from "@components/common";

export default function Home() {
  return (
    <>
      <h1>App Works!</h1>
      <Button>Cta</Button>
    </>
  );
}

Home.Layout = Layout;
