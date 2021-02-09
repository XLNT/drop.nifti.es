import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'client/lib/theme';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          key="google"
          href="//fonts.googleapis.com/css2?family=DM+Mono&family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NextSeo
        title="📦 drop.nifti.es"
        description="📦 Drops, 🚚 digital delivery, and ↪ distribution for ERC1155 tokens. Literally just the easiest way to distribute ERC1155 assets to users, whether they're familiar with blockchain or not."
        openGraph={{
          site_name: '📦 drop.nifti.es',
          // images: [
          //   {
          //     url: 'https://drop.nifti.es/meta.png',
          //     // width: 800,
          //     // height: 600,
          //     // alt: 'Og Image Alt',
          //   },
          // ],
        }}
        twitter={{
          handle: '@mattgcondon',
          cardType: 'summary_large_image',
        }}
      />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
