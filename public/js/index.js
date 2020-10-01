// peer config
const sender = new Peer(undefined, {
  host: PEER_HOST,
  port: PEER_PORT,
  secure: true,
});

const videoStream = document.getElementById('video-stream');
const screenStream = document.getElementById('screen-stream');
const audioStream = document.getElementById('audio-stream');
const mirrorStream = document.getElementById('mirror-stream');
const audioEnabled = true;

videoStream.addEventListener('click', videoCall);
screenStream.addEventListener('click', screenCall);

function videoCall() {
  const myStream = document.createElement('video');

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: audioEnabled })
    .then((stream) => {
      if (!sender.connections[URL_ID]) {
        const call = sender.call(URL_ID, stream);

        call.on('error', (err) => {
          console.log(err);
        });

        addVideoStream(myStream, stream, mirrorStream, true);
      } else {
        sender.connections[URL_ID].pop();
        const call = sender.call(URL_ID, stream);

        call.on('error', (err) => {
          console.log(err);
        });

        addVideoStream(myStream, stream, mirrorStream, true);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function screenCall() {
  const myStream = document.createElement('video');

  navigator.mediaDevices
    .getDisplayMedia({ video: true })
    .then((stream) => {
      if (!sender.connections[URL_ID]) {
        const call = sender.call(URL_ID, stream);

        call.on('error', (err) => {
          console.log(err);
        });

        addVideoStream(myStream, stream, mirrorStream, true);
      } else {
        sender.connections[URL_ID].pop();
        const call = sender.call(URL_ID, stream);

        call.on('error', (err) => {
          console.log(err);
        });

        addVideoStream(myStream, stream, mirrorStream, true);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function addVideoStream(video, stream, target, audio) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.muted = audio;
    video.play();
  });
  if (target.childNodes.length === 0) {
    target.appendChild(video);
  } else {
    target.innerHTML = '';
    target.appendChild(video);
  }
}
