import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="https://gwinnettpsychiatry.com/wp-content/uploads/2021/12/logo.svg"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="https://gwinnettpsychiatry.com/wp-content/uploads/2021/12/logo.svg"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="https://gwinnettpsychiatry.com/wp-content/uploads/2021/12/logo.svg"
        />
        <meta
          name="msapplication-TileImage"
          content="https://gwinnettpsychiatry.com/wp-content/uploads/2021/12/logo.svg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
