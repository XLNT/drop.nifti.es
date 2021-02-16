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
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
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
