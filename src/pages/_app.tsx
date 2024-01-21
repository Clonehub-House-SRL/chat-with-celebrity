import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';

import Layout from '@layout';
import theme from '@theme';
import '@styles/globals.css';
import '@components/chat/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} key={router.route} />
        <Analytics />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
