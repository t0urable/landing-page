import "@mantine/core/styles.css";
import { useState } from 'react';
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { DoubleHeader, FeaturesAsymmetrical } from "./lib";
import { HeroBullets } from "./lib";
import { FooterCentered } from "./lib";
import { RetrievePDFs }  from "./customcomponents/retrievePDFs";

//page imports
import Music from './music';
import Product from './product';
import Waitlist from './waitlist';

export default function App({ Component, pageProps }: any) {

  // defining page tracker parent code, homepage set at default but active tracker in child component set at 1
  const [pageTracker, setpageTracker] = useState(0);

  let content;
  switch(pageTracker) {
    case 1:
      content = <Waitlist/>;
      break;
    case 2:
      content = <Music/>;
      break;
    case 3:
      content = <Product/>;
      break;
    default:
      content = (
        <>
          <Component {...pageProps} />
        </>
      )
  }

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <DoubleHeader setpageTracker = {setpageTracker}></DoubleHeader>
        {content}
      <FooterCentered></FooterCentered>
    </MantineProvider>
  );
}
