import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';
import Home from './pages/Home';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/setavatar' element={<SetAvatar />} />
      
    </Routes>
  );
}

export default App;

