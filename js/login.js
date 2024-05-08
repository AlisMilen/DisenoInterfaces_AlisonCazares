document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Construir la solicitud XML
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            if (response.trim() === "success") {
                // Establecer la cookie de sesión
                setSessionCookie("loggedIn", "true");
                alert("¡Inicio de sesión exitoso!");
                window.location.href = "dashboard.html"; // Redireccionar al dashboard
            } else {
                alert("Nombre de usuario o contraseña incorrectos.");
            }
        }
    };
    xmlhttp.open("POST", "login.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("username=" + username + "&password=" + password);
});

// Función para establecer una cookie de sesión
function setSessionCookie(name, value) {
    var date = new Date();
    date.setTime(date.getTime() + (30 * 60 * 1000)); // 30 minutos de sesión
    var expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}
