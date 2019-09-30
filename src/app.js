import Express from 'express';
import socket from 'socket.io';

const app = Express();
// Set PORT
app.set('port', 4040);

const server = app.listen(app.get('port'), () => {
  console.log(`Server is running on ${app.get('port')}`);
});

// Root route greeting message
app.get('/', (req, res) => {
  res.send('Welcome to Socket.IO demo!');
});

// Setup Socket on express app
const io = socket(server);

// Authenticating socket connection
io.use((stream, next) => {
  console.log(`Query: ${stream.handshake.query}`);
  // return the result of next() to accept the connection.
  if (stream.handshake.query.token === 'anx') {
    return next();
  }
  // call next() with an Error if you need to reject the connection.
  return next(new Error('Authentication error'));
});

// Create socket connection
io.on('connect', (client) => {
  console.log(`Client ${client.id} has been connected!`);

  client.on('message', (data) => {
    console.log(data);

    client.emit('message', {
      response: `You sent: ${JSON.stringify(data)}`,
    });
  });

  client.on('disconnect', () => {
    console.log(`Client ${client.id} has been disconnected!`);
  });
});
