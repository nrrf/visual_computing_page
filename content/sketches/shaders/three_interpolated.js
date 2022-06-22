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