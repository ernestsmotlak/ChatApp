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
    socket.on('receive_message', (data) => {
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
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
      const data = {
        room: room,
        message: message,
        username: 'My Username',
        time: new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      }
      socket.emit('send_message', data);
      setSentMessages((prevMessages) => [...prevMessages, data]); // Update sentMessages array
      setMessage('');
    }
  };

  // Filter out messages sent by the current user from the received messages
  const filteredReceivedMessages = receivedMessages.filter(msg => !sentMessages.includes(msg));

  return (
    <div>
      {!joinedRoom ? (
        <div className='w-25 mt-5' style={{ margin: '0 auto' }}>
          <div className="card">
            <h5 className="card-header">Room</h5>
            <div className="card-body">
              <h5 className="card-title">Choose a room</h5>
              <p className="card-text">Choose the room that you prefer to join:</p>
              <input
                type="text"
                placeholder="Room ID"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className='fs-5 form-control'
              />
              <button className='ms-2 btn btn-success mt-2' onClick={joinRoom}>Join Room</button>
            </div>
            <div className="card-footer" style={{ height: '40px' }}>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <div className="card">
            <div className="card-header">
              <h5>Chat</h5>
            </div>
            <div className="card-body" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
              {receivedMessages.map((data, index) => (
                <div key={index} className="d-flex justify-content-start mb-2">
                  <div className="alert alert-secondary" role="alert">
                    {data.message}
                  </div><br/><br/>
                  {data.time}
                  {data.username}
                </div>
              ))}
              {sentMessages.map((data, index) => (
                <div key={index} className="d-flex justify-content-end mb-2">
                  <div className="alert alert-primary" role="alert">
                    {data.message}
                    </div><br/><br/>
                  {data.time}
                  {data.username}
                </div>
              ))}
            </div>
            <div className="card-footer">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="btn btn-primary" onClick={sendMessage}>Send Message</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
