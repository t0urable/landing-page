import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { DoubleHeader, FeaturesAsymmetrical } from "./lib";
import { HeroBullets } from "./lib";
import { FooterCentered } from "./lib";

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <DoubleHeader></DoubleHeader>
      <Component {...pageProps} />
      <HeroBullets></HeroBullets>
      <FooterCentered></FooterCentered>
    </MantineProvider>
  );
}
