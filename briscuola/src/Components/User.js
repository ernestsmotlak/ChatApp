import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3010');

const User = () => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [joinedRoom, setJoinedRoom] = useState(false);

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
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
      setSentMessages((prevMessages) => [...prevMessages, message]); // Update sentMessages array
      setMessage('');
    }
  };

  // Filter out messages sent by the current user from the received messages
  const filteredReceivedMessages = receivedMessages.filter(msg => !sentMessages.includes(msg));

  return (
    <div>
      {!joinedRoom ? (
        <div className='w-25 mt-5' style={{margin: '0 auto'}}>
          <div class="card">
            <h5 class="card-header">Room</h5>
            <div class="card-body">
              <h5 class="card-title">Choose a room </h5>
              <p class="card-text">Choose the room that you preffer to join:</p>
              <input
                type="text"
                placeholder="Room ID"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className='fs-5'
              />
              <button className='mb-1 ms-2 btn btn-success' onClick={joinRoom}>Join Room</button>
            </div>
            <div class="card-footer" style={{height: '40px'}}>
            </div>

          </div>
        </div>
      ) : (
        <div>
          <div>
            <h3>Received messages:</h3>
            {filteredReceivedMessages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>

          <br />

          <div>
            <h3>Sent messages:</h3>
            {sentMessages.map((msg, index) => (
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
