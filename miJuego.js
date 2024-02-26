const grid = document.querySelector(".grid")
const resultDisplay = document.querySelector(".results")
let disparo = 202
const width = 15
const marBorrar = []


// ////////////////////////DIV MARCIANOS///////////////////////////////////////////
for (let i = 0; i < width * width; i++) 
{
    const espacio = document.createElement("div")
    grid.appendChild(espacio)
}

const contenido = Array.from(document.querySelectorAll(".grid div"))

const marcianos = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function dibujar() {
    for (let i = 0; i < marcianos.length; i++) {
        if (!marBorrar.includes(i)) {
            contenido[marcianos[i]].classList.add("invader")
        }
    }
}

dibujar()

// ////////////////////////DIV MARCIANOS///////////////////////////////////////////

contenido[disparo].classList.add("disparador")

// ///////////////////////DISPARO-FUNCION///////////////////////////////////////////////
function borrar() {
    for (let i = 0; i < marcianos.length; i++) {
        contenido[marcianos[i]].classList.borrar("invader")
    }
}
// /////////////////////////DISPARADOR/////////////////////////////////////////7
function disparador(e) {
    contenido[disparo].classList.borrar("disparador")
    switch (e.key) {
        case "ArrowLeft":
            if (disparo % width !== 0) disparo -= 1
            break
        case "ArrowRight":
            if (disparo % width < width - 1) disparo += 1
            break
    }
    contenido[disparo].classList.add("disparador")
}

document.addEventListener("keydown", disparador)
