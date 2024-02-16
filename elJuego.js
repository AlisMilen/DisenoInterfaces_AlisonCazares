//////////////////////// NAVES//////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const navesContainer = document.getElementById('naves');

    for (let i = 0; i < 5; i++)
    {
        const nave = document.createElement('div');
        nave.classList.add('nave');
        navesContainer.appendChild(nave);
    }

    const naves = document.querySelectorAll('.nave');

    let posicionNaves = 0;
    let direccion = 1; // 1 para mover a la derecha, -1 para mover a la izquierda

    // Función para mover las naves de izquierda a derecha y viceversa
    function moverNaves() {
        // Incrementa o decrementa la posición de las naves según la dirección
        posicionNaves += 10 * direccion;

        // Si llega al borde derecho de la pantalla, cambia la dirección a izquierda
        // Si llega al borde izquierdo de la pantalla, cambia la dirección a derecha
        if (posicionNaves >= window.innerWidth || posicionNaves <= 0) {
            direccion *= -1;
        }

        // Recorre todas las naves y actualiza sus estilos para moverlas
        naves.forEach(nave => {
            marciano.style.left = `${posicionNaves}px`;
        });
    }

    // Espera 3 segundos y luego inicia el movimiento de las naves
    setTimeout(function() {
        setInterval(moverNaves, 50); // Mueve las naves cada 50 milisegundos
    }, 3000);
});


//////////////////////// FIN NAVES//////////////////////////////

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

