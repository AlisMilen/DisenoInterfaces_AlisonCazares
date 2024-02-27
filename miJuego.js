// SELECCIONAMOS EL ELEMENTO GRID Y RESULTADOS, DEL HTML
const grid = document.querySelector(".grid");
const resultados = document.querySelector(".resultados");
// LA INICIAMOS CON 202, LA POSICION DEL DISPARADOR????
let disparos = 202;
// DEFINE EL ANCHO DEL TABLERO DEL JUEGO
const width = 15;
// ARRAY QUE SE USA PARA LOS MARCIANOS ELIMINADOS, POR EL MOMENTO NO HAY, ESTA VACIO
const marBorrar = [];
// SE USARÁ PARA EL INTERVALO DE TIEMPO- SETINTERVAL -MOVER MARCIANOS
let marcianosId;
// ESTO ES UNA VARIABLE QUE CONTROLA EL MOVIMIENTO A LA DERECHA. CUANDO SEA FALSE INDICARÁ IZQUIERDA
let movDrch = true;
// ESTO ES UNA VARIABLE QUE CONTROLA EL MOVIMIENTO A LA DERECHA. CUANDO SEA FALSE INDICARÁ IZQUIERDA
// MANEJA LA CANTIDAD DE DESPLAZAMIENTO
let direccion = 1;
let finResultado = 0;

// CREAMOS LOS ELEMENTOS DIV Y LOS AGREGAMOS EN EL GRID. CADA DIV SON CELDAS, ESTÁN LOS MARCIANOS Y EL DISPARADOR
// SE CONTROLA EL MOVIMIENTO Y EL DESPLAZAMIENTO EN ESOS DIV
for (let i = 0; i < width * width; i++) // CONTROLANDO QUE NO SE PASE DEL ANCHO DEL TABLERO
{
    const espacio = document.createElement("div");
    grid.appendChild(espacio);
}

// NO SERÁ UN NODELIST SINO UN ARRAY DE JAVASCRIPT, ESTO GUARDADO EN CONTENIDO
const contenido = Array.from(document.querySelectorAll(".grid div"));

// SEGUN EL ANCHO DE NUESTRO TABLERO, PONEMOS LA POSICION A LOS DIV QUE USAREMOS PARA LOS MARCIANOS, COMO UN ARRAY
const marcianos = [
    0, 1, 2, 3, 4, 5, 6, 7,
    // 15, 16, 17, 18, 19, 20, 21, 22
];

///////////////////////////MARCIANOS - DISPARADOR/////////////////////////////////////////77
function dibujar()
{
    for (let i = 0; i < marcianos.length; i++)
    {   // EL IF NOS SIRVE PARA NO DIBUJAR UN MARCIANO ELIMINADO.
        // SI MARCIANO(I) NO ESTA INCLUIDO EN EL ARRAY DE MARCIANOS BORRADOS ENTONCES:
        if (!marBorrar.includes(i)) {
            // ESPECIFICAMOS QUE EN LA POSICION I DEL ARRAY TABLERO(CONTENIDO),
            // SE AGREGARÁ LA CLASE CSS MARCIANOS(URL)
            contenido[marcianos[i]].classList.add("marcianos");
        }
    }
}

dibujar();

// DISPARADOR YA TIENE UNA POSICIÓN INICIAL(DISPAROS), ASI QUE INDICAMOS QUE EN ESA POSICION DEL ARRAY DEL TABLERO
// PONEMOS LA CLASS DISPARADOR(URL)
contenido[disparos].classList.add("disparador");

// 
function borrar()
{
    for (let i = 0; i < marcianos.length; i++)
    {
        // EN EL ARRAY TABLA EL MARCIANO QUE ESTE EN LA POSICIÓN, 
        // SE APLICAL LA PROPIEDAD REMOVE, A LA CLASS MARCIANOS.
        contenido[marcianos[i]].classList.remove("marcianos");
    }
}

// 
function disparador(e)
{
    // SE ELIMINA EL DISPARADOR DE SU POSICION INICIAL
    contenido[disparos].classList.remove("disparador");
    switch (e.key) //PARA DIFERENCIAR LAS TECLAS
    {
        case "ArrowLeft":
            // SI LA POSICION DISPAROS NO ESTA EN EL BORDE(NO LLEGA DISTINDO 0)
            if (disparos % width !== 0)
            {
                disparos -= 1;//EL MOVIMIENTO VA A LA IZQUIERDA -1
            }
            break;
        case "ArrowRight":
            // SI EL DISPARADOR NO ESTÁ EN EL BORDE DERECHO DEL TABLERO
            if (disparos % width < width - 1) //disparos + 1 < width * width
            {
                disparos += 1;// EL MOVIMIENTO SE AGREGA UNO A LA DRCHA
            }
            break;
    }
    // LA CLASE DISPARADOR, SE AÑADIRÁ EN LA NUEVA POSICION EN EL ARRAY TABLA, SEÑALADA SEGUN LA FLECHA PULSADA
    contenido[disparos].classList.add("disparador");
}
// EVENTO DE PULSAR TECLA
document.addEventListener("keydown", disparador);

// SI EL JUEGO TERMINA SE VERIFICA
function verificarGameOver() {
    return new Promise((resolve, reject) => 
    {
        // SI AUN HAY ELEMENTOS MARCIANOS EN EL ARRAY TABLA, EN LA POSICION DE DISPAROS ENTONCES
        if (contenido[disparos].classList.contains("marcianos"))
        {
            clearInterval(marcianosId);//DETIENE LA EJECUCION DEL INTERVALO DE MARCIANOS
            resolve("GAME OVER");//SI HAY MARCIANOS GAME OVER
        }
        //COMPRUEBA SI HAY MARCIANOS ELIMINADOS
        else if (marBorrar.length === marcianos.length)
        {
            clearInterval(marcianosId);//DETIENE LA EJECUCION DEL INTERVALO DE MARCIANOS
            reject("Has Ganado");
        }
    });
}


// Función para mover los marcianos y manejar el juego
function moverMarcianos()
{
    // VERIFICAMOS SI EL MARCIANO MAS A LA IZQUIRDA ESTA EN EL BORDE
    const izqMargen = marcianos[0] % width === 0;
    // IGUAL PERO PARA EL MARGEN DERECHO
    // INDICE DEL ULTIMO MARCIANO, SI ES WIDTH -1, 
    // SIGNIFICA QUE ESTA EN EL BORDE DERECHO: 15-1, YA ESTA AL FINAL
    const drchaMargen = marcianos[marcianos.length - 1] % width === width - 1;
    borrar();
    // SI SE ESTAN MOVIENDO A LA DERECHA Y LLEGA AL FINAL, VA HACIA ABAJO
    if (drchaMargen && movDrch)
    {
        for (let i = 0; i < marcianos.length; i++)
        {
            marcianos[i] += width + 1;//MOVEMOS HACIA ABAJO(CON +1)
            direccion = -1; //HACIA LA IZQUIERDA
            movDrch = false; //YA NO SE MUEVEN A LA DERECHA
        }
    }
    //MOV IZQUIERDO Y MOVIMIENTO IZQ
    if (izqMargen && !movDrch)
    {
        for (let i = 0; i < marcianos.length; i++)
        {
            marcianos[i] += width - 1;//
            direccion = 1;//HACIA LA DERECHA
            movDrch = true; //SE MUEVE A LA DRCHA
        }
    }

    for (let i = 0; i < marcianos.length; i++)
    {
        marcianos[i] += direccion;//SE ESTABLECE A CADA MARCIANO, LA DIRECCION CORRESPONDIENTE
    }

    dibujar();

    verificarGameOver()
        .then(() => {
            alert("El juego ha terminado. GAME OVER");
        })
        .catch((error) => {
            alert(error);
        });
}

// EL INTERVALO DE MOVER LOS MARCIANOS
marcianosId = setInterval(moverMarcianos, 500);

// Función para el disparo del shooter
function disparo(e)
{
    let balaId;//SE HACE PARA EL INTERVALO PARA MOVER LA BALA
    let posDisparo = disparos;//PARA PONER LA POSICION INICIAL DEL DISPARADOR PARA QUE COMIENCEN IGUAL
    // EL DISPARADOR QUE LA POSICION DE LA BALA

    function bala() {
        contenido[posDisparo].classList.remove("bala");//NO VEREMOS LA BALA, YA QUE DESAPARECE DE SU POSICIÓN
        posDisparo -= width;//MUEVE LA BALA HACIA ARRIBA CON -
        // SE AÑADE LA CLASE BALA PARA QUE APAREZCA Y SE VEA EL MOVIMIENTO
        contenido[posDisparo].classList.add("bala");

        // SI LA POSICION DE LA BALA CONTIENE AL MARCIANO
        if (contenido[posDisparo].classList.contains("marcianos"))
        {
            // ELIMINA A BALA - NO SERÁ VISIBLE
            contenido[posDisparo].classList.remove("bala");
            // ELIMINA A MARCIANO - NO SERÁ VISIBLE
            contenido[posDisparo].classList.remove("marcianos");
            // ESTO ES MÁS PARA EL VISUAL, SE MOSTRARA CSS CHOQUE
            contenido[posDisparo].classList.add("choque");

            // EL VISUAL DE CHOQUE SE EJECUTAA EN 300 MILISEGUNDOS, DESPUES DE ESTE TIEMPO DESAPARECE
            setTimeout(() => contenido[posDisparo].classList.remove("choque"), 300);
            clearInterval(balaId); //ESTO PARARÁ EL TIEMPO EN EL QUE LA BALA SE MUEVE HACIA ARRIBA

            // PARA CONTROLAR LOS MARCIANOS BORRADOS
            // BUSCA LA POSICION DEL MARCIANO CHOCADO
            const marBorrados = marcianos.indexOf(posDisparo);
            marBorrar.push(marBorrados);
        }
    }

    if (e.key === "ArrowUp") //SI LA TECLA ES LA FLECHA DE ARRIBA
    {
        balaId = setInterval(bala, 100); 
        //PARA ESTABLECER EL TIEMPO PARA EL MOVIMIENTO 
        // DE LA BALA HACIA ARRIBA Y SI CHOCA CON EL MARCIANO
    }
}

document.addEventListener('keydown', disparo);

// ///////////////////WEB COMPONENT///////////////////////////////////////////
class TimeAlert extends HTMLElement
{
    constructor() 
    {
      super();
    }
  
    //SE EJECUTA CUANDO EL COMPONENTE SE AGREGA AL DOM
    connectedCallback()
    {
        // SI NO HAY TIMEOUT, SE ESTABLECE UN TIEMPO DE 60 SEGUNDOS
        // Obtener el tiempo de espera (en segundos) del atributo "timeout"
        const timeout = this.getAttribute('timeout') || 60;
    
        // MUESTRA EL AVISO, DESPUES DEL TIEMPO QUE SE ESTABLECE - SE EJECUTA
        this.showAlert(timeout);
    }

    // MUESTRA EL AVISO EN EL TIEMPO
    showAlert(timeout) 
    {
        setTimeout(() => 
        {
            alert('¡El tiempo está corriendo! ¡Date prisa!');
        }, timeout * 1000);
    }
  }
  
//TIME-ALERT COMPONENTE QUE SE UTILIZA EN EL NAVEGADOR <TIME-ALERT> Y LLAMA AL CLASS
customElements.define('time-alert', TimeAlert);
