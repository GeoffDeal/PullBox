import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

function RequireAuth({ children }) {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </>
  );
}

export default RequireAuth;
