import { SignUp } from "@clerk/clerk-react";
import darklogo from "../assets/darklogo.png";

const SignUpPage = () => {
  return (
    <div className="sign-in-wrapper">
      <img src={darklogo} alt="Logo" id="signinlogo" />
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;
