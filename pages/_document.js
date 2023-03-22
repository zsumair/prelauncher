import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head />
      <body className="antialiased bg-[#f5f5f5] dark:bg-inherit">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
