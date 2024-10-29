import "./Chat.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AllUsersRoute } from "../utils/ApiRoutes";
import Contact from "./Contact";

export default function Chat() {
    const navigate = useNavigate();
    const [contracts, setContracts] = useState([]);
    const [CurrentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            console.log("User not logged in");
            navigate("/login");
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
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
            <h1>contracts</h1>
                <Contact contacts={contracts} />
              
            </div>
            <div className="chat-main-container">
                <h2>Chat</h2>
                {/* Add chat messages and input here */}
            </div>
        </div>
    );
}
