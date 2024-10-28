import { useState } from "react";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginRoute } from "../utils/ApiRoutes";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const navigate = useNavigate(); // Fix: call useNavigate hook to get navigate function

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleValidation()) return;

    try {
      // Send the registration request and check response status directly
      const response = await axios.post(LoginRoute, {
        username: formData.username,
        password: formData.password,
      });

      const { data } = response; // Access the response data

      // Check response status instead of data.status
      if (response.status >= 400) {
        toast.error(data.message, toastOptions);
        return;
      }

      if (response.status >= 200  && response.status < 300) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/"); // Redirect after successful registration
      }
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
    }
   
  };

  const handleValidation = () => {
    const { username, password } = formData;
    if (username.trim() === "") {
      toast.error("Username is required", toastOptions);
      return false;
    }
    if (username.length < 3) {
      toast.error("Username must be greater than 3 characters", toastOptions);
      return false;
    }
    if (username.length > 15) {
      toast.error("Username must be less than 15 characters", toastOptions);
      return false;
    }
   
    if (password.trim() === "") {
      toast.error("Password is required", toastOptions);
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be greater than 6 characters", toastOptions);
      return false;
    }
    if (password.length > 15) {
      toast.error("Password must be less than 15 characters", toastOptions);
      return false;
    }

    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="logo">logo</div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={formData.username}
        />
      </div>
     
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={formData.password}
        />
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
      <span>
        Don't have an account? <Link to="/register">Register</Link>
      </span>
      <ToastContainer />
    </form>
  );
}
