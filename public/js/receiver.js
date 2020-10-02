import { addVideoStream, mediaConstraints } from './functions.js';

// peer config
const peer = new Peer(ROOM_ID, {
  host: PEER_HOST,
  port: PEER_PORT,
  secure: true,
});

const cinema = document.getElementById('cinema');

// get receiver stream
let localStream = null;
const returnStream = async () => {
  localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
};

returnStream();

// answer call from sender
peer.on('call', (call) => {
  // only allow one connection
  for (const conn in peer.connections) {
    if (peer.connections[conn].length > 1) {
      peer.connections[conn].shift();
    }
  }

  call.answer(localStream);

  const myVideo = document.createElement('video');

  call.on('stream', (stream) => {
    stream.getVideoTracks().forEach((track) => {
      if ('contentHint' in track) {
        track.contentHint = 'text';
      }
    });
    addVideoStream(myVideo, stream, cinema, false);
  });
});
