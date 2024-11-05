import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SetAvatarRoute } from "../utils/ApiRoutes";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import "./SetAvatar.css";
import Loading from "../components/Loading";

export default function SetAvatar() {
    const api = "http://api.multiavatar.com/456";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };

    const setProfilePicture = async() => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            console.log("Avatar selected:", selectedAvatar);
           
            // Additional logic for setting profile picture
            const user=JSON.parse(localStorage.getItem("chat-app-user"));
            console.log("User:", user.id);
            const { data } = await axios.post(`${SetAvatarRoute}/${user.id}`, {
                image: avatars[selectedAvatar],
            });
           
            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/chat");
            }else{
                toast.error("Error setting profile picture", toastOptions);
            }
           
        }
    };

    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];
            for (let index = 0; index < 4; index++) {
                const imageurl = `https://realtime-chatapp-j1r8.onrender.com/proxy/${Math.round(Math.random() * 1000)}`;
                const image = await axios.get(imageurl, { responseType: 'arraybuffer' });
                const buffer = Buffer.from(image.data, 'binary');
                data.push(buffer.toString('base64'));
            }
    
            setAvatars(data);
            setIsLoading(false);
        };
    
        fetchAvatars();
    }, []);
    

    return (
        <>
            {isLoading ? (
              Loading()
            ) : (
                <div className="avatar-container">
                    <div className="title-container">
                        <h1>Pick an avatar for yourself</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => (
                            <div
                                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                                key={index}
                                onClick={() => setSelectedAvatar(index)}
                            >
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
                            </div>
                        ))}
                    </div>
                    <button onClick={setProfilePicture} className="avatar-button">Set as Profile Picture</button>
                </div>
            )}
            <ToastContainer />
        </>
    );
}
