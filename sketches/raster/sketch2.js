// 
const ROWS = 20;
const COLS = 20;
const LENGTH = 20;
let upScale = 0.4;
let quadrille;
let row0, col0, row1, col1, row2, col2; 
let img

function preload(){ 
  img=loadImage("/visual_computing_page/sketches/happy.png")
}
function setup() {
  
  createCanvas(img.width * upScale, img.height * upScale);
  image(img, 0, 0, img.width * upScale, img.height * upScale);
  img.loadPixels();
  quadrille = createQuadrille(20, 20);
  //randomize();
  // highlevel call:
  quadrille.colorizeTriangle(row0, col0, row1, col1, row2, col2, [0, 0, 0,0], [0, 0, 0,0], [0, 0, 0,0]);
  //quadrille.colorizeTriangle(row0, col0, row1, col1, row2, col2, 'red', 'green', 'blue');
  //quadrille.colorize('red', 'green', 'blue', 'cyan');
}

function draw() {
  background('rgba(0,0,0, 0)');
  drawQuadrille(quadrille, { cellLength: ((img.width * upScale)/20), outline: 'green', board: true });
  tri();
}

function tri() {
  push();
  stroke('cyan');
  strokeWeight(3);
  noFill();
  triangle(col0 * ((img.width * upScale)/20) + ((img.width * upScale)/20) / 2, row0 * ((img.width * upScale)/20) + ((img.width * upScale)/20) / 2, col1 * ((img.width * upScale)/20) + ((img.width * upScale)/20) / 2, row1 * ((img.width * upScale)/20) + ((img.width * upScale)/20) / 2, col2 * ((img.width * upScale)/20) + ((img.width * upScale)/20) / 2, row2 * ((img.width * upScale)/20) + ((img.width * upScale)/20) / 2);
  pop();
}

function keyPressed() {
  randomize();
  quadrille.clear();
  if (key === 'r') {
    // low level call:
    // [r, g, b, x, y]: rgb -> color components; x, y -> 2d normal
    quadrille.rasterizeTriangle(row0, col0, row1, col1, row2, col2, colorize_shader, [255, 0, 0, 7, 4], [0, 255, 0, -1, -10], [0, 0, 255, 5, 8]);
  }
  if (key === 's') {
    quadrille.rasterize(colorize_shader, [255, 0, 0, 7, 4], [0, 255, 0, -1, -10], [0, 0, 255, 5, 8], [255, 255, 0, -1, -10]);
  }
  /*
  if (key === 't') {
    quadrille.clear(5, 5);
    quadrille.fill(6, 6, color('cyan'));
  }
  */
}

// pretty similar to what p5.Quadrille.colorizeTriangle does
function colorize_shader({ pattern: mixin }) {
  let rgb = mixin.slice(0, 3);
  // debug 2d normal
  console.log(mixin.slice(3));
  // use interpolated color as is
  return color(rgb);
}

function randomize() {
  col0 = int(random(0, COLS));
  row0 = int(random(0, ROWS));
  col1 = int(random(0, COLS));
  row1 = int(random(0, ROWS));
  col2 = int(random(0, COLS));
  row2 = int(random(0, ROWS));
}

function getAliasedGraphics(img, scale){
    // make a graphics layer to draw into
    let layer = createGraphics(img.width * Math.ceil(scale), img.height * Math.ceil(scale));
    // set drawing style
    layer.noStroke();
    layer.rectMode(CORNER);
    // cache some reusable properties
    let imageWidth = img.width;
    console.log(imageWidth) 
    console.log(img.height)
    let pixels = img.pixels;
    console.log(pixels)
    let numBytes = pixels.length; 
    console.log(numBytes)
    console.log(img.pixels.BYTES_PER_ELEMENT)
    // remember in p5 pixels are R,G,B,A bytes, so skip every 4 bytes for 1 pixel
    // pixelIndex in this case is counting 1 pixel at time
    for(let i = 0, pixelIndex = 0; i < numBytes; i+= 4, pixelIndex++){
      // get pixel colour
      let r = pixels[i];
      let g = pixels[i+1];
      let b = pixels[i+2];
      let a = pixels[i+3]
      // set it as the fill
      layer.fill(r, g, b, a);
      // get the x, y position
      let x = pixelIndex % imageWidth;
      let y = floor(pixelIndex / imageWidth);
      // draw a rectangle for each pixel (offset and scaled up)
      layer.rect(x * scale, y * scale, scale, scale);
    }
    return layer;
  }