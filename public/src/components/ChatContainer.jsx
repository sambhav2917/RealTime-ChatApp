import React, { useState, useEffect, useRef } from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import "./ChatContainer.css";
import axios from "axios";
import { sendMessageRoute, getMessagesRoute } from "../utils/ApiRoutes";
import {v4 as uuidv4} from 'uuid';
export default function ChatContainer({ currentChat, CurrentUser,socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(getMessagesRoute, {
          params: {
            from: CurrentUser.id,
            to: currentChat._id,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    
    if (currentChat && CurrentUser) {
      fetchMessages();
    }
  }, [currentChat, CurrentUser]);

  const handleSendMessage = async (message) => {
    try {
      await axios.post(sendMessageRoute, {
        from: CurrentUser.id,
        to: currentChat._id,
        message,
      });
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: CurrentUser.id,
        message,
      })
      setMessages((prevMessages) => [...prevMessages, { fromSelf: true, message }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg.message });
      });
    }
  },[])

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
      console.log(messages);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container-container">
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
        <Logout />
      </div>

      <div className="message-section">
        {messages.map((message, index) => (
          <div
            className={`message ${message.fromSelf ? "sended" : "received"}`}
            key={index}
            ref={scrollRef}
          >
            <div className="content">
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <ChatInput handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
