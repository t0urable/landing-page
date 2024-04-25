import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { DoubleHeader, FeaturesAsymmetrical } from "./lib";
import { FooterCentered } from "./lib";

//boilerplate
export default function Product() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
        <div>
            <p>WIP!</p>
        </div>
    </MantineProvider>
  );
}
