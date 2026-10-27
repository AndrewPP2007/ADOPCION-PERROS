console.log("Sistema ADOPCION-PERROS iniciado correctamente (Versión Modular).");

// ==========================================
// 1. LÓGICA ACTIVA (Funcional para las vistas actuales)
// ==========================================

// Botón de prueba clásico
const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensaje");

if (boton) {
    boton.addEventListener("click", function () {
        mensaje.textContent = "¡Conexión de JavaScript validada con éxito en el refugio!";
    });
}

// Registro dinámico de mascotas (Formulario actual)
const formMascota = document.getElementById("formMascota");

if (formMascota) {
    formMascota.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombreMascota").value;
        const raza = document.getElementById("razaMascota").value;
        const edad = document.getElementById("edadMascota").value;

        alert(`¡Registro exitoso en el refugio!\nMascota: ${nombre}\nRaza: ${raza}\nEdad: ${edad} años.`);
        formMascota.reset();
    });
}


/* ==========================================================================
   2. MÓDULOS DE BASE DE DATOS INTERNA Y 5 AÑOS DE OPERACIÓN (FUTURO / SESIONES FINALES)
   ==========================================================================
   Las siguientes estructuras simulan el almacenamiento histórico del refugio 
   durante 5 años de funcionamiento (2021-2026). Descomentar en fases avanzadas.
   ========================================================================== */

/*
// --- BASE DE DATOS SIMULADA (LOCALSTORAGE + HISTORIAL DE 5 AÑOS) ---
const DB_REFUGIO = {
    canesHistoricos: [
        { id: 1, nombre: "Max", raza: "Mestizo", edad: 6, ingreso: "2021-03-15", estado: "Adoptado (2021)" },
        { id: 2, nombre: "Bobby", raza: "Golden Retriever", edad: 7, ingreso: "2021-06-10", estado: "Adoptado (2022)" },
        { id: 3, nombre: "Thor", raza: "Pastor Alemán", edad: 5, ingreso: "2022-01-20", estado: "Adoptado (2023)" },
        { id: 4, nombre: "Firulais", raza: "Mestizo", edad: 2, ingreso: "2025-02-10", estado: "En Albergue" },
        { id: 5, nombre: "Luna", raza: "Labrador", edad: 1, ingreso: "2025-08-14", estado: "En Albergue" }
    ],
    
    solicitudesAdopcion: 1240, // Acumulado en 5 años
    totalAdopcionesExitosas: 980,
    controlesVeterinariosRealizados: 3450,

    // Inicializar o recuperar datos de la sesión
    obtenerEstadisticas: function() {
        return {
            canesTotal: this.canesHistoricos.length,
            adopciones: this.totalAdopcionesExitosas,
            veterinaria: this.controlesVeterinariosRealizados
        };
    }
};

// --- CONTROLADOR PARA EL PANEL DE ADMINISTRACIÓN ---
function inicializarPanelAdministracion() {
    const spanCanes = document.getElementById("totalCanes");
    const spanSolicitudes = document.getElementById("totalSolicitudes");
    
    if (spanCanes && spanSolicitudes) {
        const stats = DB_REFUGIO.obtenerEstadisticas();
        spanCanes.textContent = stats.canesTotal + " (Histórico 5 años)";
        spanSolicitudes.textContent = DB_REFUGIO.solicitudesAdopcion + " solicitudes procesadas";
    }
}

// --- CATALOGO DINÁMICO PARA EL MÓDULO DE PERROS ---
function cargarCatalogoPerros() {
    const listaPerros = document.getElementById("listaPerros");
    if (listaPerros) {
        listaPerros.innerHTML = ""; // Limpiar lista estática
        const albergados = DB_REFUGIO.canesHistoricos.filter(c => c.estado === "En Albergue");
        
        albergados.forEach(perro => {
            const li = document.createElement("li");
            li.textContent = `${perro.nombre} - ${perro.edad} años (${perro.raza}) - Ingreso: ${perro.ingreso}`;
            listaPerros.appendChild(li);
        });
    }
}

// Ejecución automática según la vista activa detectada
document.addEventListener("DOMContentLoaded", () => {
    inicializarPanelAdministracion();
    cargarCatalogoPerros();
});
*/
