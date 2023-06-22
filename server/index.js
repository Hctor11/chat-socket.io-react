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
    console.log(socket.id);

    // preparando a nuestro socket para que escuche eventos
    socket.on('message', body => {
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(0,4)
        })
    })
})

server.listen(3000)
console.log('Server on port ', 3000);
