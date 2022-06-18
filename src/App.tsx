import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import './App.css';


type MessageType = {
  message: string,
  photo: string,
  userId: number,
  userName: string
}

function App() {

  let messagesBlockRef = useRef(null);

  const [messageText, setMessageText] = useState("");
  const [ws, setWS] = useState<null | WebSocket>(null);
  const [users, setUsers] = useState<MessageType[]>([]);

  if (ws) {
    ws.onmessage = (messageEvent: MessageEvent) => {
      let messages = JSON.parse(messageEvent.data)
      setUsers([...users, ...messages]);
      //@ts-ignore
      messagesBlockRef.current.scrollTo(0, messagesBlockRef.current.scrollHeight);
    };
  }

  useEffect(() => {
    let localWS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    setWS(localWS)
  }, []);

  let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.currentTarget.value)
  };

  let sendMessage = () => {
    ws && ws.send(messageText)
    setMessageText("");
  };

  return (
    <div className="App">

      <div className="chat">
        <div className="messages" ref={messagesBlockRef}>
          {users.map((u, index) =>
            <div className="message" key={index}>
              <img src={u.photo} />
              <b>{u.userName}</b>
              <span>{u.message}</span>
            </div>
          )}
        </div>
      </div>

      <div className="footer">
        <textarea onChange={onMessageChange} value={messageText}/>
        <button onClick={sendMessage}> Send </button>
      </div>

    </div>
  );
}

export default App;