import { SignIn } from "@clerk/clerk-react";
import darklogo from "../assets/darklogo.png";

const SignInPage = () => {
  return (
    <div className="sign-in-wrapper">
      <img src={darklogo} alt="Logo" id="signinlogo" />
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
