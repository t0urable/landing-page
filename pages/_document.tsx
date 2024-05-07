import { Html, Head, Main, NextScript } from "next/document";
import { ColorSchemeScript } from "@mantine/core";
import { AuthProvider } from "../src/AuthContext";

export default function Document() {
  return (
    <AuthProvider>
      <Html lang="en">
        <Head>
          <ColorSchemeScript />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </AuthProvider>
  );
}
