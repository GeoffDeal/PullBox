import Message from "./Message";
import { UserContext } from "../Contexts";
import { NotificationContext } from "../Contexts";
import { useContext, useState } from "react";

function Notifications () {
    const messageArray = [
        {title: 'Flash Sale', date: 'June 8th, 2024', body: 'All back issues are 50% for the weekend!'},
        {title: 'Free Comic Book Day', date: 'May 2nd, 2024', body: 'Free Comic Book Day is this Saturday! Great sales storewide!'},
        {title: 'Another Test', date: 'April 21st, 2024', body: 'This is going to be a really long text to test what it looks like when a longer message is posted. Lorem etc etc, should really use a lorem generator but I am invested now'},
        {title: 'Test Post', date: 'April 20th, 2024', body: 'Testing, testing, 1, 2, 3'}
    ];
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
        const newMessage = ({...message, date: currentDate})
        setMessages([newMessage, ...messages]);
    }
    
    return (
        <>
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
                    <input type="submit" />
                </form>
            </div> }
            <div className="messageBox">
                {messages.map((message, index) => (
                    <Message key={ index } title={ message.title } date={ message.date } body={ message.body} />
                ))}
            </div>
        </>
    ) 
}

export default Notifications;