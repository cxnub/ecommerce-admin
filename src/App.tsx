import { RouterProvider } from "react-router-dom";

import "@mantine/core/styles.css";
import {
  localStorageColorSchemeManager,
  MantineProvider,
  createTheme,
  AppShell,
} from "@mantine/core";

import "./index.css";
import Navbar from "./shared/presentation/components/navbar/Navbar";
import { useDisclosure } from "@mantine/hooks";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Notifications } from "@mantine/notifications";
import { router } from "./config/routes";

const colorSchemeManager = localStorageColorSchemeManager({
  key: "color-scheme",
});

const theme = createTheme({
  colors: {
    primary: [
      "#f5f5f4",
      "#e7e7e7",
      "#cecece",
      "#b3b3b3",
      "#9b9b9b",
      "#8c8c8c",
      "#868584",
      "#747271",
      "#696663",
      "#5d5751",
    ],
  },
  primaryColor: "primary",
});

const queryClient = new QueryClient();

export default function App() {
  const [opened] = useDisclosure();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={theme}
        colorSchemeManager={colorSchemeManager}
        defaultColorScheme="light"
      >
        <Notifications limit={3} />
        <AppShell
          transitionDuration={500}
          transitionTimingFunction="ease"
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
          padding="md"
          layout="alt"
        >
          <Navbar />
          <RouterProvider router={router} />
        </AppShell>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
