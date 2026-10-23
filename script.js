console.log("ApliWeb iniciado - Refugio de Mascotas");

// Funcionalidad anterior del botón de prueba
const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensaje");

if (boton) {
    boton.addEventListener("click", function () {
        mensaje.textContent = "¡JavaScript está funcionando correctamente en el refugio!";
    });
}

// Nueva funcionalidad: Registro dinámico de mascotas
const formMascota = document.getElementById("formMascota");

if (formMascota) {
    formMascota.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita que la página se recargue

        const nombre = document.getElementById("nombreMascota").value;
        const raza = document.getElementById("razaMascota").value;
        const edad = document.getElementById("edadMascota").value;

        alert(`¡Registro exitoso!\n\nSe ha registrado a ${nombre} (${raza}, ${edad} años) en el sistema del refugio.`);
        
        // Limpiar el formulario
        formMascota.reset();
    });
}