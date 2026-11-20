const CLAVE_BD_ADOPCION = "ADOPCION_PERROS_BD_2021_2026";

const BASE_DATOS_INICIAL = {
  periodo: "2021-2026",
  estadisticas: {
    adopcionesConcretadas: 248,
    canesApadrinados: 64,
    controlesVeterinarios: 512,
    aporteAcumuladoMensual: 1920
  },
  historicoAnual: [
    { anio: 2021, rescates: 45, adopciones: 32, apadrinamientos: 10 },
    { anio: 2022, rescates: 58, adopciones: 41, apadrinamientos: 12 },
    { anio: 2023, rescates: 67, adopciones: 50, apadrinamientos: 14 },
    { anio: 2024, rescates: 74, adopciones: 56, apadrinamientos: 13 },
    { anio: 2025, rescates: 69, adopciones: 51, apadrinamientos: 9 },
    { anio: 2026, rescates: 48, adopciones: 38, apadrinamientos: 6 }
  ],
  perros: [
    {
      id: "bobby",
      nombre: "Bobby",
      raza: "Mestizo",
      tamano: "mediano",
      faseVida: "juvenil",
      edadTexto: "1 año y 8 meses",
      sexo: "macho",
      caracter: "Sociable, curioso y muy cariñoso",
      historia: "Llegó buscando una segunda oportunidad y hoy espera una familia que comparta paseos y juegos diarios.",
      imagen: "perros/bobby.jpg",
      modalidades: ["adopcion", "apadrinar"],
      estado: "Disponible"
    },
    {
      id: "nala",
      nombre: "Nala",
      raza: "Schnauzer Mestizo",
      tamano: "pequeno",
      faseVida: "cachorro",
      edadTexto: "7 meses",
      sexo: "hembra",
      caracter: "Alegre, atenta y adaptable a espacios reducidos",
      historia: "Pequeña y llena de energía buena; busca un hogar paciente para seguir aprendiendo rutinas.",
      imagen: "perros/nala.jpg",
      modalidades: ["adopcion", "apadrinar"],
      estado: "Disponible"
    },
    {
      id: "toby",
      nombre: "Toby",
      raza: "Labrador Retriever Mestizo",
      tamano: "grande",
      faseVida: "adulto-viejo",
      edadTexto: "7 años",
      sexo: "macho",
      caracter: "Noble, calmado y de compañía leal",
      historia: "Perro adulto-mayor con gran nobleza; ideal para quienes valoran la calma y el acompañamiento fiel.",
      imagen: "perros/toby.jpg",
      modalidades: ["adopcion", "apadrinar"],
      estado: "Disponible"
    }
  ],
  postulaciones: [],
  apadrinamientos: [],
  controlesMedicos: []
};

function obtenerBaseDatos() {
  try {
    const raw = localStorage.getItem(CLAVE_BD_ADOPCION);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...BASE_DATOS_INICIAL,
        ...parsed,
        estadisticas: {
          ...BASE_DATOS_INICIAL.estadisticas,
          ...(parsed.estadisticas || {})
        },
        perros: Array.isArray(parsed.perros) && parsed.perros.length ? parsed.perros : BASE_DATOS_INICIAL.perros,
        historicoAnual: Array.isArray(parsed.historicoAnual) && parsed.historicoAnual.length
          ? parsed.historicoAnual
          : BASE_DATOS_INICIAL.historicoAnual
      };
    }
    localStorage.setItem(CLAVE_BD_ADOPCION, JSON.stringify(BASE_DATOS_INICIAL));
    return structuredClone(BASE_DATOS_INICIAL);
  } catch (e) {
    return structuredClone(BASE_DATOS_INICIAL);
  }
}

function guardarBaseDatos(bd) {
  try {
    localStorage.setItem(CLAVE_BD_ADOPCION, JSON.stringify(bd));
  } catch (e) {
    // Sin bloqueo si el almacenamiento no está disponible
  }
}

function formatearFaseVida(fase) {
  const mapa = {
    "cachorro": "Cachorro",
    "juvenil": "Juvenil",
    "adulto-viejo": "Adulto / Viejo"
  };
  return mapa[fase] || fase;
}

function formatearTamano(tamano) {
  const mapa = {
    "pequeno": "Pequeño",
    "mediano": "Mediano",
    "grande": "Grande"
  };
  return mapa[tamano] || tamano;
}

function renderizarMetricas(bd) {
  const elAdop = document.getElementById("metrica-adopciones");
  const elApad = document.getElementById("metrica-apadrinados");
  const elVet = document.getElementById("metrica-veterinaria");

  if (elAdop) elAdop.textContent = bd.estadisticas.adopcionesConcretadas;
  if (elApad) elApad.textContent = bd.estadisticas.canesApadrinados;
  if (elVet) elVet.textContent = bd.estadisticas.controlesVeterinarios;
}

function dibujarGraficoImpacto(bd) {
  const canvas = document.getElementById("grafico-impacto");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const ancho = canvas.width;
  const alto = canvas.height;
  ctx.clearRect(0, 0, ancho, alto);

  const margenIzq = 48;
  const margenDer = 24;
  const margenSup = 36;
  const margenInf = 48;
  const areaAncho = ancho - margenIzq - margenDer;
  const areaAlto = alto - margenSup - margenInf;

  const datos = bd.historicoAnual;
  const maxValor = Math.max(
    10,
    ...datos.flatMap((d) => [d.rescates, d.adopciones, d.apadrinamientos])
  );

  // Ejes
  ctx.strokeStyle = "#9aa7a0";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(margenIzq, margenSup);
  ctx.lineTo(margenIzq, margenSup + areaAlto);
  ctx.lineTo(margenIzq + areaAncho, margenSup + areaAlto);
  ctx.stroke();

  // Leyenda superior
  const series = [
    { key: "rescates", label: "Rescates", color: "#1b5e4a" },
    { key: "adopciones", label: "Adopciones", color: "#d96b27" },
    { key: "apadrinamientos", label: "Apadrinamientos", color: "#2b6cb0" }
  ];

  let posLeyendaX = margenIzq;
  ctx.font = "600 12px 'Segoe UI', sans-serif";
  series.forEach((s) => {
    ctx.fillStyle = s.color;
    ctx.fillRect(posLeyendaX, 10, 12, 12);
    ctx.fillStyle = "#1e2421";
    ctx.fillText(s.label, posLeyendaX + 18, 20);
    posLeyendaX += ctx.measureText(s.label).width + 38;
  });

  // Barras por año
  const grupoAncho = areaAncho / datos.length;
  const barraAncho = Math.min(22, (grupoAncho - 24) / 3);

  datos.forEach((item, idx) => {
    const baseX = margenIzq + idx * grupoAncho + (grupoAncho - barraAncho * 3) / 2;

    series.forEach((s, bIdx) => {
      const val = item[s.key] || 0;
      const alturaBarra = (val / maxValor) * (areaAlto - 10);
      const x = baseX + bIdx * barraAncho;
      const y = margenSup + areaAlto - alturaBarra;

      ctx.fillStyle = s.color;
      ctx.fillRect(x, y, barraAncho - 2, alturaBarra);

      ctx.fillStyle = "#1e2421";
      ctx.font = "11px 'Segoe UI', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(val), x + (barraAncho - 2) / 2, y - 4);
    });

    ctx.fillStyle = "#1e2421";
    ctx.font = "700 12px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(item.anio), margenIzq + idx * grupoAncho + grupoAncho / 2, margenSup + areaAlto + 20);
  });

  ctx.textAlign = "left";
}

function poblarFiltroRazas(bd) {
  const selectRaza = document.getElementById("filtro-raza");
  if (!selectRaza) return;

  const valorActual = selectRaza.value || "todas";
  const razasUnicas = [...new Set(bd.perros.map((p) => p.raza))];

  selectRaza.innerHTML = `<option value="todas">Todas las razas</option>`;
  razasUnicas.forEach((raza) => {
    const opt = document.createElement("option");
    opt.value = raza;
    opt.textContent = raza;
    selectRaza.appendChild(opt);
  });

  if ([...selectRaza.options].some((o) => o.value === valorActual)) {
    selectRaza.value = valorActual;
  }
}

function crearElementoTarjetaPerro(perro, rutaBase = "") {
  const li = document.createElement("li");
  const article = document.createElement("article");
  article.className = "tarjeta-can";

  const figure = document.createElement("figure");
  figure.className = "media-can";

  const img = document.createElement("img");
  img.src = `${rutaBase}${perro.imagen}`;
  img.alt = `Fotografía de ${perro.nombre}, raza ${perro.raza}, tamaño ${formatearTamano(perro.tamano)} y etapa ${formatearFaseVida(perro.faseVida)}`;

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = `${perro.raza} · ${formatearTamano(perro.tamano)} · ${formatearFaseVida(perro.faseVida)}`;

  figure.append(img, figcaption);

  const header = document.createElement("header");
  header.className = "cabecera-can";

  const h3 = document.createElement("h3");
  h3.textContent = perro.nombre;

  const estadoP = document.createElement("p");
  estadoP.className = "etiqueta-estado";
  estadoP.textContent = perro.estado;

  header.append(h3, estadoP);

  const dl = document.createElement("dl");
  dl.className = "ficha-can";

  const campos = [
    ["Raza", perro.raza],
    ["Tamaño", formatearTamano(perro.tamano)],
    ["Fase de vida", formatearFaseVida(perro.faseVida)],
    ["Edad", perro.edadTexto],
    ["Sexo", perro.sexo === "hembra" ? "Hembra" : "Macho"],
    ["Carácter", perro.caracter]
  ];

  campos.forEach(([dtTexto, ddTexto]) => {
    const dt = document.createElement("dt");
    dt.textContent = dtTexto;
    const dd = document.createElement("dd");
    dd.textContent = ddTexto;
    dl.append(dt, dd);
  });

  const historiaP = document.createElement("p");
  historiaP.className = "historia-can";
  historiaP.textContent = `“${perro.historia}”`;

  const footerCard = document.createElement("footer");
  footerCard.className = "acciones-can";

  const rutaAdopcion = `${rutaBase}adopciones/index.html`;
  const linkAdoptar = document.createElement("a");
  linkAdoptar.className = "boton boton-primario";
  linkAdoptar.href = `${rutaAdopcion}?can=${encodeURIComponent(perro.id)}&tipo=adopcion`;
  linkAdoptar.textContent = "Postular para adoptar";

  const linkApadrinar = document.createElement("a");
  linkApadrinar.className = "boton boton-secundario";
  linkApadrinar.href = `${rutaAdopcion}?can=${encodeURIComponent(perro.id)}&tipo=apadrinar`;
  linkApadrinar.textContent = "Apadrinar";

  footerCard.append(linkAdoptar, linkApadrinar);
  article.append(figure, header, dl, historiaP, footerCard);
  li.appendChild(article);
  return li;
}

function renderizarCatalogoFiltrado(bd, rutaBase = "") {
  const contenedor = document.getElementById("catalogo-lista-dinamica");
  const estadoCatalogo = document.getElementById("estado-catalogo");
  if (!contenedor) return;

  const tamanoSel = document.getElementById("filtro-tamano")?.value || "todos";
  const razaSel = document.getElementById("filtro-raza")?.value || "todas";
  const faseSel = document.getElementById("filtro-fase")?.value || "todas";
  const modalidadSel = document.getElementById("filtro-modalidad")?.value || "todos";

  const filtrados = bd.perros.filter((perro) => {
    const okTamano = tamanoSel === "todos" || perro.tamano === tamanoSel;
    const okRaza = razaSel === "todas" || perro.raza === razaSel;
    const okFase = faseSel === "todas" || perro.faseVida === faseSel;
    const okMod = modalidadSel === "todos" || perro.modalidades.includes(modalidadSel);
    return okTamano && okRaza && okFase && okMod;
  });

  contenedor.innerHTML = "";
  if (filtrados.length === 0) {
    if (estadoCatalogo) {
      estadoCatalogo.textContent = "No hay perros registrados que coincidan con los filtros seleccionados.";
    }
    return;
  }

  filtrados.forEach((perro) => {
    contenedor.appendChild(crearElementoTarjetaPerro(perro, rutaBase));
  });

  if (estadoCatalogo) {
    estadoCatalogo.textContent = `Mostrando ${filtrados.length} perro(s) según raza, tamaño, fase de vida y modalidad.`;
  }
}

function inicializarEventosGlobales(bd) {
  ["filtro-tamano", "filtro-raza", "filtro-fase", "filtro-modalidad"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", () => renderizarCatalogoFiltrado(bd, ""));
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const bd = obtenerBaseDatos();
  guardarBaseDatos(bd);
  poblarFiltroRazas(bd);
  renderizarMetricas(bd);
  renderizarCatalogoFiltrado(bd, "");
  dibujarGraficoImpacto(bd);
  inicializarEventosGlobales(bd);
});
