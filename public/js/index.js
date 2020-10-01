// peer config
const peer = new Peer(undefined, {
  host: PEER_HOST,
  port: PEER_PORT,
  secure: true,
});

const videoStream = document.getElementById('video-stream');
const screenStream = document.getElementById('screen-stream');
const mirrorStream = document.getElementById('mirror-stream');

videoStream.addEventListener('click', videoCall);
screenStream.addEventListener('click', screenCall);

function videoCall() {
  const myStream = document.createElement('video');

  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    if (!peer.connections[URL_ID]) {
      const call = peer.call(URL_ID, stream);

      call.on('error', (err) => {
        console.log(err);
      });

      addVideoStream(myStream, stream);
    } else {
      peer.connections[URL_ID].pop();
      const call = peer.call(URL_ID, stream);

      call.on('error', (err) => {
        console.log(err);
      });

      addVideoStream(myStream, stream);
    }
  });
}

function screenCall() {
  const myStream = document.createElement('video');

  navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
    if (!peer.connections[URL_ID]) {
      const call = peer.call(URL_ID, stream);

      call.on('error', (err) => {
        console.log(err);
      });

      addVideoStream(myStream, stream);
    } else {
      peer.connections[URL_ID].pop();
      const call = peer.call(URL_ID, stream);

      call.on('error', (err) => {
        console.log(err);
      });

      addVideoStream(myStream, stream);
    }
  });
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.muted = true;
    video.play();
  });
  if (mirrorStream.childNodes.length === 0) {
    mirrorStream.appendChild(video);
  } else {
    mirrorStream.innerHTML = '';
    mirrorStream.appendChild(video);
  }
}
