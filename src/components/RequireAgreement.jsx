import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAgreement = () => {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return null;

  const agreed = user?.unsafeMetadata?.agreedToTerms;
  if (!agreed) {
    return <Navigate to="/welcome" replace />;
  }

  return <Outlet />;
};
export default RequireAgreement;
