import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:title" content="Your daily horror story" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://www.chat-with-celebrities.com/"
        />
        <meta
          property="og:image"
          content="https://www.daily-horror-story.com/header-image-halloween.jpg"
        />
        <meta
          property="og:description"
          content="This is your chance to talk to your favorite celebrity. Don't piss them off."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
