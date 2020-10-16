const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const serveStatic = require('serve-static');

app.set('port', process.env.PORT || 3000);
app.use(serveStatic(`${__dirname}/public`));

let connects = [];
app.ws('/', (ws, req) => {
  connects.push(ws);

  ws.on('message', (message) => {
    console.log(message);
    const payload = JSON.parse(message);
    console.log(payload);

    switch (payload.action) {
      case 'send-emote':
        showEmote(connects, payload.params);
        break;
      case 'send-text':
        showText(connects, payload.params);
        break;
    }
  });

  ws.on('close', () => {
    connects = connects.filter(conn => {
      return (conn === ws) ? false : true;
    });
  });
});

function showEmote(connects, params) {
  const payload = {
    action: 'show-emote',
    params: params
  };
  connects.forEach(socket => {
    socket.send(JSON.stringify(payload));
  });
}

function showText(connects, params) {
  const payload = {
    action: 'show-text',
    params: params
  };
  connects.forEach(socket => {
    socket.send(JSON.stringify(payload));
  });
}

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'));
});