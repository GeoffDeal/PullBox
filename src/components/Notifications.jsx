import Message from "./Message";
import { UserContext } from "../Contexts";
import { NotificationContext } from "../Contexts";
import { useContext, useState } from "react";

function Notifications () {

    const { user } = useContext(UserContext);
    const { messages, setMessages} = useContext(NotificationContext);

    const [message, setMessage] = useState({title: '', date: '', body: '',});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setMessage(values => ({...values, [name]: value }))
    }
    const messageSubmit = (event) => {
        event.preventDefault();
        const currentDate = new Date().toDateString();
        const messageId = Math.floor(Math.random() * 10000)
        const newMessage = ({...message, date: currentDate, id: messageId})
        setMessages([newMessage, ...messages]);
    }
    
    return (
        <div className="notificationPage pageDisplay">
            <h1>Notifications</h1>
            { !user.customer && <div className="messageInput">
                <form onSubmit={messageSubmit}>
                    <input 
                        type="text" 
                        id="titleInput"
                        placeholder="Message Title"
                        name="title"
                        onChange={handleChange}>
                    </input>
                    <textarea 
                        rows={5} 
                        cols={32} 
                        id="bodyInput"
                        name="body"
                        onChange={handleChange}></textarea>
                    <input type="submit" value="Post Message" className="submitButton" />
                </form>
            </div> }
            <div className="messageBox">
                {messages.map((message, index) => (
                    <Message key={ index } title={ message.title } date={ message.date } body={ message.body} id={message.id} />
                ))}
            </div>
        </div>
    ) 
}

export default Notifications;