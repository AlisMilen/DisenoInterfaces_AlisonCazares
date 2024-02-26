//////////////////////// MARCIANO//////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const marcianos = document.querySelectorAll('.marciano');
    let direccion = 1; // 1 para mover a la derecha

    function moverMarciano() {
        // Obtenemos el margen izquierdo del primer marciano y el margen derecho del último marciano
        const primerMarciano = marcianos[0];
        const ultimoMarciano = marcianos[marcianos.length - 1];
        const margenIzquierdo = parseInt(window.getComputedStyle(primerMarciano).left) || 0;
        // OFFSETWIDTH: DEVUELVE EL ANCHO TOTAL DE UN ELEMENTO
        const margenDerecho = parseInt(window.getComputedStyle(ultimoMarciano).left) + ultimoMarciano.offsetWidth || 0;

        // Calculamos los límites del contenedor del grid
        const limiteIzquierdo = 0;
        const limiteDerecho = document.querySelector('.grid').offsetWidth - primerMarciano.offsetWidth;

        // Verificamos si los marcianos alcanzan los límites del contenedor
        if (direccion === 1 && margenDerecho >= limiteDerecho) {
            // Si alcanzan el límite derecho, cambiamos la dirección a -1 para mover a la izquierda
            direccion = -1;
        } else if (direccion === -1 && margenIzquierdo <= limiteIzquierdo) {
            // Si alcanzan el límite izquierdo, cambiamos la dirección a 1 para mover a la derecha
            direccion = 1;
        }

        // Movemos todos los marcianos en la dirección actual
        marcianos.forEach(function(marciano) {
            let posicionMarciano = parseInt(marciano.style.left) || 0;
            let nuevaPosicion = posicionMarciano + (10 * direccion);
            
            // Ajustamos la posición para mantener al marciano dentro de los límites del contenedor
            nuevaPosicion = Math.min(Math.max(nuevaPosicion, limiteIzquierdo), limiteDerecho);
            
            marciano.style.left = nuevaPosicion + 'px';
        });
    }

    // Iniciamos el movimiento de los marcianos
    setTimeout(function() {
        setInterval(moverMarciano, 50); // Mueve los marcianos cada 80 milisegundos
    }, 2000);
});

// const intervalIDMarcianos = setInterval(moverMarciano, 80); // Mueve los marcianos cada 80 milisegundos

//////////////////////// FIN MARCIANO//////////////////////////////

// ////////////////////FUNCIONALIDAD////////////////////////////////////
function decirGanador() {
    return new Promise((resolve, reject) => {
        const marcianos = document.querySelectorAll('.marciano');
        let marcianosOcultos = 0;

        marcianos.forEach(marciano => {
            if (marciano.style.visibility === 'hidden') {
                marcianosOcultos++;
            }
        });

        if (marcianosOcultos === marcianos.length) {
            resolve("¡Has ganado!");
        } else {
            const tiempoPerdida = 10000; // 30 segundos
            setTimeout(() => {
                marcianos.forEach(marciano => {
                    if (marciano.style.visibility !== 'hidden') {
                        marciano.style.visibility = 'hidden'; // Ocultar los marcianos restantes
                    }
                });
                reject("¡Has perdido! Los marcianos te han invadido.");
            }, tiempoPerdida);
        }
    });
}

// Llamar a la función para verificar la victoria o la pérdida
decirGanador()
    .then(message => alert(message))
    .catch(error => alert(error));


// ////////////////////FIN - FUNCIONALIDAD////////////////////////////////////

// ///////////////////BALAS///////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const marcianos = document.querySelectorAll('.marciano');
    const disparador = document.getElementById('disparador');
    const balas = document.getElementById('balas');
    let intervalID;

    function arriba() {
        let balasPosY = parseInt(window.getComputedStyle(balas).top); // Obtener la posición Y de las balas
        balasPosY -= 10; // Mover hacia arriba
        balas.style.top = balasPosY + 'px'; //nueva posición
        colision();
        limite();
    }

    function colision() {
        marcianos.forEach(function(marciano) {
            const marcianoRect = marciano.getBoundingClientRect();
            const balasRect = balas.getBoundingClientRect();

            if (balasRect.bottom >= marcianoRect.top && balasRect.left >= marcianoRect.left && balasRect.right <= marcianoRect.right) {
                //SI TOCA, SE OCULTA LA BALA Y EL MARCIANO
                // MODIFICAR A EN VEZ DE OCULTAR, ELIMINAR EL DIV
                const marcianoImpactadoEvent = new Event('marcianoImpactado');
                marciano.dispatchEvent(marcianoImpactadoEvent);
                balas.style.visibility = 'hidden';
                marciano.style.visibility = 'hidden';
                // marciano.remove();
                clearInterval(intervalID);
                decirGanador()
                .then(message => alert(message))
                .catch(error => alert(error));
            }
        });
    }

    function limite() {
        let balasPosY = parseInt(window.getComputedStyle(balas).top); // Obtener la posición Y de las balas
        if (balasPosY <= 0) {
            // SI TOCA EL BORDE SUPERIOR, TAMBIEN SE OCULTA
            balas.style.visibility = 'hidden';
            clearInterval(intervalID);
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            // INICIA EL MOVIMIENTO HACIA ARRIBA SI SE PRESIONA EL ESPACIO
            balas.style.visibility = 'visible';
            let balasPosY = parseInt(window.getComputedStyle(disparador).top); // Obtener la posición Y del disparador
            balas.style.left = disparador.offsetLeft + 'px';
            balas.style.top = balasPosY + 'px';
            intervalID = setInterval(arriba, 50);
        }
    });
});

// ///////////////////FIN - BALAS///////////////////////////////////


/////////////////// DISPARADOR//////////////////////////////
const disparador = document.getElementById('disparador');
let posicionDisparador = 0;

document.addEventListener('keydown', function(event)
{
    const ElemGrid = document.querySelector('.grid');//COGE EL ELEMENTO GRID
    const gridStyles = window.getComputedStyle(ElemGrid);//QUEREMOS EL ESTILO DEL GRID
    const gridWidth = parseFloat(gridStyles.width);//EN ESPECÍFICO QUEREMOS OBTENER EL ANCHO DEL GRID Y LO GUARDAMOS EN LA VARIABLE CORRESPONDIENTE

    const step = gridWidth * 0.1;//ESPECIFICAMOS DE CUANTO VA A SER EL PASO EN EL ANCHO DEL GRID QUE NOS VAMOS A MOVER

    if (event.key === 'ArrowLeft') 
    {
        posicionDisparador -= step;//SE VA A MOVER A LA IZQUIERDA EN EL EJE X, CON -
        if (posicionDisparador < 0) //ESTO ME VERIFICA SI HA LLEGADO AL BORDE IZQUIERDO DEL CONTENEDOR
        // SI ES MENOR QUE 0, HA LLEGADO A SU LIMITE Y SE ESTABLECE LA POSICION A 0
        {
            posicionDisparador = 0;
        }
    }
    else if (event.key === 'ArrowRight') 
    {
        const gridElement = document.querySelector('.grid');
        const gridWidth = parseFloat(window.getComputedStyle(gridElement).width);
        
        // Calculamos el ancho ocupado por el disparador en porcentaje
        const disparadorWidthPercentage = 20;
        const disparadorWidth = (disparadorWidthPercentage / 100) * gridWidth;
        
        if (posicionDisparador + step > gridWidth - disparadorWidth)
        {
            posicionDisparador = gridWidth - disparadorWidth;
        } else {
            posicionDisparador += step;
        }        
    }

    disparador.style.left = posicionDisparador + 'px';
});
//////////////////////FIN DISPARADOR////////////////////////////

