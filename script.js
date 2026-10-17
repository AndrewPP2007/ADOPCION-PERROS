console.log("ApliWeb iniciado");

const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", function () {
    mensaje.textContent = "¡JavaScript está funcionando correctamente!";
});