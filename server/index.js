import express from 'express'
import http from 'http'
import { Server as SocketServer} from 'socket.io';

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    // con el CORS permitimos que solo puedan ingresar datos desde el cliente
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'HEAD', 'POTS']
    }
})

io.on('connection', socket => {
    console.log('cliente conectado');

    // preparando a nuestro socket para que escuche eventos
    socket.on('message', data => {
        socket.broadcast.emit('message', data)
    })
})

server.listen(3000)
console.log('Server on port ', 3000);
