const CLAVE_BD_ADOPCION = "ADOPCION_PERROS_BD_2021_2026";

const BASE_DATOS_INICIAL = {
  periodo: "2021-2026",
  estadisticas: {
    adopcionesConcretadas: 248,
    canesApadrinados: 64,
    controlesVeterinarios: 512
  },
  historicoAnual: [
    { anio: 2021, rescates: 45, adopciones: 32, apadrinamientos: 10 },
    { anio: 2022, rescates: 58, adopciones: 41, apadrinamientos: 12 },
    { anio: 2023, rescates: 67, adopciones: 50, apadrinamientos: 14 },
    { anio: 2024, rescates: 74, adopciones: 56, apadrinamientos: 13 },
    { anio: 2025, rescates: 69, adopciones: 51, apadrinamientos: 9 },
    { anio: 2026, rescates: 48, adopciones: 38, apadrinamientos: 6 }
  ],
  canesDestacados: [
    {
      id: "bobby",
      nombre: "Bobby",
      tamano: "mediano",
      sexo: "macho",
      modalidades: ["adopcion", "apadrinar"]
    },
    {
      id: "nala",
      nombre: "Nala",
      tamano: "pequeno",
      sexo: "hembra",
      modalidades: ["adopcion", "apadrinar"]
    },
    {
      id: "toby",
      nombre: "Toby",
      tamano: "grande",
      sexo: "macho",
      modalidades: ["adopcion", "apadrinar"]
    }
  ]
};

function obtenerBaseDatos() {
  try {
    const guardada = localStorage.getItem(CLAVE_BD_ADOPCION);
    if (guardada) {
      return JSON.parse(guardada);
    }
    localStorage.setItem(CLAVE_BD_ADOPCION, JSON.stringify(BASE_DATOS_INICIAL));
    return BASE_DATOS_INICIAL;
  } catch (error) {
    return BASE_DATOS_INICIAL;
  }
}

function renderizarMetricas(bd) {
  const adopcionesEl = document.getElementById("metrica-adopciones");
  const apadrinadosEl = document.getElementById("metrica-apadrinados");
  const veterinariaEl = document.getElementById("metrica-veterinaria");

  if (adopcionesEl) {
    adopcionesEl.textContent = bd.estadisticas.adopcionesConcretadas;
  }
  if (apadrinadosEl) {
    apadrinadosEl.textContent = bd.estadisticas.canesApadrinados;
  }
  if (veterinariaEl) {
    veterinariaEl.textContent = bd.estadisticas.controlesVeterinarios;
  }
}

function inicializarFiltros(bd) {
  const filtroTamano = document.getElementById("filtro-tamano");
  const filtroSexo = document.getElementById("filtro-sexo");
  const filtroModalidad = document.getElementById("filtro-modalidad");
  const estadoCatalogo = document.getElementById("estado-catalogo");
  const elementosLista = document.querySelectorAll(".grilla-canes > li");

  if (!filtroTamano || !filtroSexo || !filtroModalidad || !elementosLista.length) {
    return;
  }

  function aplicarFiltros() {
    const tamanoSel = filtroTamano.value;
    const sexoSel = filtroSexo.value;
    const modalidadSel = filtroModalidad.value;
    let visibles = 0;

    elementosLista.forEach((item) => {
      const idCan = item.querySelector("[id^='can-']")?.id.replace("can-", "").replace("-nombre", "");
      const canData = bd.canesDestacados.find((c) => c.id === idCan);

      if (!canData) {
        item.classList.remove("oculto");
        visibles += 1;
        return;
      }

      const cumpleTamano = tamanoSel === "todos" || canData.tamano === tamanoSel;
      const cumpleSexo = sexoSel === "todos" || canData.sexo === sexoSel;
      const cumpleModalidad = modalidadSel === "todos" || canData.modalidades.includes(modalidadSel);

      if (cumpleTamano && cumpleSexo && cumpleModalidad) {
        item.classList.remove("oculto");
        visibles += 1;
      } else {
        item.classList.add("oculto");
      }
    });

    if (estadoCatalogo) {
      estadoCatalogo.textContent =
        visibles === 0
          ? "No hay perros destacados que coincidan con esos filtros. Cambia algún criterio para ver opciones."
          : `Mostrando ${visibles} perfil(es) de perros según los filtros seleccionados.`;
    }
  }

  filtroTamano.addEventListener("change", aplicarFiltros);
  filtroSexo.addEventListener("change", aplicarFiltros);
  filtroModalidad.addEventListener("change", aplicarFiltros);
}

document.addEventListener("DOMContentLoaded", () => {
  const baseDatos = obtenerBaseDatos();
  renderizarMetricas(baseDatos);
  inicializarFiltros(baseDatos);
});