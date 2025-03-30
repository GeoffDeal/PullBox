import Message from "./Message";
import { NotificationContext, UserContext } from "../Contexts";
import { useContext, useEffect, useState } from "react";
import api from "../api/api";

function Notifications() {
  const { messages, setMessages } = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  useEffect(() => {
    let cancelled = false;
    const getNotifications = async () => {
      try {
        const res = await api.get("/notifications/getnotifications");
        if (!cancelled) {
          const sortedMessages = res.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setMessages(sortedMessages);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getNotifications();
    return () => {
      cancelled = true;
    };
  }, [setMessages]);

  const [message, setMessage] = useState({ title: "", date: "", body: "" });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMessage((values) => ({ ...values, [name]: value }));
  };
  const messageSubmit = async (event) => {
    event.preventDefault();
    const notificationData = {
      title: message.title,
      body: message.body,
    };
    if (message.image) notificationData.imageUrl = message.imageUrl;
    try {
      await api.post("/notifications/createnotification", notificationData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="notificationPage pageDisplay">
      <h1>Notifications</h1>
      <div className="notificationContainer">
        {!user.customer && (
          <div className="messageInput">
            <form onSubmit={messageSubmit}>
              <input
                type="text"
                id="titleInput"
                placeholder="Message Title"
                name="title"
                onChange={handleChange}
              ></input>
              <textarea
                rows={5}
                cols={32}
                id="bodyInput"
                name="body"
                onChange={handleChange}
              ></textarea>
              <input
                type="text"
                id="urlInput"
                placeholder="Image URL"
                name="imageUrl"
                onChange={handleChange}
              ></input>
              <br />
              <input
                type="submit"
                value="Post Message"
                className="submitButton"
              />
            </form>
          </div>
        )}
        <div className="messageBox">
          {messages &&
            messages.map((message, index) => (
              <Message
                key={index}
                title={message.title}
                date={new Date(message.date).toLocaleDateString("en-CA")}
                body={message.body}
                image={message.image}
                id={message.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
