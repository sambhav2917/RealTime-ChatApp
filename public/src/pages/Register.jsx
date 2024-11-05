import { useState } from "react";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterRoute } from "../utils/ApiRoutes";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const navigate = useNavigate();

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
      const response = await axios.post(RegisterRoute, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      const { data } = response;

      if (response.status === 500 || response.status === 409) {
        toast.error(data.message, toastOptions);
        return;
      }

      if (response.status === 201) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred", toastOptions);
    }
  };

  const handleValidation = () => {
    const { username, password, confirmPassword, email } = formData;
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
    if (email.trim() === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    if (email.length < 3 || !email.includes("@")) {
      toast.error("Please enter a valid email", toastOptions);
      return false;
    }
    if (password.trim() === "") {
      toast.error("Password is required", toastOptions);
      return false;
    }
    if (password.length < 6 || password.length > 15) {
      toast.error("Password must be between 6 and 15 characters", toastOptions);
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <div className="register-container">
      <div className="img-and-form-container">
        <div className="image-container">
          <img src="https://media.istockphoto.com/id/1262582481/vector/chat-messages-smartphone-sms-on-mobile-phone-screen-man-woman-couple-chatting-messaging.jpg?s=612x612&w=0&k=20&c=KrRgOU5QHAoTe9NJvfu0vhRFsHxbwQRPRNAmPh4ml6Q=" alt="Register" /> {/* Replace with your image path */}
        </div>
        <div className="form-container-register">
          <div className="logo">ChatApp</div>
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={formData.email}
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
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
            <div>
              <button type="submit">Register</button>
            </div>
            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
}
