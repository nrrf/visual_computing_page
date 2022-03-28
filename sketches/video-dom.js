let vid;
function setup() {
  noCanvas();

  vid = createVideo(
    ['/visual_computing_page/sketches/fingers.mov', '/visual_computing_page/sketches/fingers.webm'],
    vidLoad
  );

  vid.size(320, 240);
}

// This function is called when the video loads
function vidLoad() {
  vid.loop();
  vid.volume(0);
}