# Rasterization 

Dentro del ámbito se han estudiado varios algoritmos de representación y técnicas para la obtención de imágenes, ya que analizar una partícula de luz en un espacio considerablemente grande no es práctico ni eficiente, y por eso se debe realizar un muestreo de manera inteligente para producir una imagen.

Una de las técnicas utilizadas para lograr tal eficiencia es la rasterización (raster con significado en cine y televisión, refiriéndose a un tubo catódico que permite visualizar imágenes mediante un haz de rayos catódicos) que toma la imagen descrita por gráficos vectoriales (formas geométricas dependientes) y la convierte en un conjunto de pixeles que a su vez se utilizan para salidas digitales. Se suele utilizar para dos momentos en específico; cuando se trabaja con imágenes de gran complejidad o cuando se van a aplicar filtros sobre la imagen resultante.

Una representación común en los modelos digitales 3D es el poligonal, pero antes de que sean rasterizados, esos polígonos deben dividirse en triángulos, de manera que primero se debe definir la rasterización de un triángulo. Se requiere primeramente que la rasterización de dos triángulos adyacentes, que son aquellos que comparten una arista, no dejen espacios vacíos entre los triángulos (pixeles no rasterizados) para que el área de los triángulos adyacentes y superficie rasterizada esté llena por completo, sin necesidad de superponer los triángulos.

Esto lleva a establecer reglas de rasterización para garantizar las condiciones anteriores. Un conjunto de tales reglas se denomina regla superior izquierda, que establece que un píxel se rasteriza si y sólo si su centro se encuentra completamente dentro del triángulo. O su centro se encuentra exactamente en el borde del triángulo (o múltiples bordes en el caso de las esquinas) que es (o, en el caso de las esquinas, todos son) el borde superior o el izquierdo.

# Renderizado de software (Software Rendering)

¿Qué es? Proceso que utiliza un software específico (comunes en diferentes áreas; cine, videojuegos, arquitectura, efectos en películas, simulaciones, entre otros) para tener como resultado una imagen a partir de un modelo.  

Este tipo de renderizado puede dividirse en dos tipos; uno en tiempo real y el otro previamente renderizado, el primero utilizado por lo general para videojuegos en donde se requiere que se vaya actualizando a medida que se vaya jugando, esperando respuestas en milisegundos, mientras que un renderizado fuera de línea puede verse aplicada en imágenes, películas en que se requieren escenas realistas y que usualmente se demoran en dar el resultado final, por ejemplo en películas animadas en donde conjuga una serie de elementos como la apariencia final de los elementos, texturas, sombras, enfoque de movimiento, efectos, y en general todo el proceso de animación.
En la CPU suele renderizarse íntegramente los modelos ya que tiene la ventaja de que no está restringida a la capacidad de los gráficos, que de por sí son limitados, aunque cabe resaltar que se necesitan más semiconductores para alcanzar un buen rendimiento.

![aliasing](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Software_renderer_embedded.gif/220px-Software_renderer_embedded.gif)  

Procesador de software ejecutándose en un dispositivo sin GPU.

## Estado del arte

Aplicaciones

Dentro de las aplicaciones con renderizado en tiempo real se pueden hallar sobre todo videojuegos, uno de los primeros fue Descent que permitía modelos en 3D todo con base en lo que repasamos de rasterización triangular, los cuales convertía en mapas de bits, como otros tantos juegos de la época que utilizaron esta misma representación y que por ende se aumentaron las ventas en ciertos componentes de cómputo (tarjetas gráficas) y también el aprovechamiento del uso de API’s como OpenGL. Luego en juegos arcade y en los mismos mercados de consolas de videojuegos se orientó modelos 3D mucho más avanzados y con las llegada de 16 bits en consolas se aceleraron muchos procesos con el uso de cartuchos RISC.
A partir de esto, ha crecido constantemente el rendimiento de cómputo para poder renderizar sobre hardware de gráficos y que nuevas tecnologías de renderizado de software sigan promoviendo nuevos procesos como la compilación dinámica, que optimiza y mejora el rendimiento. 
Con respecto al renderizado fuera de línea, podemos encontrar sobre todo ejemplos en la industria cinematográfica para la creación de escenas realistas y personajes generados por computadora. Pixar sentó un precedente con la película Toy Story, también con Buscando a Nemo, y debido a todos los detalles que confluyen el renderizado sin conexión brinda la posibilidad de manejar la diversidad de efectos como se maneja, apoyándose en la flexibilidad permite sombreadores de longitud, y alto realismo como el trazado de rayos e iluminación global, dentro de las producciones de objetos con movimiento que requieren procesadores de propósito general de la más alta calidad.
Se cree además que el crecimiento va a ser tan inmensurable que CPU y GPU convergerán de alguna manera u otra haciendo que la línea entre software y hardware desaparezca.

# Aliasing and Anti alising in Computer Graphics 

## What is Aliasing  

En gráficos por computadora, el proceso por el cual las curvas suaves y otras líneas se vuelven irregulares (jagged) debido a que la resolución del dispositivo de gráficos del archivo no es lo suficientemente alta para representar una curva suave.


En los algoritmos de dibujo de líneas, hemos visto que todas las ubicaciones rasterizadas no coinciden con la línea verdadera y tenemos que seleccionar las ubicaciones de raster óptimas para representar una línea recta. Este problema es grave en pantallas de baja resolución. En tales pantallas, la línea aparece como un escalón.

## Anti aliasing and methods  
Anti aliasing es una tecnica usada en computación grafica para remover el efecto de Aliasing  

![aliasing](https://1.bp.blogspot.com/-8L8gpE1m_mc/YVqjUrSTrpI/AAAAAAAAYDc/ljnZk2aogCcUWmXpc12HVw2awK4J3gdvQCLcBGAsYHQ/s0/ANTIALIASING.gif) 

Los metodos principales de anti-aliasing: 

- SSAA (Super Sample Anti Aliasing): SSAA es una manera muy efectiva de combatir el Aliasing, y fue la primera que estuvo disponible. No obstante ya no se utiliza demasiado porque tiene un alto impacto en el rendimiento, ya que lo que hace es obligar a la GPU a renderizar los juegos a mayor resolución de la que se muestra y luego generar una imagen a la resolución de salida del monitor
- MSAA (Multi Sampling Anti Aliasing): MSAA es uno de los modos más comunes, pero tan solo es capaz de suavizar polígonos, aunque a cambio tiene un menor impacto en el rendimiento. Su forma de combatir el Aliasing se hace mediante el renderizado de más frames de la cuenta, sacando muestras y combinando ambos. Hay diferentes niveles de intensidad, por lo que podréis ver que existen opciones como 2xMSAA, 4xMSAA y 8xMSAA.
- CSAA (Coverage Sampling Anti Aliasing) y EQAA (Enhanced Quality Anti Aliasing): CSAA fue desarrollado por NVIDIA, mientras que EQAA es su equivalente para gráficas AMD. Ambos funcionan igual que MSAA pero optimizados para sus respectivas gráficas, por lo que tienen un menor impacto en el rendimiento.
- FXAA (Fast Approximate Anti Aliasing): este modo se considera el de menor grado, ya que es el que menos se nota su efecto y el que menor impacto tiene en el rendimiento, por lo que es el modo recomendado para PCs de gama baja o que vayan «justos» en los juegos. No hace mal su trabajo a la hora de mitigar los bordes de sierra, pero tiene un defecto y es que a veces produce que las imágenes se vean algo borrosas.
- TXAA (Temporal Anti Aliasing): TXAA utiliza algo más de recursos de la GPU que FXAA, pero combina diferentes técnicas de las anteriores para conseguir unos bordes más suaves y mitigar más el Aliasing. No obstante, tampoco es perfecto y también causa a veces que las imágenes se vean algo borrosas.

Vamos a ahondar en lo que es el segundo metodo: 

### Post filtering (Supersampling) 

Vamos a ver a traves de un ejercicio, la nocion basica bajo la que funciona este tipo de antialiasing 

![anti-aliasing](https://hardzone.es/app/uploads-hardzone.es/2020/04/Circulo-aliasing-e1630688967301.png) 

### Código 
{{< expand "Code" "...">}}
```tpl
let upScale = 0.4;
let quadrille; 
let subquadrille; 
let DIVIDE_QUADRILLE=15
let DIVIDE_SUBQUADRILLE=4
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
```
{{< /expand >}}

### Imagen Original a analizar
<!-- {{< p5-iframe sketch="/visual_computing_page/sketches/basic_rasterization.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js" width="725" height="725" >}} -->

<!-- {{< p5-iframe sketch="/visual_computing_page/sketches/raster/sketch.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js" width="725" height="725" >}} -->

<!-- {{< p5-iframe sketch="/visual_computing_page/sketches/raster/sketch_example_3.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js" width="725" height="725" >}} -->

<!-- {{< p5-iframe sketch="/visual_computing_page/sketches/raster/sketch3.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js" width="725" height="725" >}} -->

![happy](/visual_computing_page/sketches/happy.jpg)

### Imagen Original a escala 0.4, division de 15, subdivision de 4
{{< p5-iframe sketch="/visual_computing_page/sketches/raster/sketch2_1.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js" width="525" height="525" >}} 

### Imagen Original a escala 0.4, division de 5, subdivision de 5
{{< p5-iframe sketch="/visual_computing_page/sketches/raster/sketch2_2.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js" width="525" height="525" >}} 

### Imagen Original a escala 0.4, division de 40, subdivision de 10
{{< p5-iframe sketch="/visual_computing_page/sketches/raster/sketch2_3.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js" width="525" height="525" >}} 

<!-- {{< p5-iframe sketch="/visual_computing_page/sketches/raster/sketch2_tile.js" lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js" width="725" height="725" >}} --> 

### Fuentes  
[1] https://www.youtube.com/watch?v=Ahg6tWA1Qzo 

[2] https://hardzone.es/reportajes/que-es/anti-aliasing-juegos/

[3] https://en-m-wikipedia-org.translate.goog/wiki/Software_rendering?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=sc