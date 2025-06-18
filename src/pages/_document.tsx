import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script 
          src="https://assets.calendly.com/assets/external/widget.js" 
          type="text/javascript" 
          async
        />
      </Head>
      <body className="bg-white text-zinc-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
