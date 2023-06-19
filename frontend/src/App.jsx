import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

// establecemos la conexion con el servidor
const socket = io("/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, message]);
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
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese su mensaje..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default App;
