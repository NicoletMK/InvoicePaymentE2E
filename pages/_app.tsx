import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { ClientListContext } from "../context/clientList";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Invoice and Bill</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ClientListContext.Provider
        value={[
          {
            id: 1,
            email: "abcd@test.com",
            name: "abcd",
            type: "PERSON",
          },
          {
            id: 3,
            email: "3dots@test.com",
            name: "3dots",
            type: "ORGANIZATION",
          },
        ]}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ClientListContext.Provider>
    </>
  );
}
