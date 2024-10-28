import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/setavatar' element={<SetAvatar />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  );
}

export default App;

