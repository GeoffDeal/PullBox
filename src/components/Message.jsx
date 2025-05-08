import { toast } from "react-toastify";
import api from "../api/api";
import { useUser } from "@clerk/clerk-react";

function Message(props) {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  const handleDel = props.messageDel;
  const delMessage = async (id) => {
    try {
      await api.delete(`notifications/deletenotification/${id}`);

      handleDel(id);
    } catch (err) {
      console.error(err);
      toast.error(`Error Connecting to Server :${err.message}`);
    }
  };

  return (
    <div className="messageContainer">
      <h3>{props.title}</h3>
      {role === "admin" && (
        <button className="deleteMessage" onClick={() => delMessage(props.id)}>
          <span className="material-symbols-outlined">close</span>
        </button>
      )}
      <p>{props.body}</p>
      <p className="dateText">{props.date}</p>
    </div>
  );
}

export default Message;
