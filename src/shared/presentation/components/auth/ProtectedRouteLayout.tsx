import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { routeNames } from "../../../../config/routes";
import { useEffect } from "react";
import { ProtectedAppShell } from "./ProtectedAppShell";

export const ProtectedRouteLayout = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(routeNames.LandingScreen);
    }
  });

  return (
    <ProtectedAppShell>
      <Outlet />
    </ProtectedAppShell>
  );
};
