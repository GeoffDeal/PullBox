import { useContext } from "react";
import { UserContext, NotificationContext } from "../Contexts";
import api from "../api/api";

function Message(props) {
  const { user } = useContext(UserContext);
  const { messages, setMessages } = useContext(NotificationContext);
  const delMessage = async (id) => {
    try {
      await api.delete(`notifications/deletenotification/${id}`);

      const remainingMessages = messages.filter((message) => message.id !== id);
      setMessages(remainingMessages);
    } catch (err) {
      console.error(err);
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
