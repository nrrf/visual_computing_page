let upScale = 0.4;
let quadrille; 
let subquadrille; 
let DIVIDE_QUADRILLE=40
let DIVIDE_SUBQUADRILLE=10
let img

function preload() {
  img = loadImage("/visual_computing_page/sketches/happy.jpg")
  
}
function setup() {
  createCanvas((img.width * upScale) , img.height * upScale);
  loadImage("/visual_computing_page/sketches/happy.jpg", loadedImage => {
    // when the image is fully loaded
    img = loadedImage;
    // make pixels available
    img.loadPixels();

    background('#a8b8f8');
    // blurred version
    //image(img, 0, 0, img.width * upScale, img.height * upScale);
  })

  quadrille = createQuadrille(DIVIDE_QUADRILLE, DIVIDE_QUADRILLE); 
  subquadrille = createQuadrille(DIVIDE_SUBQUADRILLE * DIVIDE_QUADRILLE, DIVIDE_SUBQUADRILLE * DIVIDE_QUADRILLE);
}

function draw() {
  
  background(img);
  drawQuadrille(subquadrille, { cellLength: ((img.width * upScale) / DIVIDE_QUADRILLE) / DIVIDE_SUBQUADRILLE, outline: 'blue', board: true });
  drawQuadrille(quadrille, { cellLength: ((img.width * upScale) / DIVIDE_QUADRILLE), outline: 'green', board: true });
  //getAliasedGraphics(img)
}

function keyPressed() {
  

 
  if (key === 'c') {
    
    quadrille.clear();
    
  }
  if (key === 't') {
    
    
    getAliasedGraphics(img)
  }
  
}


function getAliasedGraphics(img) {
 
  let imageWidth = img.width;
  //console.log(imageWidth)
  //console.log(img.height)
  let pixels = img.pixels; 
  let arr = Array.from(pixels)
  //console.log(typeof(pixels))
  //console.log(arr)
  let numBytes = pixels.length;
  //console.log(numBytes)
  //console.log(img.pixels.BYTES_PER_ELEMENT)
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

  // Aca se crea la matriz original de pixeles cada uno con un arreglo de 4 representado los colores
  while(arr.length) newArr.push(arr.splice(0,img.width)); 
  //console.log(newArr)

  // Ahora vamos a dividir la matriz tomando muestras de cada una de subcuadrillas en la esquina superior izquierda
  list = [] 
  let c =0
  for (let i = 0; i < img.height; i += Math.floor((img.width/(DIVIDE_QUADRILLE*DIVIDE_SUBQUADRILLE)))) {
      for(let j = 0; j < img.width; j += Math.floor((img.width/(DIVIDE_QUADRILLE*DIVIDE_SUBQUADRILLE)))){
        let r = newArr[i][j][0];
        let g = newArr[i][j][1];
        let b = newArr[i][j][2];
        let a = newArr[i][j][3];
        list.push([r, g, b, a])
        //console.log(r,g,b,a,i,j)
      }
  }
  console.log(list.length)

  // debido a que a priori sabemos que se tienen 4 de estas subcuadriculas por fila para completar la cuadrilla, lsa dividimos
  var perChunk = DIVIDE_SUBQUADRILLE
  var result = list.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk)
  
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
  
    resultArray[chunkIndex].push(item)
  
    return resultArray
  }, [])

  console.log(result)

  // Ahora habiendo completado cada una de las filas de subcuadrillas para completar una cuadrilla, creamos una matriz con respecto a el ancho de la imagen 
  // Aca se crea la matriz
  dividePixels = []
  while(result.length) dividePixels.push(result.splice(0,DIVIDE_QUADRILLE)); 
  
  console.log(dividePixels.length)
  let join_square =[] 
  let temp = []
  for(let i =0 ; i< DIVIDE_QUADRILLE; i++){ 
    for(let j =0 ; j<dividePixels.length ; j++){  
      console.log(j,i)
      temp.push(dividePixels[j][i])
      if(j%DIVIDE_SUBQUADRILLE==DIVIDE_SUBQUADRILLE-1){ 
        // completemos cada una de las subcuadrillas dentro de una cuadrilla para luego sacar el promedio
        join_square.push(temp) 
        temp=[]
      }
    }
  }

  divide_join=[]
  while(join_square.length) divide_join.push(join_square.splice(0,DIVIDE_QUADRILLE)); 

  for(let i =0 ; i< DIVIDE_QUADRILLE ; i++){ 
    for(let j =0 ; j< DIVIDE_QUADRILLE ; j++){  
      let r=0
      let g=0
      let b=0
      let a=0
      for(let k =0 ; k<DIVIDE_SUBQUADRILLE ; k++){ 
        for(let l=0 ; l<DIVIDE_SUBQUADRILLE ; l++){  
          r += divide_join[i][j][k][l][0]
          g += divide_join[i][j][k][l][1]
          b +=divide_join[i][j][k][l][2]
          a += divide_join[i][j][k][l][3]
          
        }
      } 
      r = r/(DIVIDE_SUBQUADRILLE*DIVIDE_SUBQUADRILLE);
      g = g/(DIVIDE_SUBQUADRILLE*DIVIDE_SUBQUADRILLE);
      b = b/(DIVIDE_SUBQUADRILLE*DIVIDE_SUBQUADRILLE);
      a = a/(DIVIDE_SUBQUADRILLE*DIVIDE_SUBQUADRILLE); 
      
      quadrille.fill(j, i, color(r,g,b,a)); 
    }
  }
}