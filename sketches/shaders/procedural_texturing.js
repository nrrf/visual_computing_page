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

