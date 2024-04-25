import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { HeroBullets } from "./lib";

//boilerplate
export default function Waitlist() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
        <HeroBullets />
    </MantineProvider>
  );
}
