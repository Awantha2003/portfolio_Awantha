import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('🔌 Connected:', socket.id);

  socket.on('call-request', () => {
    console.log('📞 Customer called — relaying to admin');
    socket.broadcast.emit('call-request');
  });

  socket.on('offer', (data) => {
    console.log('📤 Admin sent offer');
    socket.broadcast.emit('offer', data);
  });

  socket.on('answer', (data) => {
    console.log('✅ Customer sent answer');
    socket.broadcast.emit('answer', data);
  });

  socket.on('ice-candidate', (data) => {
    console.log('🧊 ICE candidate shared');
    socket.broadcast.emit('ice-candidate', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected:', socket.id);
  });
});

httpServer.listen(5001, () => {
  console.log('🚀 Socket server running at http://localhost:5001');
});
