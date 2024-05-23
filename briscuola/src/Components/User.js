import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import "bootstrap-icons/font/bootstrap-icons.css"

const socket = io('http://localhost:3010', {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10000,
  randomizationFactor: 0.5,
  pingInterval: 25000, // Send a ping every 25 seconds
  pingTimeout: 60000 // Close the connection if no response is received within 60 seconds
});

const User = () => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [joinedRoom, setJoinedRoom] = useState(false);
  const username = 'My Username'; // Replace with dynamic username if needed
  const messageContainerRef = useRef(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('reconnect', (attemptNumber) => {
      console.log(`Reconnected to server after ${attemptNumber} attempts`);
      if (joinedRoom && room) {
        socket.emit('join_room', room);
      }
    });

    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`Reconnection attempt ${attemptNumber}`);
    });

    socket.on('reconnect_error', (error) => {
      console.error('Reconnection error:', error);
    });

    socket.on('reconnect_failed', () => {
      console.error('Reconnection failed');
    });

    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, { ...data, isSent: false }]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('reconnect');
      socket.off('reconnect_attempt');
      socket.off('reconnect_error');
      socket.off('reconnect_failed');
      socket.off('receive_message');
    };
  }, [joinedRoom, room]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
      setJoinedRoom(true);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      const cleanedMessage = message
        .split('\n')
        .filter(line => line.trim() !== '')
        .join('\n');

      const data = {
        room,
        message: cleanedMessage,
        username,
        time: new Date().toISOString(),
      };
      socket.emit('send_message', data);
      setMessages((prevMessages) => [...prevMessages, { ...data, isSent: true }]);
      setMessage('');
    }
  };

  const sortedMessages = messages.sort((a, b) => new Date(a.time) - new Date(b.time));

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
            <div className="card-footer" style={{ height: '40px' }} />
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          <div className="card">
            <div className="card-header">
              <h5>Chat</h5>
            </div>
            <div className="card-body" style={{ maxHeight: '420px', overflowY: 'scroll', scrollBehavior: 'smooth' }} ref={messageContainerRef}>
              {sortedMessages.map((data, index) => (
                <div
                  key={index}
                  className={`d-flex ${data.isSent ? 'justify-content-end me-2' : 'justify-content-start'} mb-2`}
                >
                  <div>
                    <div className="row">
                      <div className="col">
                        <div className={`alert text-start ${data.isSent ? 'alert-success ms-5' : 'alert-danger'} mb-1 mt-2`} role="alert">
                          {data.message.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className={`${data.isSent ? 'text-end me-3' : 'text-start ms-3'} mb-1 mt-2`}>
                          <small>{new Date(data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - <strong>{data.username}</strong></small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <div className="input-group">
                <textarea
                  className="form-control"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="3" // You can adjust the number of rows as needed
                />
                <button className="btn btn-primary" onClick={sendMessage}>Send Message</button>
              </div>
            </div>
          </div>

          <div
            className="text-center p-3 fixed-bottom border border-secondary" style={{ backgroundColor: '#e5e5e5' }}>
            Code available at:

            <a class="text-dark" href="https://github.com/ernestsmotlak/WarCardGame">
              <i class="bi bi-github"></i>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
