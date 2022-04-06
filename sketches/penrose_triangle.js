//penrose_triangle.js

let sf = 1; // scaleFactor
let locked = true;
function setup() {
  sliderx = createSlider(0, 10, 10, 0.1);
  sliderx.position(30, 30);

  slidery = createSlider(0, 10, 3.6, 0.1);
  slidery.position(30, 55);

  sliderz = createSlider(0, 10, 8.1, 0.1);
  sliderz.position(30, 80);

  createCanvas(700, 700, WEBGL);
  fill(237, 34, 93);

  cuboid1 = new Cuboid(0, 180, 0, 30, 0, 30);
  cuboid2 = new Cuboid(0, 30, 0, 30, 180);
  cuboid3 = new Cuboid(0, 30, 0, 120, 150, 30);
}

function draw() {
  scale(sf);
  background(200);
  rotateX(sliderx.value());
  rotateY(slidery.value());
  rotateZ(sliderz.value());

  // first cuboid 
  cuboid1.draw()
  //second cuboid
  cuboid2.draw()
  //third cuboid
  cuboid3.draw()

}

class Cuboid {
  constructor(x, w, y, h, z, d) {
    this.x = x
    this.w = w
    this.y = y
    this.h = h
    this.z = z
    this.d = d
  }

  draw() {
    
    beginShape();

    vertex(this.x, this.y, this.z);
    vertex(this.x + this.w, this.y, this.z);
    vertex(this.x + this.w, this.y + this.h, this.z);
    vertex(this.x, this.y + this.h, this.z);
    endShape(CLOSE);

    beginShape();
    vertex(this.x, this.y, this.z + this.d);
    vertex(this.x + this.w, this.y, this.z + this.d);
    vertex(this.x + this.w, this.y + this.h, this.z + this.d);
    vertex(this.x, this.y + this.h, this.z + this.d);
    endShape(CLOSE);

    beginShape();
    vertex(this.x + this.w, this.y, this.z);
    vertex(this.x, this.y, this.z);
    vertex(this.x, this.y, this.z + this.d);
    vertex(this.x + this.w, this.y, this.z + this.d);
    endShape(CLOSE);

    beginShape();
    vertex(this.x, this.y + this.h, this.z);
    vertex(this.x + this.w, this.y + this.h, this.z);
    vertex(this.x + this.w, this.y + this.h, this.z + this.d);
    vertex(this.x, this.y + this.h, this.z + this.d);
    endShape(CLOSE);

    beginShape();
    vertex(this.x, this.y, this.z);
    vertex(this.x, this.y, this.z + this.d);
    vertex(this.x, this.y + this.h, this.z + this.d);
    vertex(this.x, this.y + this.h, this.z);
    endShape(CLOSE);

    beginShape();
    vertex(this.x + this.w, this.y, this.z);
    vertex(this.x + this.w, this.y, this.z + this.d);
    vertex(this.x + this.w, this.y + this.h, this.z + this.d);
    vertex(this.x + this.w, this.y + this.h, this.z);
    endShape(CLOSE);
  }
}

function mousePressed() {
  locked = false
}

function mouseClicked() {
  //console.log('Released')
  locked = true
}

function mouseWheel(event) {
  if (locked != true) {
    if (event.deltaY < 0)
      sf *= 1.05;
    else
      sf *= 0.95;
  }
}