import { useAuth } from "../../hooks/useAuth";
import AnonymousNotFoundPage from "./AnonymousNotFoundPage";
import ProtectedNotFoundPage from "./ProtectedNotFoundPage";

export function ConditionalNotFoundPage() {
  const { token } = useAuth();
  
  if (token) {
    console.log("ProtectedNotFoundPage");
    return <ProtectedNotFoundPage />;
  }

    console.log("AnonymousNotFoundPage");
    return <AnonymousNotFoundPage />;
}