// A matcap shader is a shader that is used to approximate how a material might reflect light.
// Instead of creating a rendering pipeline with lights, you just give your shader a "matcap" texture
// All matcap textures are, are a material rendered on a sphere. This gives us a guess of how light might fall
// on any gived surface of a mesh.

let myShader;
let matcap;

function preload() {
  // a shader is composed of two parts, a vertex shader, and a fragment shader
  // the vertex shader prepares the vertices and geometry to be drawn
  // the fragment shader renders the actual pixel colors
  // loadShader() is asynchronous so it needs to be in preload
  // loadShader() first takes the filename of a vertex shader, and then a frag shader
  // these file types are usually .vert and .frag, but you can actually use anything. .glsl is another common one
  myShader = loadShader("/visual_computing_page/sketches/shader_matcap.vert", "/visual_computing_page/sketches/shader_matcap.frag");

  matcap = loadImage("/visual_computing_page/sketches/warmerdam.jpg");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(400, 400, WEBGL);
  noStroke();
}

function draw() {
  background(0); 
  resetShader();
  // shader() sets the active shader with our shader
  shader(myShader);

  // Send the texture to the shader
  myShader.setUniform("uMatcapTexture", matcap);

  // Rotate our geometry on the X and Z axes
  rotateX(frameCount * 0.01);
  rotateZ(frameCount * 0.005);

  // Draw some geometry to the screen
  cone(width / 10, width / 5, 24, 24, true, true);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }