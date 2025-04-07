import Message from "./Message";
import { UserContext } from "../Contexts";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";

function Notifications() {
  const [messages, setMessages] = useState();
  const { user } = useContext(UserContext);
  const [fetchTrigger, setFetchTrigger] = useState(false);
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
        toast.error("Error Rertrieving Notifications");
      }
    };
    getNotifications();
    return () => {
      cancelled = true;
    };
  }, [setMessages, fetchTrigger]);

  const [message, setMessage] = useState({ title: "", body: "" });

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
    if (message.imageUrl) notificationData.imageUrl = message.imageUrl;
    try {
      console.log(message);
      await api.post("/notifications/createnotification", notificationData);
      setFetchTrigger((prev) => !prev);
      setMessage({ title: "", body: "" });
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.response.data.error[0]}`);
    }
  };

  // Handle message delete

  const filterDeleted = (id) => {
    const remainingMessages = messages.filter((message) => message.id !== id);
    setMessages(remainingMessages);
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
                value={message.title}
                onChange={handleChange}
              ></input>
              <textarea
                rows={5}
                cols={32}
                id="bodyInput"
                name="body"
                value={message.body}
                onChange={handleChange}
              ></textarea>
              <input
                type="text"
                id="urlInput"
                placeholder="Image URL"
                name="imageUrl"
                value={message.imageUrl}
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
                messageDel={filterDeleted}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
