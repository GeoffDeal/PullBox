import Message from "./Message";
import { UserContext } from "../Contexts";
import { NotificationContext } from "../Contexts";
import { useContext, useState } from "react";

function Notifications () {

    const { user } = useContext(UserContext);
    const { messages, setMessages} = useContext(NotificationContext);

    const [preview, setPreview] = useState('');
    const [message, setMessage] = useState({title: '', date: '', body: '',});

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setMessage(values => ({...values, image: file}));
            console.log(message);
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }else {
            alert('Please choose an image file');
        }
    }
    const handleDragover = (event) => {
        event.preventDefault();
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setMessage(values => ({...values, [name]: value }))
        console.log(message);

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
            <div className="notificationContainer">
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
                            onChange={handleChange}>
                        </textarea>
                        <label htmlFor="imageInput" id="dropArea" name="image" onDrop={handleDrop} onDragOver={handleDragover}>
                            <input 
                                type="file"
                                accept="image/*"
                                id="imageInput"
                                name="image"
                                onChange={handleChange}
                                hidden>
                            </input>
                            <div id="imgPlace">
                                {preview ? 
                                <img src={preview} alt="Image Preview" id="imgPreview"/> :
                                <p>Drop image or click<br />to upload image</p>
                                }
                            </div>
                        </label><br />
                        <input type="submit" value="Post Message" className="submitButton" />
                    </form>
                </div> }
                <div className="messageBox">
                    {messages.map((message, index) => (
                        <Message key={ index } title={ message.title } date={ message.date } body={ message.body} image={message.image} id={message.id}/>
                    ))}
                </div>
            </div>
        </div>
    ) 
}

export default Notifications;