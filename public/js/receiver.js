// peer config
const peer = new Peer(ROOM_ID, {
  host: PEER_HOST,
  port: PEER_PORT,
  secure: true,
});

const cinema = document.getElementById('cinema');

// answer call from sender
peer.on('call', (call) => {
  // only allow one connection
  for (const conn in peer.connections) {
    if (peer.connections[conn].length > 1) {
      peer.connections[conn].shift();
    }
  }

  call.answer();

  const myVideo = document.createElement('video');

  call.on('stream', (stream) => {
    stream.getVideoTracks().forEach((track) => {
      if ('contentHint' in track) {
        track.contentHint = 'text';
      }
    });
    addVideoStream(myVideo, stream);
  });
});

// add a stream to the DOM
function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.muted = false;
    video.play();
  });
  if (cinema.childNodes.length === 0) {
    cinema.appendChild(video);
  } else {
    cinema.innerHTML = '';
    cinema.appendChild(video);
  }
}
