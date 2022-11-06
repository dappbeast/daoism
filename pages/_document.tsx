import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import React from "react";

export default class MyDocument extends Document {
  render = (): JSX.Element => {
    return (
      <Html lang="en">
        <Head>
          <link href="/fonts/style.css" rel="stylesheet" />
          <link rel="preconnect" href="https://rsms.me/" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body className="ph-no-capture">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  };
}
