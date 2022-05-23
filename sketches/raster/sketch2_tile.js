// 
const ROWS = 15;
const COLS = 1;
const LENGTH = 20;
let upScale = 1;
let quadrille;
let row0, col0, row1, col1, row2, col2;
let img

function preload() {
  img = loadImage("https://i.ibb.co/z7cnzhw/happy-tile.jpg")
}
function setup() {
  createCanvas((img.width * upScale) * 2, img.height * upScale);
  loadImage("https://i.ibb.co/z7cnzhw/happy-tile.jpg", loadedImage => {
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
  subquadrille = createQuadrille(4 * 15, 4 * 15);
}

function draw() {
  drawQuadrille(subquadrille, { cellLength: ((img.width * upScale) / 15) / 4, outline: 'blue', board: true });
  drawQuadrille(quadrille, { cellLength: ((img.width * upScale) / 15), outline: 'green', board: true });
}


function getAliasedGraphics(img, scale) {
  // make a graphics layer to draw into
  let layer = createGraphics(img.width * scale, img.height * scale);
  // set drawing style
  layer.noStroke();
  layer.rectMode(CORNER);
  // cache some reusable properties
  let imageWidth = img.width;
  console.log(imageWidth)
  console.log(img.height)
  let pixels = img.pixels; 
  let arr = Array.from(pixels)
  //console.log(typeof(pixels))
  //console.log(arr)
  let numBytes = pixels.length;
  console.log(numBytes)
  console.log(img.pixels.BYTES_PER_ELEMENT)
  // remember in p5 pixels are R,G,B,A bytes, so skip every 4 bytes for 1 pixel
  // pixelIndex in this case is counting 1 pixel at time 
  
  // division por 4, (por los colores)
  var perChunk = 4
  arr = arr.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk)
  
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
  
    resultArray[chunkIndex].push(item)
  
    return resultArray
  }, [])
  console.log(arr)
  
  const newArr = [];

  // Aca se crea la matriz
  while(arr.length) newArr.push(arr.splice(0,img.width)); 
  console.log(newArr)

  list = [] 
  let c =0
  for (let i = 0; i < img.height; i += (1200/60)) {
      for(let j = 0; j < img.width; j += (1200/60)){
        let r = newArr[i][j][0];
        let g = newArr[i][j][1];
        let b = newArr[i][j][2];
        let a = newArr[i][j][3];
        list.push([r, g, b, a])
        console.log(r,g,b,a,i,j)
      }
  }
  console.log(list.length)
  var perChunk = 4
  var result = list.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk)
  
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
  
    resultArray[chunkIndex].push(item)
  
    return resultArray
  }, [])

  console.log(result)

  // Aca se crea la matriz
  dividePixels = []
  while(result.length) dividePixels.push(result.splice(0,15)); 
  
  console.log(dividePixels[0][0])
  let join_square =[] 
  let temp = []
  for(let i =0 ; i<15 ; i++){ 
    for(let j =0 ; j<4 ; j++){  
      console.log(j,i)
      temp.push(dividePixels[j][i])
      if(j%4==3){ 
        join_square.push(temp) 
        temp=[]
      }
    }
  }

  console.log(join_square)

}