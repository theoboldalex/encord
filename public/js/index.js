// peer config
const peer = new Peer(undefined, {
  host: PEER_HOST,
  port: PEER_PORT,
  secure: true,
});

const videoStream = document.getElementById('video-stream');
videoStream.addEventListener('click', videoCall);

function videoCall() {
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    const call = peer.call(URL_ID, stream);
    call.on('error', (err) => {
      console.log(err);
    });
  });
}
