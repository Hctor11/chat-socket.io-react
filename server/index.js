import express from 'express'
import http from 'http'
import { Server as SocketServer} from 'socket.io';

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'HEAD', 'POTS']
    }
})

io.on('connection', socket => {
    console.log('cliente conectado');
})

server.listen(3000)
console.log('Server on port ', 3000);
