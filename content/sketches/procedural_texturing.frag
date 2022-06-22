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
