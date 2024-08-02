import { AppShell } from "@mantine/core";
import Navbar from "../navbar/Navbar";
import { useDisclosure } from "@mantine/hooks";
import { useCookies } from "../../../../hooks/useCookies";
import api from "../../../../config/api";

export function ProtectedAppShell({ children }: { children: React.ReactNode }) {
  const [opened] = useDisclosure();
  const [token] = useCookies("token", null);

  // configure axios headers
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return (
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
      {children}
    </AppShell>
  );
}
