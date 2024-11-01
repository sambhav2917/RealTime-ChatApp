import { useEffect, useState } from "react";
import "./Contact.css";

export default function Contact({ contacts, CurrentUser, handleChatchange }) {
  const [currentUserName, setCurrentUserName] = useState(undefined); // Corrected variable name
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (CurrentUser) {
      setCurrentUserImage(CurrentUser.avatarImage);
      setCurrentUserName(CurrentUser.username);
    }
  }, [CurrentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChatchange(contact);
  };

  return (
    <>
     
      <div className="container">
        <div className="contacts-list">
          {contacts.map((contact, index) => (
            <div
              className={`contact ${
                index === currentSelected ? "selected" : ""
              }`}
              key={index}
              onClick={() => changeCurrentChat(index, contact)} // Optional: Select contact on click
            >
              <img
                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                alt="Avatar"
              />
              <h3>{contact.username}</h3>
            </div>
          ))}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="Avatar"
            />
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
