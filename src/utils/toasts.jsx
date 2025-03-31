import { toast } from "react-toastify";

export const confirmToast = (action, message) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p>{message}</p>
        <button
          onClick={() => {
            action();
            closeToast();
          }}
        >
          Yes
        </button>
        <button onClick={{ closeToast }}>No</button>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      position: "top-center",
    }
  );
};
