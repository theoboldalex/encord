import { addVideoStream, mediaConstraints } from './functions.js';

// peer config
const sender = new Peer(undefined, {
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

  navigator.mediaDevices
    .getUserMedia(mediaConstraints)
    .then((stream) => {
      // check for existing connections
      if (!sender.connections[URL_ID]) {
        const call = sender.call(URL_ID, stream);

        // TODO: Better error handling needed
        call.on('error', (err) => {
          console.log(err);
        });

        // get remote user's stream and display
        call.on('stream', (remoteStream) => {
          addVideoStream(myStream, remoteStream, mirrorStream, false);
        });
      } else {
        // if connections exist, kill them before new connection made
        sender.connections[URL_ID].pop();
        const call = sender.call(URL_ID, stream);

        // TODO: Better error handling needed
        call.on('error', (err) => {
          console.log(err);
        });

        // get remote user's stream and display
        call.on('stream', (remoteStream) => {
          addVideoStream(myStream, remoteStream, mirrorStream, false);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function screenCall() {
  /*
   * TODO: mix microphone audio track with display video track
   *
   * **currently only capturing system audio track**
   *
   *  refer to the following link for implementation details;
   *
   *  https://github.com/w3c/mediacapture-main/issues/694
   */

  const myStream = document.createElement('video');

  let audioTrack, videoTrack, stream;

  navigator.mediaDevices
    .getDisplayMedia(mediaConstraints)
    .then(async (displayStream) => {
      [videoTrack] = displayStream.getVideoTracks();
      const audioStream = await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .catch((e) => {
          throw e;
        });
      [audioTrack] = audioStream.getAudioTracks();

      stream = new MediaStream([videoTrack, audioTrack]);

      // check for existing connections
      if (!sender.connections[URL_ID]) {
        const call = sender.call(URL_ID, stream);

        // TODO: Better error handling needed
        call.on('error', (err) => {
          console.log(err);
        });

        // get remote user's stream and display
        call.on('stream', (remoteStream) => {
          addVideoStream(myStream, remoteStream, mirrorStream, false);
        });
      } else {
        // if connections exist, kill them before new connection made
        sender.connections[URL_ID].pop();
        const call = sender.call(URL_ID, stream);

        // TODO: Better error handling needed
        call.on('error', (err) => {
          console.log(err);
        });

        // get remote user's stream and display
        call.on('stream', (remoteStream) => {
          addVideoStream(myStream, remoteStream, mirrorStream, false);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
