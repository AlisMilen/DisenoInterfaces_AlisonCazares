document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Construir la solicitud XML
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            if (response.trim() === "success") {
                alert("¡Registro exitoso!");
                window.location.href = "login.html"; // Redireccionar al inicio de sesión
            } else {
                alert("El usuario ya está registrado.");
            }
        }
    };
    xmlhttp.open("POST", "register.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("username=" + username + "&password=" + password);
});
