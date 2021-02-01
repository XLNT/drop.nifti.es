import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'client/lib/theme';
import { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          key="google"
          href="//fonts.googleapis.com/css2?family=DM+Mono&family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
