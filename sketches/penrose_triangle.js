// cubo.js  
// Para ejecutar en https://editor.p5js.org/

let slider;


function setup() {
  sliderx = createSlider(0, 10, 10,0.1);
  sliderx.position(30, 30);
 
  slidery = createSlider(0, 10, 3.6, 0.1);
  slidery.position(30, 55);
 
  sliderz = createSlider(0, 10, 8.1, 0.1);
  sliderz.position(30, 80);
 
    createCanvas(700, 700, WEBGL);
    fill(237, 34, 93);

    //strokeWeight(3);
}

function draw() {
  background(200);
  rotateX(sliderx.value());
  rotateY(slidery.value());
  rotateZ(sliderz.value());

 
  // first cube
  beginShape();
  vertex(0, 0, 0);
  vertex(180, 0, 0);
  vertex(180, 30, 0);
  vertex(0, 30, 0);
  endShape(CLOSE);
 
  beginShape();
  vertex(0, 0, 30);
  vertex(180, 0, 30);
  vertex(180, 30, 30);
  vertex(0, 30, 30);
  endShape(CLOSE);
 
  beginShape();
  vertex(180, 0, 0);
  vertex(0, 0, 0);
  vertex(0, 0, 30);
  vertex(180, 0, 30);
  endShape(CLOSE);
 
  beginShape();
  vertex(0, 30, 0);
  vertex(180, 30, 0);
  vertex(180, 30, 30);
  vertex(0, 30, 30);
  endShape(CLOSE);
 
  beginShape();
  vertex(0, 0, 0);
  vertex(0, 0, 30);
  vertex(0, 30, 30);
  vertex(0, 30, 0);
  endShape(CLOSE);
 
  beginShape();
  vertex(180, 0, 0);
  vertex(180, 0, 30);
  vertex(180, 30, 30);
  vertex(180, 30, 0);
  endShape(CLOSE);

  // second cube
 
  beginShape();
  vertex(0, 0, 0);
  vertex(0, 0, 180);
  vertex(0, 30, 180);
  vertex(0, 30, 0);
  endShape(CLOSE);
 
  beginShape();
  vertex(30, 0, 0);
  vertex(30, 0, 180);
  vertex(30, 30, 180);
  vertex(30, 30, 0);
  endShape(CLOSE);
 
  beginShape();
  vertex(0, 0, 180);
  vertex(0, 0, 0);
  vertex(30, 0, 0);
  vertex(30, 0, 180);
  endShape(CLOSE);
 
  beginShape();
  vertex(0, 30, 0);
  vertex(0, 30, 180);
  vertex(30, 30, 180);
  vertex(30, 30, 0);
  endShape(CLOSE);
 
  beginShape();
  vertex(0, 0, 0);
  vertex(30, 0, 0);
  vertex(30, 30, 0);
  vertex(0, 30, 0);
  endShape(CLOSE);
 
  beginShape();
  vertex(0, 0, 180);
  vertex(30, 0, 180);
  vertex(30, 30, 180);
  vertex(0, 30, 180);
  endShape(CLOSE);
 
  //third cube  
  beginShape();
  vertex(0, 0, 180);
  vertex(0, 0, 150);
  vertex(30, 0, 150);
  vertex(30, 0, 180);
  endShape(CLOSE);
 
  beginShape();
  vertex(0, 120, 180);
  vertex(0, 120, 150);
  vertex(30, 120, 150);
  vertex(30, 120, 180);
  endShape(CLOSE);
 
  beginShape();
  vertex(0, 0, 180);
  vertex(0, 0, 150);
  vertex(0, 120, 150);
  vertex(0, 120, 180);
  endShape(CLOSE);
 
  beginShape();
  vertex(30, 0, 180);
  vertex(30, 0, 150);
  vertex(30, 120, 150);
  vertex(30, 120, 180);
  endShape(CLOSE);
 
  beginShape();
  vertex(0, 0, 180);
  vertex(0, 120, 180);
  vertex(30, 120, 180);
  vertex(30, 0, 180);
  endShape(CLOSE);
 
  beginShape();
  vertex(0, 0, 150);
  vertex(0, 120, 150);
  vertex(30, 120, 150);
  vertex(30, 0, 150);
  endShape(CLOSE);
 
  beginShape();
  vertex(0, 120, 180);
  vertex(0, 105, 150);
  vertex(30, 105, 150);
  vertex(30, 120, 180);
  endShape(CLOSE);

}

