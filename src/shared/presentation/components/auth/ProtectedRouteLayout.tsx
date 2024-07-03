import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import Navbar from "../navbar/Navbar";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { routeNames } from "../../../../config/routes";
import { useEffect } from "react";

export const ProtectedRouteLayout = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [opened] = useDisclosure();

  useEffect(() => {
    if (!token) {
      navigate(routeNames.LandingScreen);
    }
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
      <Outlet />
    </AppShell>
  );
};
