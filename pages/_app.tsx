import { FC, PropsWithChildren } from "react";
import type { AppProps } from "next/app";

import "semantic-ui-css/semantic.min.css";
import "@styles/globals.scss";

const Noop: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
