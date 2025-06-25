import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleCheck = (event) => {
    setAgreedToTerms(event.target.checked);
  };

  const handleContinue = async () => {
    if (agreedToTerms) {
      await user?.update({
        unsafeMetadata: { agreedToTerms },
      });

      navigate("/");
    }
  };

  return (
    <div className="backgroundWrapper">
      <div className="welcomeDiv">
        <h1>Welcome to Herostash!</h1>
        <p className="welcomePara">
          Every comic book collector has experienced this nightmare: You check
          your local comic shop for the new book or cover you’ve been waiting
          for but they’ve sold out! Well guess what? This never has to happen
          again thanks to Herostash!{" "}
        </p>
        <p className="welcomePara">
          Now that you’ve set up an account feel free to pull books that you
          want to collect! You can search through a large variety of titles and
          variant covers from a number of publishers. As an added bonus, if you
          pick up your books within a week of the release day we’ll give you 10%
          off! If you haven’t chatted with us at the shop yet, reach out and let
          us know you want to set up a stash box so we can approve your account.
        </p>
        <p className="welcomePara">
          {" "}
          Remember, when you pull a comic, you’re reserving a copy before it
          hits the shelves - guaranteeing it’s set aside just for you on release
          day. By pulling a title, you’re committing to purchase it once it
          arrives in the shop.
        </p>
        <div className="checkDiv">
          <input
            type="checkbox"
            id="agreeCheckbox"
            checked={agreedToTerms}
            onChange={handleCheck}
          />
          <label htmlFor="agreeCheckbox">
            I agree to purchase any comics I pull after they are released
          </label>
        </div>
        <button
          className="continueButton"
          disabled={!agreedToTerms}
          onClick={handleContinue}
        >
          Continue to Herostash
        </button>
      </div>
    </div>
  );
};

export default Welcome;
