# Scene Trees


This demo illustrates a 3D painting application that makes use of screen to world transformations, similar to those employed in ray-casting.

{{< hint danger >}}
Workshop

Implement a 3d brush based on the code above. Don’t forget to check its comments. The p5.treegl library may be used.
{{< /hint >}} 

Para esta parte del trabajo se implmento la libreria https://ml5js.org/ en especifico la parte de deteccion de la mano (handpose), siendo que el trazado de puntos ya no se implementa con el mouse, sino por el movimiento del dedo indice de la mano, ademas se implemento que con el gesto de unir la punta del dedo indice y del dedo pulgar cambiar a un color azul el trazado, esto se hiso apoyado en la distancia de Euler. 

![ImgEuler](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpZeKyH29nlFu2h4VM_NtaauM5OVrq7ng-OQ&usqp=CAU)

{{< p5-iframe  lib1="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" lib2="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib3="https://unpkg.com/ml5@latest/dist/ml5.min.js" sketch="/visual_computing_page/sketches/brush/brush.js" width="625" height="475">}}

