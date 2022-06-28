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