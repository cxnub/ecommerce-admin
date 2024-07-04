import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { routeNames } from "../../../../config/routes";
import { useEffect } from "react";

export const AnonymousRoute = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  // If the user is logged in, redirect to the home page
  useEffect(() => {
    if (token) {
      navigate(routeNames.HomeScreen);
    }
  });

  // If the user is not logged in, render the children
  return <Outlet />;
};
