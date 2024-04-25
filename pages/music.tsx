import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { DoubleHeader, FeaturesAsymmetrical } from "./lib";
import { FooterCentered } from "./lib";
import { RetrievePDFs }  from "./customcomponents/retrievePDFs";

//boilerplate
export default function Music() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <RetrievePDFs></RetrievePDFs>
    </MantineProvider>
  );
}
