import React, { ChangeEvent, useState, useEffect } from 'react';
import './App.css';
import

  function App() {

    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([{ id: 1, name: "Dima", photo: "https://via.placeholder.com/50", message: "yoyoyo" }]);

    useEffect(() => {
const ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    });

    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.currentTarget.value)
    }

    let sendMessage = () => {
      alert('hey!!!')
    }

    return (
      <div className="App">

        <div className="chat">
          <div className="messages"></div>
          {users.map(u =>
            <div className="message">
              <img src={u.photo} />
              <b>{u.name}</b>
              <span>{u.message}</span>
            </div>
          )}


        </div>
        <div className="footer">
          <textarea onChange={onMessageChange}>{message}</textarea>
          <button onClick={sendMessage}> Send </button>
        </div>

      </div>
    );
  }

export default App;