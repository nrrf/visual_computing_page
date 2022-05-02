# Angulos de euler
 
Son un conjunto de tres ángulos, alfa, beta y gamma, que permiten describir la orientación de un sólido de una forma más detallada, es decir se aplicaran cambios de referencia alfa, betta, gamma, sobre el resultado de referencia anterior. Por lo que se deben multiplicar las matrices del cambio de orientación.
 
Existen 3 cambios de orientación de los cuales por regla general, los 3 no pueden ser ejecutados en el mismo eje, sino que por regla general, el primero y el último se suelen aplicar sobre el mismo eje, y el segundo giro se aplica sobre un eje perpendicular al eje de giro. 
 
Debido a que existen múltiples casos, vamos a ver los ángulos de Euler donde se gira respecto al eje z, un ángulo alfa, un ángulo gamma respecto al eje Z, y un ángulo beta respecto al eje x. 
 
Conociendo los valores de la matriz del cambio de orientación, vamos a calcular los valores de cada uno de los ángulos de Euler. 
 
La siguiente matriz, es la matriz de orientación de la secuencia de giro ZXZ, con sus correspondientes ángulos alfa, beta, gamma.
 
{{< katex display >}}  R = \begin{bmatrix} cos_\alpha cos_\gamma -sen_\alpha cos_\beta sen_\gamma  & -cos_\alpha sen_\gamma -sen_\alpha cos_\beta cos_\gamma & sen_\alpha sen_\beta  \\ sen_\alpha cos_\gamma + cos_\alpha cos_\beta sen_\gamma & -sen_\alpha sen_\gamma +cos_\alpha cos_\beta cos_\gamma  & -cos_\alpha  sen_\beta \\ sen_\beta  sen_\gamma & sen_\beta  cos_\gamma  & cos_\beta  \\ \end{bmatrix}    {{< /katex  >}}
 
Generalizando la matriz de rotación, se tiene la siguiente forma:
{{< katex display >}}R = \begin{bmatrix} r_1_1 & r_1_2 & r_1_3 \\ r_2_1 & r_2_2 & r_2_3 \\ r_3_1 & r_3_2 & r_3_3 \\ \end{bmatrix}  {{< /katex  >}}
 
Dada la matriz de rotación R, podemos calcular el valor de los ángulos de Euler:
Empezamos elevando el cuadrado a r_31 y r_32, sacando el factor común de la ecuación, teniendo en cuenta sen^2 y cos^2 es igual a 1. 
{{< katex display >}}  r^{2}_{31} + r^{2}_{32} = sen^{2}_{\beta}sen^{2}_{\gamma } + sen^{2}_{\beta}cos^{2}_{\gamma } = sen^{2}_{\beta}(sen^{2}_{\gamma } + cos^{2}_{\gamma } ) = sen^{2}_{\beta} {{< /katex  >}}
 
Ahora despejamos el cuadrado, obteniendo dos posibles soluciones:
{{< katex display >}} sen_{\beta } = \sqrt{r_{31}^{2} + r_{32}^{2}} {{< /katex  >}}
{{< katex display >}} sen_{\beta } = -\sqrt{r_{31}^{2} + r_{32}^{2}}{{< /katex  >}}
 
Teniendo en cuenta la primera solución, y conociendo que r_33 es coseno de Beta, se tiene que:
{{< katex display >}} tan_{\beta } = \left ( \frac{\sqrt{r_{31}^{2} + r_{32}^{2}}}{r_{33}} \right ) {{< /katex  >}}
 
Y despejando Beta, y conociendo que Beta está entre 0 y pi, tenemos que:
{{< katex display >}} \beta = tan^{-1}\left ( \frac{\sqrt{r_{31}^{2} + r_{32}^{2}}}{r_{33}} \right ) {{< /katex  >}}
 
Ahora calculamos el valor del ángulo gamma dividiendo r_31 y r_32:
{{< katex display >}}  \frac{r_{31}}{r_{32}} = \frac{sen_\beta sen_\gamma }{sen_\beta cos_\gamma } = \frac{sen_\gamma  }{cos_\gamma } = tan_\gamma {{< /katex  >}}
 
Despejamos Gamma, y tenemos el siguiente resultado:
{{< katex display >}} \gamma = tan^{-1}\left ( \frac{r_{31}}{r_{32}} \right ) {{< /katex  >}}
 
Ahora vamos a calcular el valor del ángulo alfa, teniendo en cuenta r_13 y r_23:
{{< katex display >}}  \frac{r_{13}}{r_{23}} = \frac{sen_\alpha  sen_\beta  }{-cos_\alpha sen_\beta } = \frac{sen_\alpha   }{-cos_\alpha  } = tan_\alpha {{< /katex  >}}
 
Despejamos alfa, y tenemos el siguiente resultado:
{{< katex display >}} \alpha  = tan^{-1}\left ( \frac{r_{13}}{-r_{23}} \right ) {{< /katex  >}}
 
De esta manera, tenemos el resultado de los tres ángulos, para ángulos entre 0 y pi. 
 
 
Ahora bien, al tener en cuenta la parte negativa del despeje del cuadrado, es decir el valor de beta está entre pi y 2pi, y conociendo que coseno de Beta es r_33, tenemos que el ángulo Beta es:
{{< katex display >}} \beta = tan^{-1}\left ( \frac{-\sqrt{r_{31}^{2} + r_{32}^{2}}}{r_{33}} \right ) {{< /katex  >}}
 
Ahora calculamos el ángulo gamma:
{{< katex display >}}  \frac{-r_{31}}{-r_{32}} = \frac{sen_\beta sen_\gamma }{sen_\beta cos_\gamma } = \frac{sen_\gamma  }{cos_\gamma } = tan_\gamma {{< /katex  >}} 
{{< katex display >}} \gamma = tan^{-1}\left ( \frac{-r_{31}}{-r_{32}} \right ) {{< /katex  >}}
 
Y por el último calculamos el ángulo alfa:
{{< katex display >}}  \frac{-r_{13}}{r_{23}} = \frac{-sen_\alpha  sen_\beta  }{cos_\alpha sen_\beta } = \frac{-sen_\alpha }{cos_\alpha } = tan_\alpha {{< /katex  >}}
{{< katex display >}} \alpha  = tan^{-1}\left ( \frac{-r_{13}}{r_{23}} \right ) {{< /katex  >}}
Y de esta manera, tenemos los valores para los ángulos entre pi y 2 pi.

