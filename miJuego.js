const grid = document.querySelector(".grid");
const resultados = document.querySelector(".resultados");
let disparos = 202;
const width = 15;
const marBorrar = [];
let marcianosId;
let isGoingRight = true;
let direccion = 1;
let finResultado = 0;

// Creación del tablero
for (let i = 0; i < width * width; i++) {
    const espacio = document.createElement("div");
    grid.appendChild(espacio);
}

const contenido = Array.from(document.querySelectorAll(".grid div"));

// Coordenadas de los marcianos
const marcianos = [
    0, 1, 2, 3, 4, 5, 6, 7,
    // 15, 16, 17, 18, 19, 20, 21, 22
];

// Función para dibujar los marcianos en el tablero
function dibujar() {
    for (let i = 0; i < marcianos.length; i++) {
        if (!marBorrar.includes(i)) {
            contenido[marcianos[i]].classList.add("marcianos");
        }
    }
}

dibujar();

// Dibujar el shooter en su posición inicial
contenido[disparos].classList.add("disparador");

// Función para borrar los marcianos del tablero
function borrar() {
    for (let i = 0; i < marcianos.length; i++) {
        contenido[marcianos[i]].classList.remove("marcianos");
    }
}

// Función para mover el shooter
function disparador(e) {
    contenido[disparos].classList.remove("disparador");
    switch (e.key) {
        case "ArrowLeft":
            if (disparos % width !== 0) disparos -= 1;
            break;
        case "ArrowRight":
            if (disparos % width < width - 1) disparos += 1;
            break;
    }
    contenido[disparos].classList.add("disparador");
}

document.addEventListener("keydown", disparador);

// Función para verificar si el juego ha terminado



// Función para mover los marcianos y manejar el juego
function moverMarcianos() {
    const izqMargen = marcianos[0] % width === 0;
    const drchaMargen = marcianos[marcianos.length - 1] % width === width - 1;
    borrar();

    if (drchaMargen && isGoingRight) {
        for (let i = 0; i < marcianos.length; i++) {
            marcianos[i] += width + 1;
            direccion = -1;
            isGoingRight = false;
        }
    }

    if (izqMargen && !isGoingRight) {
        for (let i = 0; i < marcianos.length; i++) {
            marcianos[i] += width - 1;
            direccion = 1;
            isGoingRight = true;
        }
    }

    for (let i = 0; i < marcianos.length; i++) {
        marcianos[i] += direccion;
    }

    dibujar();


}

// Establecer intervalo para mover los marcianos
marcianosId = setInterval(moverMarcianos, 600);

// Función para el disparo del shooter
