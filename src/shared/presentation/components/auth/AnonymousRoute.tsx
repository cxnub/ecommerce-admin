import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";

export const AnonymousRoute = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  // If the user is not logged in, render the children
  if (!token) {
    return <Outlet />;
  }

  // If the user is logged in, redirect to the home page
  navigate("/");
};
