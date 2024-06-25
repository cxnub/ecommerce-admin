import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../features/dashboard/presentation/screens/dashboard.screen";
import NotFoundPage from "../pages/NotFoundPage";
import AddSingleProductScreen from "../features/products/presentation/screens/AddSingleProduct.screen";
import AddMultipleProductsScreen from "../features/products/presentation/screens/AddMultipleProduct.screen";

const enum routeNames {
    HomeScreen = "/",
    AddSingleProductScreen = "/addSingleProduct",
    AddMultipleProductsScreen = "/addMultipleProducts"
}

const router = createBrowserRouter([
    {
      path: routeNames.HomeScreen,
      element: <Dashboard />,
      errorElement: <NotFoundPage />,
    },
    {
      path: routeNames.AddSingleProductScreen,
      element: <AddSingleProductScreen />
    },
    {
      path: routeNames.AddMultipleProductsScreen,
      element: <AddMultipleProductsScreen />
    }
  ]);

export { routeNames, router };