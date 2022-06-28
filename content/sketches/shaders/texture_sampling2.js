let lumaShader;
let img;
let grey_scale;

function preload() {
  lumaShader = readShader('/visual_computing_page/sketches/texture_sampling.frag', { varyings: Tree.texcoords2 });
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage('/visual_computing_page/sketches/hawaii_turtle.JPG');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  sel = createSelect(); 
  sel.position(10, 10);
  sel.option('none');
  sel.option('luma');
  sel.option('hsl');
  sel.option('hsv');
  sel.option('diffuse');
  sel.option('average');
  sel.selected('none');
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
    }
    else{ 
        lumaShader.setUniform('grey_scale', 0)
    }
}