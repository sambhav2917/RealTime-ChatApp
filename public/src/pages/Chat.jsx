import "./Chat.css";
import { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AllUsersRoute ,host} from "../utils/ApiRoutes";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from 'socket.io-client';

export default function Chat() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contracts, setContracts] = useState([]);
    const [CurrentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);

    const [isLoading, setIsLoading] = useState(true);
    const handleChatchange=(chat)=>{
        setCurrentChat(chat);
    }
    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            console.log("User not logged in");
            navigate("/login");
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (CurrentUser) {
            socket.current = io(host);

            // Emit the add-user event when connected
            socket.current.on('connect', () => {
                console.log('Socket connected:', socket.current.id);
                socket.current.emit("add-user", CurrentUser.id);
            });
        }
    }, [CurrentUser]);

    useEffect(() => {
        const fetchContracts = async () => {
            
                if (!CurrentUser) {return;}
                try {
                    const { data } = await axios.get(`${AllUsersRoute}/${CurrentUser.id}`);
                    setContracts(data);
                   
                } catch (error) {
                    console.error("Failed to fetch contracts:", error);
                }
            
        };

        fetchContracts();
    }, [CurrentUser]);

    return (
        <div className="chat-container">
            <div className="chat-contact-container">
           
                <Contact contacts={contracts}  CurrentUser={CurrentUser} handleChatchange={handleChatchange}/>
              
            </div>
            <div className="chat-main-container">
                {
                   !isLoading && currentChat
                        ? <ChatContainer  currentChat={currentChat}  CurrentUser={CurrentUser}  socket={socket}/>
                        : <Welcome user={CurrentUser} />
                }
            </div>
        </div>
    );
}
