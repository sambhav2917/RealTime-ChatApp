import "./Chat.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AllUsersRoute } from "../utils/ApiRoutes";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

export default function Chat() {
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
        const fetchContracts = async () => {
            
                if (!CurrentUser) {return;}
                try {
                    const { data } = await axios.get(`${AllUsersRoute}/${CurrentUser.id}`);
                    setContracts(data);
                    console.log(data);
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
                        ? <ChatContainer  currentChat={currentChat} />
                        : <Welcome user={CurrentUser} />
                }
            </div>
        </div>
    );
}
