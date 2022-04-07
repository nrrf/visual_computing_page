//penrose_staircase.js

function setup() {
    sliderx = createSlider(4, 7, 5.25, 0.01);
    sliderx.position(30, 30);

    slidery = createSlider(4, 7, 5.27, 0.01);
    slidery.position(30, 55);

    sliderz = createSlider(0, 10, 0, 0.01);
    sliderz.position(30, 80);

    createCanvas(700, 700, WEBGL);

    fill(237, 34, 93);

    //
    cuboid1 = new Cuboid(0, 50, 0, -(200 / 13) * 9, 0, 50);
    cuboid2 = new Cuboid(50, 50, 0, -(200 / 13) * 10, 0, 50);
    cuboid3 = new Cuboid(100, 50, 0, -(200 / 13) * 11, 0, 50);
    cuboid4 = new Cuboid(150, 50, 0, -(200 / 13) * 12, 0, 50);
    cuboid5 = new Cuboid(200, 50, 0, -(200 / 13) * 13, 0, 50);

    //  
    cuboid6 = new Cuboid(0, 50, 0, -(200 / 13) * 8, 0, -50);
    cuboid7 = new Cuboid(0, 50, (200 / 13) * 5, -(200 / 13) * 12, -50, -50);
    cuboid8 = new Cuboid(0, 50, (200 / 13) * 5, -(200 / 13) * 11, -100, -50);

    // 
    cuboid9 = new Cuboid(200, 50, 0, -(200 / 13) * 14, 0, -50);
    cuboid10 = new Cuboid(200, 50, 0, -(200 / 13) * 15, -50, -50);


    //
    cuboid11 = new Cuboid(150, 50, 0, -(200 / 13) * 16, -50, -50);
    //cuboid12 = new Cuboid(100, 50, -(200/13)*17, -(200/13)*1, -50, -50);


}

function draw() {

    scale(0.5);
    background(200);
    rotateX(sliderx.value());
    rotateY(slidery.value());
    rotateZ(sliderz.value());
    //console.log(sliderx.value()); 
    //console.log(slidery.value())
    //orbitControl()

    // first cuboid 
    cuboid1.draw()
    cuboid2.draw()
    cuboid3.draw()
    cuboid4.draw()
    cuboid5.draw()

    cuboid6.draw()
    cuboid7.draw()
    cuboid8.draw()

    cuboid9.draw()
    cuboid10.draw()
    cuboid11.draw()

    // frente
    // push son para modificar el estilo y no afectar el resto de la plantilla
    push()
    noStroke()
    beginShape();
    vertex(100, -(200 / 13) * 16, -50 - (200 / 13) * 2);
    vertex(150, -(200 / 13) * 16, -50 - (200 / 13) * 2);
    vertex(150, -(200 / 13) * 17, -50 - (200 / 13) * 1);
    vertex(100, -(200 / 13) * 17, -50 - (200 / 13) * 1);
    endShape(CLOSE);

    beginShape();
    vertex(100, -(200 / 13) * 16, -100);
    vertex(150, -(200 / 13) * 16, -100);
    vertex(150, -(200 / 13) * 17, -100);
    vertex(100, -(200 / 13) * 17, -100);
    endShape(CLOSE);
    pop()

    //inferior
    beginShape();
    vertex(150, -(200 / 13) * 16, -50 - (200 / 13) * 2);
    vertex(100, -(200 / 13) * 16, -50 - (200 / 13) * 2);
    vertex(100, -(200 / 13) * 16, -100);
    vertex(150, -(200 / 13) * 16, -100);
    endShape(CLOSE);

    //superior
    push()
    noStroke()
    beginShape();
    vertex(100, -(200 / 13) * 17, -50 - (200 / 13) * 1);
    vertex(150, -(200 / 13) * 17, -50 - (200 / 13) * 1);
    vertex(150, -(200 / 13) * 17, -100);
    vertex(100, -(200 / 13) * 17, -100);
    endShape(CLOSE);
    pop()

    // frente izq
    beginShape();
    vertex(100, -(200 / 13) * 16, -50 - (200 / 13) * 2);
    vertex(100, -(200 / 13) * 16, -100);
    vertex(100, -(200 / 13) * 17, -100);
    vertex(100, -(200 / 13) * 17, -50 - (200 / 13) * 1);
    endShape(CLOSE);

    // frente der
    beginShape();
    vertex(150, -(200 / 13) * 16, -50);
    vertex(150, -(200 / 13) * 16, -100);
    vertex(150, -(200 / 13) * 17, -100);
    vertex(150, -(200 / 13) * 17, -50);
    endShape(CLOSE);

    //triangle 
    push()
    noStroke()
    beginShape();
    vertex(150, -(200 / 13) * 17, -50 - (200 / 13) * 1)
    vertex(150, -(200 / 13) * 17, -50)
    vertex(150 - (200 / 13) * 1, -(200 / 13) * 17, -50 - (200 / 13) * 1)
    endShape(CLOSE);
    pop()
}

class Cuboid {
    constructor(x, w, y, h, z, d) {
        this.x = x
        this.w = w
        this.y = y
        this.h = h
        this.z = z
        this.d = d
    }

    draw() {

        beginShape();

        vertex(this.x, this.y, this.z);
        vertex(this.x + this.w, this.y, this.z);
        vertex(this.x + this.w, this.y + this.h, this.z);
        vertex(this.x, this.y + this.h, this.z);
        endShape(CLOSE);

        beginShape();
        vertex(this.x, this.y, this.z + this.d);
        vertex(this.x + this.w, this.y, this.z + this.d);
        vertex(this.x + this.w, this.y + this.h, this.z + this.d);
        vertex(this.x, this.y + this.h, this.z + this.d);
        endShape(CLOSE);

        beginShape();
        vertex(this.x + this.w, this.y, this.z);
        vertex(this.x, this.y, this.z);
        vertex(this.x, this.y, this.z + this.d);
        vertex(this.x + this.w, this.y, this.z + this.d);
        endShape(CLOSE);

        beginShape();
        vertex(this.x, this.y + this.h, this.z);
        vertex(this.x + this.w, this.y + this.h, this.z);
        vertex(this.x + this.w, this.y + this.h, this.z + this.d);
        vertex(this.x, this.y + this.h, this.z + this.d);
        endShape(CLOSE);

        beginShape();
        vertex(this.x, this.y, this.z);
        vertex(this.x, this.y, this.z + this.d);
        vertex(this.x, this.y + this.h, this.z + this.d);
        vertex(this.x, this.y + this.h, this.z);
        endShape(CLOSE);

        beginShape();
        vertex(this.x + this.w, this.y, this.z);
        vertex(this.x + this.w, this.y, this.z + this.d);
        vertex(this.x + this.w, this.y + this.h, this.z + this.d);
        vertex(this.x + this.w, this.y + this.h, this.z);
        endShape(CLOSE);
    }
}