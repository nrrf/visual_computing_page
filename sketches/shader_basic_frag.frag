
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
