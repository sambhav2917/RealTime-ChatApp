import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import userRouter from './routers/userRoutes.js';
import apiRouter from './routers/apiRoutes.js';
import messageRouter from './routers/messagesRoute.js';
import { on } from 'events';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// CORS configuration
const corsOptions = {
    origin:  process.env.NODE_ENV === 'production' ? 'https://real-time-chat-app-beta-lilac.vercel.app/' : 'http://localhost:5173',
    credentials: true, // Allow credentials (cookies)
};
console.log( process.env.NODE_ENV === 'production')
// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', userRouter);
app.use('/proxy', apiRouter);
app.use('/api/message', messageRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.log(error);
});

// Socket.io setup
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    }
});

global.onlineUser= new Map();

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    global.chatSocket = socket;

    // Add user to online users map
    socket.on('add-user', (userId) => {
        onlineUser.set(userId, socket.id);
        console.log(`User added: ${userId}, Socket ID: ${socket.id}`);
    });
    
    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUser.get(data.to);
        console.log('Message sent:', data); // Log the sent message
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-receive', {
                message: data.message
            });
            console.log(`Message sent to ${data.to}: ${data.message}`);
        } else {
            console.log(`User ${data.to} is not online`);
        }
    });
    

    // Handle disconnection
    
    socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    // Remove user from onlineUser map
    onlineUser.forEach((value, key) => {
        if (value === socket.id) {
            onlineUser.delete(key);
        }
    });
});

});


// Start server
const Port = process.env.PORT || 5000;
httpServer.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
