import { toast } from "react-toastify";

export const confirmToast = (action, message) => {
  toast(
    ({ closeToast }) => (
      <div className="confirmToast">
        <p>{message}</p>
        <button
          onClick={() => {
            action();
            closeToast();
          }}
          className="yesButton"
        >
          Yes
        </button>
        <button onClick={closeToast} className="noButton">
          No
        </button>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      position: "top-center",
      className: "custom-toast-wrapper",
      bodyClassName: "custom-toast-body",
    }
  );
};
