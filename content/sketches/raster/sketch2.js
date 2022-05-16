// 
const ROWS = 15;
const COLS = 15;
const LENGTH = 20;
let upScale = 0.4;
let quadrille;
let row0, col0, row1, col1, row2, col2; 
let img

function preload(){ 
  img=loadImage("/visual_computing_page/sketches/happy.jpg")
}
function setup() {
  createCanvas((img.width * upScale)*2, img.height * upScale);
  loadImage("/visual_computing_page/sketches/happy.png", loadedImage => {
    // when the image is fully loaded
    img = loadedImage;
    // make pixels available
    img.loadPixels();
    // get the upscaled version 
    imgScaled = getAliasedGraphics(img, upScale);
    // render in p5 canvas
    background('#a8b8f8');  
    // blurred version
    image(img, 0, 0, img.width * upScale, img.height * upScale);
    // manually redrawn version
    image(imgScaled, img.width * upScale, 0, imgScaled.width, imgScaled.height);
    console.log(imgScaled);
  })

  quadrille = createQuadrille(15, 15); 
  subquadrille = createQuadrille(4*15,4*15);
}

function draw() {
  drawQuadrille(subquadrille, { cellLength: ((img.width * upScale)/15)/4, outline: 'blue', board: true });
  drawQuadrille(quadrille, { cellLength: ((img.width * upScale)/15), outline: 'green', board: true });
}


function getAliasedGraphics(img, scale){
    // make a graphics layer to draw into
    let layer = createGraphics(img.width * scale,img.height * scale);
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
    list = []
    for(let i = 0; i < numBytes/4; i+=(numBytes/4)/(60*60)){
      // get pixel colour
      let r = pixels[i*4];
      let g = pixels[i*4+1];
      let b = pixels[i*4+2];
      let a = pixels[i*4+3]; 

      list.push([r,g,b,a])

      // set it as the fill
      // layer.fill(r, g, b, a);
      // // get the x, y position
      // let x = pixelIndex % imageWidth;
      // let y = floor(pixelIndex / imageWidth);
      // // draw a rectangle for each pixel (offset and scaled up)
      // layer.rect(x * scale, y * scale, scale, scale);
      console.log(i)
    }
    console.log(list.length)
    return layer;
  }