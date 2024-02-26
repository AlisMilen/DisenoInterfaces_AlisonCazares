// JavaScript del contador de disparos
document.addEventListener('DOMContentLoaded', function() {
    const contadorSpan = document.getElementById('contador');
    let contadorDisparos = 0;

    // Función para incrementar el contador de disparos
    function incrementarContador() {
        contadorDisparos++;
        contadorSpan.textContent = contadorDisparos;
    }

    // Manejador de eventos para cuando un marciano es impactado
    document.addEventListener('marcianoImpactado', function() {
        incrementarContador();
    });
});
