// cubo.js  
// Para ejecutar en https://editor.p5js.org/

function setup() {
    createCanvas(300, 300, WEBGL);
    fill(237, 34, 93);

    //strokeWeight(3);
}

function draw() {
    background(200);
    rotateX(frameCount * 0.01);
    rotateZ(frameCount * 0.01);
    beginShape();
    vertex(30, 20, 0);
    vertex(85, 20, 0);
    vertex(85, 75, 0);
    vertex(30, 75, 0);
    endShape(CLOSE);

    beginShape();
    vertex(30, 20, 50);
    vertex(85, 20, 50);
    vertex(85, 75, 50);
    vertex(30, 75, 50);
    endShape(CLOSE);

    beginShape();
    vertex(85, 20, 0);
    vertex(30, 20, 0);
    vertex(30, 20, 50);
    vertex(85, 20, 50);
    endShape(CLOSE);

    beginShape();
    vertex(30, 75, 0);
    vertex(85, 75, 0);
    vertex(85, 75, 50);
    vertex(30, 75, 50);
    endShape(CLOSE);

    beginShape();
    vertex(30, 20, 0);
    vertex(30, 20, 50);
    vertex(30, 75, 50);
    vertex(30, 75, 0);
    endShape(CLOSE);

    beginShape();
    vertex(85, 20, 0);
    vertex(85, 20, 50);
    vertex(85, 75, 50);
    vertex(85, 75, 0);
    endShape(CLOSE);

}