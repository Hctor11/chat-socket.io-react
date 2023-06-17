import express from 'express'
import { Server as SocketServer } from 'socket.io';

const app = express()

app.listen(3000)
console.log('Server on port ', 3000);
