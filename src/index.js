import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors';

// El Fecth para el servicio de SoldAI

import Message from './controllers/chatController';
import Disconnect from './controllers/chatController';


const options={
  cors:true,
  origins:["http://localhost:3000"],
 }

const app = express()

const httpServer = http.Server(app)
const io = socketio(httpServer,options)
const onConnection = (socket)=>{
  console.log('A user connected');
  Message(io, socket);
  Disconnect(io,socket);
}

io.on('connection',onConnection);


httpServer.listen(process.env.PORT || 3000, function(){
    console.log('listening on *:3001');
 });