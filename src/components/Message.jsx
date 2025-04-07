import { useContext } from "react";
import { UserContext } from "../Contexts";
import { toast } from "react-toastify";
import api from "../api/api";

function Message(props) {
  const { user } = useContext(UserContext);
  // const { messages, setMessages } = useContext(NotificationContext);
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
      {!user.customer && (
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
