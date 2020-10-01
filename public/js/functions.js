// add a stream to the DOM
export function addVideoStream(video, stream, target, audio) {
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
