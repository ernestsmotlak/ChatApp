import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3010');

const User = () => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [joinedRoom, setJoinedRoom] = useState(false);
  const username = 'My Username'; // Replace with dynamic username if needed

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, { ...data, isSent: false }]);
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
        room,
        message,
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
        <div className="container mt-5">
          <div className="card">
            <div className="card-header">
              <h5>Chat</h5>
            </div>
            <div className="card-body" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
              {sortedMessages.map((data, index) => (
                <div
                  key={index}
                  className={`d-flex ${data.isSent ? 'justify-content-end' : 'justify-content-start'} mb-2`}
                >

                  <div>
                    <div class="row">
                      <div class="col">
                        <div className={`alert ${data.isSent ? 'alert-success' : 'alert-danger'} mb-1 mt-2`} role="alert">
                          {data.message}

                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div className="message-details">
                          <small>{new Date(data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - <strong>{data.username}</strong> </small>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* <div className={`alert ${data.isSent ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {data.message}

                  </div>
                  <div className="message-details">
                    <small>{new Date(data.time).toLocaleTimeString()} - {data.username}</small>
                  </div> */}
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
