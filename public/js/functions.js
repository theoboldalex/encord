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

 
// mute outgoing audio stream
export function muteAudio(stream) {
	stream.getAudioTracks()[0].enabled = false;
}

export const mediaConstraints = {
  audio: true,
  video: true,
};
