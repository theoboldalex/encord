// peer config
const peer = new Peer(undefined, {
  host: PEER_HOST,
  port: PEER_PORT,
  secure: true,
});

const videoStream = document.getElementById('video-stream');
const screenStream = document.getElementById('screen-stream');

videoStream.addEventListener('click', videoCall);
screenStream.addEventListener('click', screenCall);

function videoCall() {
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    if (!peer.connections[URL_ID]) {
      const call = peer.call(URL_ID, stream);

      call.on('error', (err) => {
        console.log(err);
      });
    } else {
      peer.connections[URL_ID].pop();
      const call = peer.call(URL_ID, stream);

      call.on('error', (err) => {
        console.log(err);
      });
    }
  });
}

function screenCall() {
  navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
    if (!peer.connections[URL_ID]) {
      const call = peer.call(URL_ID, stream);

      call.on('error', (err) => {
        console.log(err);
      });
    } else {
      peer.connections[URL_ID].pop();
      const call = peer.call(URL_ID, stream);

      call.on('error', (err) => {
        console.log(err);
      });
    }
  });
}
