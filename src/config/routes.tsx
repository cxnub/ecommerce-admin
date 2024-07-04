import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Dashboard from "../features/dashboard/presentation/screens/dashboard.screen";
import AddSingleProductScreen from "../features/products/presentation/screens/AddSingleProduct.screen";
import AddMultipleProductsScreen from "../features/products/presentation/screens/AddMultipleProduct.screen";
import { ProtectedRouteLayout } from "../shared/presentation/components/auth/ProtectedRouteLayout";
import { AuthProvider } from "../shared/presentation/components/auth/AuthProvider";
import { AnonymousRoute } from "../shared/presentation/components/auth/AnonymousRoute";
import { LandingPage } from "../features/auth/presentation/screens/LandingPage";
import { ConditionalNotFoundPage } from "../pages/notFound/ConditionalNotFoundPage";

const enum routeNames {
  LandingScreen = "/",
  HomeScreen = "/dashboard",
  AddSingleProductScreen = "/addSingleProduct",
  AddMultipleProductsScreen = "/addMultipleProducts",
  NotFoundPage = "/not-found",
}

const anonymousRoutes = [
  {
    path: routeNames.LandingScreen,
    element: <LandingPage />,
  },
];

//
const protectedRoutes = [
  {
    path: routeNames.HomeScreen,
    element: <Dashboard />,
  },
  {
    path: routeNames.AddSingleProductScreen,
    element: <AddSingleProductScreen />,
  },
  {
    path: routeNames.AddMultipleProductsScreen,
    element: <AddMultipleProductsScreen />,
  },
];

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    errorElement: <Navigate to={routeNames.NotFoundPage} />,
    children: [
      {
        element: <AnonymousRoute />,
        children: anonymousRoutes,
      },
      {
        element: <ProtectedRouteLayout />,
        children: protectedRoutes,
      },
      {
        path: routeNames.NotFoundPage,
        element: <ConditionalNotFoundPage />,
      },
    ],
  },
]);

export { routeNames, router };
