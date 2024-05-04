import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { RetrievePDFs }  from "./customcomponents/retrievePDFs";

//boilerplate
export default function Music() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <div style={{ margin: '2%' }}>
        <RetrievePDFs></RetrievePDFs>
      </div>
    </MantineProvider>
  );
}
