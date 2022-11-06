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
        </Head>
        <body className="ph-no-capture">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  };
}
