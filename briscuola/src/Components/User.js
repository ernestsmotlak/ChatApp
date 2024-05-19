// Chat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3010');

const User = () => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [joinedRoom, setJoinedRoom] = useState(false);

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
      setJoinedRoom(true);
    }
  };

  const sendMessage = () => {
    if (message !== '') {
      socket.emit('send_message', { room, message });
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage('');
    }
  };

  return (
    <div>
      {!joinedRoom ? (
        <div>
          <input
            type="text"
            placeholder="Room ID"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <div>
          <div>
            {messages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send Message</button>
        </div>
      )}
    </div>
  );
};

export default User;
