# Shaders

Ejemplo de shader en figura geometrica, simplemente se cambio el objeto y la imagen, [Creación Original](https://aferriss.github.io/p5jsShaderExamples/6_3d/6-4_matcap/)

{{< p5-iframe sketch="/visual_computing_page/sketches/shaders/matcap.js"  lib1="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js" width="425" height="425" >}}

## Que es y Funcionamiento: 
Se entiende como shader a un script especifico con lenguaje GLSL o HLSL en la que las instrucciones del script se comunican y se ejecutan directamente en la placa de video sin pasar por el procesador . Esta ejecución directo en la placa de video es la que nos permite ahorrarnos el problema de la memoria y el procesador de la computadora a la hora de procesar esa información grafica (asi es como existen intros 4kb alucinantes y super realistas que pesan tan poco). Esto también conlleva una limitación que es que los scripts de shaders solo pueden recibir información de variables externas (uniforms), pero esa información solo puede salir en formato de textura, es decir, es imposible utilizar un shader para asignar el valor de un float,bool,int o cualquier tipo de dato primitivo y que eso salga del alcance del shader. Las salidas de los shaders siempre son en texturas(información de imagen). Tomado de mmtt.com.arg 

## Tipos de shaders  

- Fragment shader : este tipo de shader fue creado originalmente para manejar el color de las texturas que se aplican a los objetos 3D, pero dada su dinamismo a la hora de procesar los pixeles se inventaron tecnicas como RayMarching que permiten simular luces, y escenarios 3D super realistas solamente utilizando codigo. 

- Vertex Shader : Los vertex shaders son utilizados para procesar información de los vertices de una figura. Es decir, lo puntos que conectan con otros puntos que hace que se genere un triangulo, y mediante muchos de esos triangulos es como se componen los modelos 3D. Los vertex shader permiten modificar la posicion de estos puntos de vertices.


- Compute shader : Los compute shaders son shaders utilizados para computar una gran cantidad de datos utilizando la tecnologia propia de los shaders. Esto sirve por ejemplo para hacer sistemas de particulas con millones y millones de particulas. A esta tecnica se la conoce como GPU INSTANCING.

- Tomado de mmtt.com.arg 

Estructura general con la que funcionan el vertex y fragment shader: 

![ImgShaders](https://images.squarespace-cdn.com/content/v1/54851541e4b0fb60932ad015/1454038074178-VX57RNGV25UR9185Z0KW/image-asset.jpeg)

## CODE - Two colors interpolated with patterns in p5js

{{< expand "Sketch Code" "...">}}
```tpl
let uvShader;

let parDef = {
    time: 1,
    Save: function () {
        save('frag_texture.png');
    },
    };

function preload() {
  // Define geometry directly in clip space (i.e., matrices: Tree.NONE).
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/visual_computing_page/sketches/shader_basic_frag.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
    let gui = new dat.GUI();
    gui.add(parDef, 'time'  , 0, 2, 0.25 ).listen();
    gui.add(parDef, 'Save').name("Save png");
    
  // shaders require WEBGL mode to work
  createCanvas(400, 400, WEBGL); 
  color1= createColorPicker(color(0,255,255));
  //console.log(color1.color().levels)
  color1.position(0,0)
  color1_n = color1.color().levels.map(function(item) { return item/255 }); 
  print(color1_n)
  color2= createColorPicker(color(0,255,0));
  color2.position(0,20)
  noStroke();
  resetShader();
  shader(uvShader);
}

function draw() {
  background(0);
  // see: https://p5js.org/reference/#/p5/shader
  
  // https://p5js.org/reference/#/p5/textureMode
  // best and simplest is to just always used NORMAL 
   uvShader.setUniform('resolution', [width, height]);
   uvShader.setUniform('mouse', map(mouseX, 0, width, 0, 7));
   uvShader.setUniform('time', frameCount * 0.01*parDef.time); 
   uvShader.setUniform('c1', normalizecolor(color1)); 
   uvShader.setUniform('c2', normalizecolor(color2)); 
   
  textureMode(NORMAL);
  
  // clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  // https://p5js.org/reference/#/p5/quad
  // It's worth noting (not mentioned in the api docs) that the quad
  // command also adds the texture coordinates to each of its vertices.
  quad(-1,-1,1,-1,1,1,-1,1);
}

function normalizecolor(color){ 
    return color.color().levels.map(function(item) { return item/255 }); 
}
```
{{< /expand >}}

{{< expand "Fragment Shader" "...">}}
```tpl

precision highp float;



uniform float time;  
uniform vec2 resolution; 
uniform vec2 mouse;  
uniform vec4 c1;
uniform vec4 c2;

#define pi 3.1416 

float def(vec2 uv, float f){
 const int cant =20; 
 float e =0.;
 for(int i=0 ; i<cant ; i++){
 //definimos un punto que va a estar en el centro 
 vec2 p = vec2(0.5,float(i)/float(cant))-uv; 
 
 // radio
 float rad = length(p);
 // angulo  
 float angulo = atan(p.x,p.y); 
 e += sin(rad*20.+f+time);
 e+=sin(e*pi)*0.2;
 }
 e/=float(cant)/4.;
 
 return abs(e);
}

void main(void){

 //Variable contiene el eje de coordenadas
 vec2 uv = gl_FragCoord.xy / resolution;  

 // Variable de forma
 float e = def(uv,0.); 
 float e2 =def(uv,pi/6.);
 float e3 = abs(e2);
 
 // Variable final
 vec4 fin = vec4(e)*c1*c1.a+vec4(e2)*c2*c2.a;
 
 // Variable final donde toma el color el shader
 gl_FragColor = fin;
}

```
{{< /expand >}}

{{< p5-iframe sketch="/visual_computing_page/sketches/shaders/basic_frag.js"  lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js" lib2="https://www.dynamicmath.xyz/calculus/3d-curves/knotTorus/libraries/dat.gui.min.js" width="425" height="425" >}} 

## CODE - Three Colors interpolated with patterns in p5js  

{{< expand "Sketch Code" "...">}}
```tpl
let uvShader;

let parDef = {
    time: 1,
    Save: function () {
        save('frag_texture.png');
    },
    };

function preload() {
  // Define geometry directly in clip space (i.e., matrices: Tree.NONE).
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/visual_computing_page/sketches/three_interpolated.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
    let gui = new dat.GUI();
    gui.add(parDef, 'time'  , 0, 2, 0.25 ).listen();
    gui.add(parDef, 'Save').name("Save png");
    
  // shaders require WEBGL mode to work
  createCanvas(400, 400, WEBGL); 
  color1= createColorPicker(color(0,255,255));
  //console.log(color1.color().levels)
  color1.position(0,0)
  color1_n = color1.color().levels.map(function(item) { return item/255 }); 
  //print(color1_n)
  color2= createColorPicker(color(0,255,0));
  color2.position(0,20)
  color3= createColorPicker(color(255,255,0));
  color3.position(0,40)
  noStroke();
  resetShader();
  shader(uvShader);
}

function draw() {
  background(0);
  // see: https://p5js.org/reference/#/p5/shader
  
  // https://p5js.org/reference/#/p5/textureMode
  // best and simplest is to just always used NORMAL 
   uvShader.setUniform('resolution', [width, height]);
   uvShader.setUniform('mouse', map(mouseX, 0, width, 0, 7));
   uvShader.setUniform('time', frameCount * 0.01*parDef.time); 
   uvShader.setUniform('c1', normalizecolor(color1)); 
   uvShader.setUniform('c2', normalizecolor(color2)); 
   uvShader.setUniform('c3', normalizecolor(color3)); 
   
  textureMode(NORMAL);
  
  // clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  // https://p5js.org/reference/#/p5/quad
  // It's worth noting (not mentioned in the api docs) that the quad
  // command also adds the texture coordinates to each of its vertices.
  quad(-1,-1,1,-1,1,1,-1,1);
}

function normalizecolor(color){ 
    return color.color().levels.map(function(item) { return item/255 }); 
}
```
{{< /expand >}}

{{< expand "Fragment Shader" "...">}}
```tpl
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;  
uniform vec2 resolution; 
uniform vec2 mouse;  
uniform vec4 c1;
uniform vec4 c2; 
uniform vec4 c3;

#define pi 3.1416 

float def(vec2 uv, float f){
 const int cant =30; 
 float e =0.;
 for(int i=0 ; i<cant ; i++){
 //definimos un punto que va a estar en el centro 
 vec2 p = vec2(float(i),float(i)/float(cant))-uv; 
 
 // radio
 float rad = length(p);
 // angulo  
 float angulo = atan(p.x,p.y); 
 e += sin(rad*20.+f+time);
 e+=sin(e*pi)*0.2;
 }
 e/=float(cant)/4.;
 
 return abs(e);
}

void main(void){

 //Variable contiene el eje de coordenadas
 vec2 uv = gl_FragCoord.xy / resolution;  

 // Variable de forma
 float e = def(uv,0.); 
 float e2 =def(uv,pi/6.);
 float e3 = abs(e2+e);
 
 // Variable final
 vec4 fin = vec4(e)*c1*c1.a+vec4(e2)*c2*c2.a+vec4(e3)*c3*c3.a;
 
 // Variable final donde toma el color el shader
 gl_FragColor = fin;
}

```
{{< /expand >}}

{{< p5-iframe sketch="/visual_computing_page/sketches/shaders/three_interpolated.js"  lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js" lib2="https://www.dynamicmath.xyz/calculus/3d-curves/knotTorus/libraries/dat.gui.min.js" width="425" height="425" >}}   

## CODE - Texture sampling 

{{< expand "Sketch Code" "...">}}
```tpl
let lumaShader;
let img;
let grey_scale;

function preload() {
  lumaShader = readShader('/visual_computing_page/sketches/texture_sampling.frag', { varyings: Tree.texcoords2 });
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage('/visual_computing_page/sketches/fire_breathing.jpg');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  sel = createSelect(); 
  sel.position(10, 10);
  sel.option('none');
  sel.option('rgb split');
  sel.option('luma');
  sel.option('hsl');
  sel.option('hsv');
  sel.option('diffuse');
  sel.option('average');
  sel.selected('none');
  lumaShader.setUniform('resolution', [width, height]);
  lumaShader.setUniform('texture', img);
  sel.changed(mySelectEvent)
} 

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}

function mySelectEvent(){  
    if(sel.value() == 'luma'){
        lumaShader.setUniform('grey_scale', 1)
    }else if(sel.value() == 'hsl'){
        lumaShader.setUniform('grey_scale', 2)
    }else if(sel.value()=='hsv'){
        lumaShader.setUniform('grey_scale', 3)
    }else if(sel.value()=='diffuse'){
        lumaShader.setUniform('grey_scale', 4)
    }else if(sel.value()=='average'){
        lumaShader.setUniform('grey_scale', 5)
    }else if(sel.value()=='rgb split'){
        lumaShader.setUniform('grey_scale', 6)
    }
    else{ 
        lumaShader.setUniform('grey_scale', 0)
    }
}
```
{{< /expand >}}

{{< expand "Fragment Shader" "...">}}
```tpl
precision mediump float;

// uniforms are defined and sent by the sketch
uniform int grey_scale;
uniform sampler2D texture;
uniform vec2 resolution; 

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

// returns hsl of given texel
float hsl(vec3 texel) {
  return max(max(texel.r, texel.g), texel.b)/2.0 + min(min(texel.r, texel.g), texel.b)/2.0;
}

// returns hsv of given texel
float hsv(vec3 texel) {
  return max(max(texel.r, texel.g), texel.b);
}

// returns difuse of given texel
float color_difuse(vec3 texel, float gray, float res, float scl) {
  float threshR = (fract(floor(texel.r*res)/scl)*scl) * gray ;
  float threshG = (fract(floor(texel.g*res)/scl)*scl) * gray ;
  float threshB = (fract(floor(texel.b*res)/scl)*scl) * gray ;
  return (threshR+threshG,threshB)/3.0;
}
// returns average of given texel
float average(vec3 texel){
  return (texel.r + texel.g + texel.b)/3.0; 
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);

  float gray = average(texel.rgb); 
  float res = 20.0;
  float scl = res/(10.0);

  vec2 uv = texcoords2;
  // the texture is loaded upside down and backwards by default so lets flip it
  //uv = 1.0 - uv;

  // lets figure out how big a pixel is on our screen
  // we can do this by diving 1 by the width and height of our sketch
  vec2 pixelSize = vec2(1.0) / resolution;

  // this variable will be used to offset the color channels
  // try changing the 10.0 here to see a bigger or smaller change
  vec2 offset = pixelSize * 10.0;

  // make a vec4 for each color channel (rgb)
  // on the red and blue channels, we will move the texture coordinates just a little
  vec4 rTex = texture2D(texture, uv - offset);
  vec4 gTex = texture2D(texture, uv);
  vec4 bTex = texture2D(texture, uv + offset);

  if(grey_scale==1) gl_FragColor = vec4((vec3(luma(texel.rgb))), 1.0);
  else if(grey_scale==2) gl_FragColor = vec4((vec3(hsl(texel.rgb))), 1.0);
  else if(grey_scale==3) gl_FragColor = vec4((vec3(hsv(texel.rgb))), 1.0);
  else if(grey_scale==4) gl_FragColor = vec4((vec3(color_difuse(texel.rgb,gray,res,scl))), 1.0);
  else if(grey_scale==5) gl_FragColor = vec4((vec3(gray)), 1.0);
  else if(grey_scale==6) gl_FragColor = vec4(rTex.r, gTex.g, bTex.b, 1.0);
  else gl_FragColor = texel;
    
}
```
{{< /expand >}}

{{< p5-iframe sketch="/visual_computing_page/sketches/shaders/texture_sampling.js"  lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js" width="725" height="525" >}}   

{{< p5-iframe sketch="/visual_computing_page/sketches/shaders/texture_sampling2.js"  lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js" width="725" height="525" >}}   

## Procedural Texturing 

El campo de la informática visual, donde se utilizan computadoras para generar imágenes visuales y espaciales del mundo real se conoce como computación gráfica.
 
El texturizado en computación gráfica es una técnica muy común utilizada para añadir detalles a la superficie de un objeto. Con un objeto lo que se puede hacer es renderizarlo como un objeto difuso, por ejemplo, utilizando un color sólido para todo el objeto. Si se requiere que el objeto no tenga solo un color sólido, la solución alternativa es dividir el objeto en partes más pequeñas y dar un valor o color único a cada parte del objeto. Romper el objeto para seguir la forma de los detalles de la textura que se quiere aplicar a la superficie de un objeto lleva mucho tiempo y, aunque funciona si el patrón aplicado está hecho sólo de colores sólidos, no funciona si se desea aplicar algunos gradientes de colores en la superficie del objeto.
 
![Texturas](https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tiling_procedural_textures.jpg/660px-Tiling_procedural_textures.jpg)
 
En computación gráfica el patrón aplicado a la superficie de un objeto puede ser una imagen, pero también puede generarse mediante algún tipo de ecuación matemática. Está segunda técnica se denomina texturizado procedimental. La ventaja de este enfoque es el bajo costo de almacenamiento, la resolución ilimitada de las texturas y la facilidad de mapeo de las mismas. Este tipo de texturas se utiliza a menudo para modelar representaciones superficiales o volumétricas de elementos naturales como la madera, el mármol, el granito, el metal, la piedra y otros.
 
Algunos tipos de estás texturas son: 
1. Texturizado sólido: es un proceso en el que la función generadora de texturas se evalúa sobre R3 en cada punto de la superficie visible del modelo, de modo que las propiedades del material resultante (como el color, el brillo o la normalidad) sólo dependen de su posición en 3D, y no de su posición parametrizada en la superficie en 2D, como en el mapeo tradicional de texturas en 2D. 
 
2. Textura celular: esta textura se basa en puntos de características que están dispersos en un espacio tridimensional, puntos se utilizan para dividir el espacio en pequeñas regiones al azar llamadas celdas que suelen tener el aspecto de "escamas de lagarto" o "losas". Aunque estas regiones son discretas, la propia función de base celular es continua y puede evaluarse en cualquier lugar del espacio. El ruido de Worley es un tipo común de textura celular. 
 
3. Texturas genéticas: es un enfoque experimental para generar texturas en la cual se modela el resultado final con ayuda de un usuario quien decide cuándo una textura es la adecuada. Como el resultado es difícil de controlar, este método se suele utilizar sólo para texturas experimentales o abstractas. 
 
## Truchet Tiles
 
Son baldosas cuadradas decoradas con patrones que no son rotacionalmente simétricos. Cuando se colocan en un mosaico cuadrado del plano, pueden formar patrones variados, y la orientación de cada azulejo puede utilizarse para visualizar información asociada a la posición del azulejo dentro del mosaico.
 
A continuación se presenta una fotografía de los azulejos de la Catedral Santa María de la Huerta de Tarazona, perteneciente a la entrada Simetrías I en la Catedral de Tarazona del blog MateTurismo, de Angel Requena.
 
![Baldosas](https://culturacientifica.com/app/uploads/2022/04/imagen-4-1.jpg)
 
En 1704, Sébastien Truchet estudió todos los posibles patrones formados por los triángulos rectos orientados en las cuatro esquinas de un cuadrado.
 
![Patrones](https://upload.wikimedia.org/wikipedia/commons/d/d9/Truchet_base_tiles_bordered.png)
 
Este tipo de patrones se han estudiado ampliamente y se han generalizado para incluir otros conjuntos de azulejos que no son rotacionalmente simétricos. En la siguiente imagen, se indica un mosaico Truchet tradicional, luego se indica un mosaico con diagonales y, finalmente, se indica cuartos de círculo, centrados alrededor de los vértices donde las diagonales solían tocarse (estos mosaicos, introducidos por Cyril Stanley Smith, crean interesantes patrones de caminos y círculos en forma de manchas).
 
![Truchet Tiles](https://3.bp.blogspot.com/-cDGA6vs7PQo/WNV5WpNgq6I/AAAAAAAAD1c/LUB-xZUIJesNoPqBdhcdhQDHwv03SH03gCLcB/s1600/3_styles.png)

## Texture Mapping
El mapeo de texturas es un método para añadir realismo a un gráfico generado por ordenador. Una imagen (la textura) se añade (mapea) a una forma más simple que se genera en la escena, como una calcomanía pegada a una superficie plana. Esto reduce la cantidad de computación necesaria para crear las formas y texturas en la escena. Por ejemplo, se puede generar una esfera y mapear una textura de cara, para eliminar la necesidad de procesar la forma de la nariz y los ojos.
 
Algunos tipos de mapeo de textura son los siguientes:
 
1. Mapeo difuso: es el tipo más común de mapeo de textura. Define el color y el patrón del objeto, es como pintar una imagen en la superficie del objeto. 
 
2. Mapeo especular: se utilizan para definir el brillo/resplandor de una superficie. Normalmente, un mapa especular es una imagen en blanco y negro que mapea el valor de brillo en un objeto. Cuanto más blanco sea el píxel, más brillante será el objeto en ese lugar específico de la textura.
 
![Specular Map](https://cdn-begoj.nitrocdn.com/oNaXHNanfbZkNZkxWvxsifuqbntpZsXW/assets/static/optimized/rev-547990d/wp-content/uploads/2020/06/POLYGONS-01-1-1024x460.png)
 
3. Mapeo de Oclusión Ambiental: es un mapa en escala de grises que contiene datos de iluminación. No se suele utilizar como mapa propio, sino que se suele combinar con el mapa difuso para crear sombras suaves.
 
![AO Map](https://64.media.tumblr.com/e88a3d142919d4a51b7b966ba6dddf49/tumblr_inline_navbxafNDb1r2xhmf.png)
 
4. Mapeo Normal: es una técnica que permite dar iluminación y relieve más detallado a la superficie de un objeto. Este mapeo permite representar detalles de la superficie, como arrugas, arañazos y bordes biselados, almacenando las correspondientes normales de la superficie en una textura.
 
![Normal map](https://learnopengl.com/img/advanced-lighting/normal_mapping_compare.png)

## CODE - Procedural Texturing

Para la realización del ejercicio, tuvimos en cuenta los patrones de The book of Shaders y el tutorial de ShaderToy - Truchet Tiling Explained [6].
 
Para la implementación, la idea principal es dividir el shader con frag y crear los patrones, para lo cual se usó una función aleatoria. Luego se emplea como una textura dentro de un Cubo.



{{< expand "Sketch Code" "...">}}
```tpl
let pg;
let theShader;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  theShader = readShader('/visual_computing_page/sketches/procedural_texturing.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(450, 450, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(450, 450, WEBGL);
 
  option = createSelect();
  option.position(12, 12);
  option.option("Option 1", 1);
  option.option("Option 2", 2);
  option.selected("none");
  option.changed(() => {
	theShader.setUniform("option", option.value());
  });
 
  vel = createSlider(0, 1, 0.05, 0.05);
  vel.position(12, 40);
  vel.style("width", "280px");
 
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use theShader to render onto pg
  pg.shader(theShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(theShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  theShader.setUniform('u_zoom', 3);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  box(200, 200, 200);
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  theShader.setUniform('u_zoom', ((mouseX - width)/100)+5);
  theShader.setUniform('u_rotater', (mouseY - height/2)/50);
   theShader.setUniform('vel', vel.value());
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}


```
{{< /expand >}}

{{< expand "Fragment Shader" "...">}}
```tpl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time, u_zoom, u_rotater, vel;
uniform int option;

vec2 brickTile(vec2 _st, float _zoom){
	_st *= _zoom;

	// Here is where the offset is happening
	_st.x += step(1., mod(_st.y,2.0)) * 0.5;

	return fract(_st);
}

float box(vec2 _st, vec2 _size){
	_size = vec2(0.5)-(u_zoom*0.05);
	vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
	uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
	return uv.x*uv.y;
}


float Hash21(vec2 p){
  p=fract(p*vec2(264.34,435.345));
  p+=dot(p,p+34.23);
  return fract(p.x*p.y);
}

void main(void){
	if(option==2){
  	vec2 coord=gl_FragCoord.xy/u_resolution;
 	 
  	vec3 color=vec3(0.0);
 	 
  	coord+=u_time*vel;
  	coord*=10.;
 	 
  	vec2 gv=fract(coord)-.5;
  	vec2 id=floor(coord);
  	float n=Hash21(id);
  	float width=.2;
 	 
  	if(n<.5){
    	gv.x*=-1.;
  	}
 	 
  	float mask=smoothstep(.01,-.01,abs(gv.y+gv.x)-width);
 	 
  	color+=mask;
 	 
  	gl_FragColor=vec4(color,1.0);    
 	 
	}else{
  	vec2 st = gl_FragCoord.xy/u_resolution.xy;
  	vec3 color = vec3(0.0);

  	// Modern metric brick of 215mm x 102.5mm x 65mm
  	// http://www.jaharrison.me.uk/Brickwork/Sizes.html
  	// st /= vec2(2.15,0.65)/1.5;

  	// Apply the brick tiling
  	st = brickTile(st,5.0);

  	color = vec3(box(st,vec2(0.9)));

  	gl_FragColor = vec4(color,1.0);
	}
}

```
{{< /expand >}}


{{< p5-iframe sketch="/visual_computing_page/sketches/shaders/procedural_texturing.js"  lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js" width="475" height="475" >}} 

## Conclusiones y Trabajo futuro 

Los shaders son muy flexibles y tienen gran utilidad ya que cada uno de sus uniforms se pasan desde la interfaz, y por sus propiedades, se renderiza de una manera muy rapida en la pagina, ademas permite customizar cualquier tipo de objeto con el patron  que se realiza en el shader, como trabajo futuro esta hacer masking y mapping de aun mas complejidad para reforzar todo lo visto en la investigación de esta interesante tematica.

## Referencias 

[1] https://en.wikipedia.org/wiki/Procedural_texture
 
[2] https://en.wikipedia.org/wiki/Computer_graphics
 
[3] https://culturacientifica.com/2022/04/20/el-arte-de-la-sencilla-baldosa-de-truchet/
 
[4] https://en.wikipedia.org/wiki/Truchet_tiles
 
[5] https://www.mathrecreation.com/2017/03/truchet-tiles.html
 
[6] https://www.youtube.com/watch?v=2R7h76GoIJM
 
[7] http://wedesignvirtual.com/what-does-a-specular-map-do/
 
[8] https://docs.cryengine.com/display/SDKDOC2/Diffuse+Maps
 
[9] https://askagamedev.tumblr.com/post/95739492476/could-you-explain-the-difference-between-bump
 
[10] https://learnopengl.com/Advanced-Lighting/Normal-Mapping
 
[11] https://docs.cryengine.com/display/SDKDOC2/Normal+Maps