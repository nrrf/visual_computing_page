/* Script completo Integrado con lo del profesor */ 

// Goal in the 3d Brush is double, to implement:
// 1. a gesture parser to deal with depth, i.e.,
// replace the depth slider with something really
// meaningful. You may use a 3d sensor hardware
// such as: https://en.wikipedia.org/wiki/Leap_Motion
// or machine learning software to parse hand (or
// body) gestures from a (video) / image, such as:
// https://ml5js.org/
// 2. other brushes to stylize the 3d brush, taking
// into account its shape and alpha channel, gesture
// speed, etc.

// Brush controls
let color_point;
let depth;
let brush;

let easycam;
let state;

let escorzo = true;
let points;
let record;

let handpose;
let video;
let hands = [];

let actual_position;

function setup() {
  createCanvas(600, 450, WEBGL);
  video = createCapture(VIDEO);
  //video.hide();
  video.size(100, 50);
  
  

  handpose = ml5.handpose(video, modelReady);

  // This sets up an evenwidth fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("hand", results => {
    hands = results;
  });
  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation: [0, 0, 0, 1],  // quaternion
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state

  // brush stuff
  points = [];
  depth = createSlider(0, 1, 0.05, 0.05);
  depth.position(10, 10);
  
  depth.style('width', '580px');
  color_point = color('#ed225d');
  
  // select initial brush
  brush = sphereBrush;
}
function modelReady() {
  console.log("Model ready!");
}
function draw() {
  video.position(10, 50);
  video.style('width','150px')
  update();
  background(0);
  
  

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  push();
  strokeWeight(0.8);
  stroke('magenta');
  grid({ dotted: false });
  pop();
  axes();
  for (const point of points) {
    push();
    translate(point.worldPosition);
    brush(point);
    pop();
  }
}

function update() {
  let dx = abs(mouseX - pmouseX);
  let dy = abs(mouseY - pmouseY);
  speed = constrain((dx + dy) / (2 * (width - height)), 0, 1);
  if (record) {
    points.push({
      worldPosition: treeLocation([actual_position[0], actual_position[1], depth.value()], { from: 'SCREEN', to: 'WORLD' }),
      color: color_point,
      speed: speed
    });
  }
}

function sphereBrush(point) {
  push();
  noStroke();
  // TODO parameterize sphere radius and / or
  // alpha channel according to gesture speed
  fill(color_point);
  sphere(1);
  pop();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  let reference_thumb;
  for (let i = 0; i < hands.length; i += 1) {
    const hand = hands[i];
    for (let j = 0; j < hand.landmarks.length; j += 1) { 
      if(j==4){
       reference_thumb =  hand.landmarks[j];
      }
      const keypoint = hand.landmarks[j];
      
      fill(0, 255, 0);

      if(j==8){ 
        actual_position = hand.landmarks[j];
                if(eulerDistance(actual_position,reference_thumb)<50){ 
                  color_point=color('#4378ab')
                fill(color_point)
                
                }
        else{
        color_point=color('#ed225d')
        fill(color_point)
        }
      }
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  } 
}

function keyPressed() {
  if (key === 'r') {
    record = !record;
  }
  if (key === 'p') {
    escorzo = !escorzo;
    escorzo ? perspective() : ortho();
  }
  if (key == 'c') {
    points = [];
  }
}

function eulerDistance(landmark1, landmark2){ 
 
  return Math.sqrt(Math.pow(landmark1[0]-landmark2[0],2)+Math.pow(landmark1[1]-landmark2[1],2)+Math.pow(landmark1[2]-landmark2[2],2))
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}