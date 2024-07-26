import { useContext } from "react";
import { UserContext, NotificationContext } from "../Contexts";


function Message (props) {
    const { user } = useContext(UserContext);
    const { messages, setMessages } = useContext(NotificationContext);
    const delMessage = (id) => {
        const newMessages = messages.filter((message) => message.id !== id);
        setMessages(newMessages);
    }

    return (
        <div className="messageContainer">
            <h3>{ props.title }</h3>
            {!user.customer && <button className="deleteMessage" onClick={() => delMessage(props.id)}><span className="material-symbols-outlined">close</span></button>}
            <p>{ props.body }</p>
            <p className="dateText">{ props.date }</p>
        </div>
    )
}

export default Message;