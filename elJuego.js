//////////////////////// NAVES//////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const marciano = document.getElementById('marciano');

    let posicionMarciano = 0;
    let direccion = 1; // 1 para mover a la derecha, -1 para mover a la izquierda

    function moverMarciano() {
        // Incrementa o decrementa la posición del marciano según la dirección
        posicionMarciano += 10 * direccion;

        // Si el marciano llega al borde derecho del grid, cambia la dirección a izquierda
        // Si el marciano llega al borde izquierdo del grid, cambia la dirección a derecha
        if (posicionMarciano >= (document.querySelector('.grid').offsetWidth - marciano.offsetWidth) || posicionMarciano <= 0)
        {
            direccion *= -1;
        }

        // Actualiza la posición horizontal del marciano
        marciano.style.left = `${posicionMarciano}px`;
    }

    // Espera 3 segundos y luego inicia el movimiento del marciano
    setTimeout(function() {
        setInterval(moverMarciano, 50); // Mueve el marciano cada 50 milisegundos
    }, 2000);
});

//////////////////////// FIN NAVES//////////////////////////////

// ///////////////////BALAS///////////////////////////////////
document.addEventListener('DOMContentLoaded', function()
{
    const marciano = document.getElementById('marciano');
    const disparador = document.getElementById('disparador');
    const balas = document.getElementById('balas');

    let disparadorPosY = parseInt(window.getComputedStyle(disparador).top);
    let balasPosY = parseInt(window.getComputedStyle(balas).top);
    let intervalID;

    function arriba() {
        balasPosY -= 10;
        balas.style.top = balasPosY + 'px';
        colision();
        limite();
    }

    function colision() {
        const marcianoRect = marciano.getBoundingClientRect();
        const balasRect = balas.getBoundingClientRect();

        if (balasRect.bottom >= marcianoRect.top && balasRect.left >= marcianoRect.left && balasRect.right <= marcianoRect.right)
        {
            //SI TOCA, SE OCULTA LA BALA Y EL MARCIANO
            balas.style.visibility = 'hidden';
            marciano.style.visibility = 'hidden';
            clearInterval(intervalID);
        }
    }

    function limite()
    {
        if (balasPosY <= 0)
        {
            // SI TOCA EL BORDE SUPERIOR, TAMBIEN SE OCULTA
            balas.style.visibility = 'hidden';
            clearInterval(intervalID);
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space')
        {
            // Iniciar movimiento hacia arriba cuando se presiona la tecla de espacio
            balas.style.visibility = 'visible';
            balasPosY = parseInt(window.getComputedStyle(disparador).top);
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
        const disparadorWidthPercentage = 40; // Por ejemplo, supongamos que ocupa el 40%
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

