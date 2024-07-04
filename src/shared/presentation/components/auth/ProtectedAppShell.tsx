import { AppShell } from "@mantine/core";
import Navbar from "../navbar/Navbar";
import { useDisclosure } from "@mantine/hooks";

export function ProtectedAppShell({ children }: { children: React.ReactNode }) {
  const [opened] = useDisclosure();

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
