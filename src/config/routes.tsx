import { Outlet, createBrowserRouter } from "react-router-dom";
import Dashboard from "../features/dashboard/presentation/screens/dashboard.screen";
import NotFoundPage from "../pages/notFound/NotFoundPage";
import AddSingleProductScreen from "../features/products/presentation/screens/AddSingleProduct.screen";
import AddMultipleProductsScreen from "../features/products/presentation/screens/AddMultipleProduct.screen";
import { ProtectedRouteLayout } from "../shared/presentation/components/auth/ProtectedRouteLayout";
import { AuthProvider } from "../shared/presentation/components/auth/AuthProvider";
import { AnonymousRoute } from "../shared/presentation/components/auth/AnonymousRoute";
import { LandingPage } from "../features/auth/presentation/screens/LandingPage";

const enum routeNames {
  LandingScreen = "/",
  HomeScreen = "/dashboard",
  AddSingleProductScreen = "addSingleProduct",
  AddMultipleProductsScreen = "addMultipleProducts",
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
    children: [
      {
        element: <AnonymousRoute />,
        children: anonymousRoutes,
      },
      {
        element: <ProtectedRouteLayout />,
        errorElement: <NotFoundPage />,
        children: protectedRoutes,
      },
    ],
  },
]);

export { routeNames, router };
