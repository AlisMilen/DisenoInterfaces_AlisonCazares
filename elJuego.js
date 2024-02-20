//////////////////////// MARCIANO//////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const marcianos = document.querySelectorAll('.marciano');
    let direccion = 1; //1 para mover a la derecha

    function moverMarciano() {
        marcianos.forEach(function(marciano) {
            let posicionMarciano = parseInt(marciano.style.left) || 0;
            let nuevaPosicion = posicionMarciano + (10 * direccion);
            
            // Verifica si la nueva posición está dentro de los límites del grid
            if (nuevaPosicion >= 0 && nuevaPosicion <= (document.querySelector('.grid').offsetWidth - marciano.offsetWidth)) {
                marciano.style.left = nuevaPosicion + 'px';
            } else {
                // Cambia la dirección si el marciano alcanza los límites del grid
                direccion *= -1;
            }
        });
    }

    setTimeout(function() {
        setInterval(moverMarciano, 100); // Mueve el marciano cada 100 milisegundos
    }, 2000);
});



//////////////////////// FIN MARCIANO//////////////////////////////

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
                balas.style.visibility = 'hidden';
                marciano.style.visibility = 'hidden';
                clearInterval(intervalID);
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

