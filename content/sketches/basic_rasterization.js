// Tomado de: https://editor.p5js.org/george.profenza/sketches/3nLBvI_vA

let img;
let imgScaled;
let upScale = 10;

function setup() {
  createCanvas(380, 320);
  loadImage("/visual_computing_page/sketches/mario.png", loadedImage => {
    // when the image is fully loaded
    img = loadedImage;
    // make pixels available
    img.loadPixels();
    // get the upscaled version 
    imgScaled = getAliasedGraphics(img, upScale);
    // render in p5 canvas
    background('#a8b8f8');  
    // blurred version
    image(img, 20, 20, img.width * upScale, img.height * upScale);
    // manually redrawn version
    image(imgScaled, 200, 20);
    console.log(imgScaled);
  })

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