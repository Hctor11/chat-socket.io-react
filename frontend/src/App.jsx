import { useState, useEffect } from "react";
import "./App.css";
import "./Styles/App.css";
import io from "socket.io-client";

// establecemos la conexion con el servidor
const socket = io("/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      body: message,
      from: 'Me'  
    }
    setMessages([... messages, newMessage]);
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <div className="container">
          <h1 className="headline">Chat with React, NodeJS and Socket.IO</h1>

      <div className="chat">
      <ul 
        className="message-list">
        {messages.map((message, i) => (
          <li 
            key={i}
            className={`message ${message.from === 'Me' ? 'user' : 'external'}`}   
            >
          {message.from}: {message.body}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}
        className="form-chat">
        <input
          className="input-field"
          type="text"
          placeholder="Ingrese su mensaje..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-button">
          Enviar
        </button>
      </form>
      </div>
    </div>
  );
}

export default App;
