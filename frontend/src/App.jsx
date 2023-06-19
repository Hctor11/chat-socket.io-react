import './App.css'
import io from 'socket.io-client'

const socket = io("http://localhost:3000")

function App() {

  return (
    <div className="container">
      <h1>Hola cliente</h1>
    </div>
  )
}

export default App
