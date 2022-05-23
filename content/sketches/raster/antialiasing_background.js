function setup() {
    createCanvas(400, 400);
    textSize(80);
  }
  
  function draw() {
    background(255);
    
    // half-background
    fill(150);
    rect(-1,-1,width+2,height/2);
    
    // top half smooth, bottom half rough
    fill(0);
    text("alphabet", 40, 80);
    ellipse(200,200,160,160);
    text("alphabet", 40, 360);
  }