import React from "react";
import Logout from "./Logout";


export default function ChatContainer({ currentChat }) {
  return (
    <>
    
    <div className="chat-header">
      <div className="user-details">
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt="avatar"
          />
        </div>
        <div className="username">
          <h3>{currentChat.username}</h3>
        </div>
      </div>
    </div>
    <Logout/>
    <div className="chat-messages"></div>
    <div className="chat-input"></div>
    </>
  );
}
