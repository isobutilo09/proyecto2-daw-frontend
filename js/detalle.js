// ===== Ficha del vehículo (detalle.html?id=...) =====
// Necesita mockData.js (array "coches") cargado antes.

const parametros = new URLSearchParams(window.location.search);
const idCoche = Number(parametros.get("id"));

const coche = coches.find(function (c) {
  return c.id === idCoche;
});

const contenido = document.getElementById("contenido-detalle");
const noEncontrado = document.getElementById("no-encontrado");
const titulo = document.getElementById("detalle-titulo");

function pintarFoto(coche) {
  const contenedor = document.getElementById("detalle-foto");

  if (coche.foto !== "") {
    const imagen = document.createElement("img");
    imagen.className = "big-img";
    imagen.src = "../" + coche.foto;
    imagen.alt = coche.marca + " " + coche.modelo;
    imagen.width = 800;
    imagen.height = 500;
    contenedor.appendChild(imagen);
  } else {
    const sinFoto = document.createElement("div");
    sinFoto.className = "card-sin-foto big-img";
    sinFoto.textContent = "Sin foto";
    contenedor.appendChild(sinFoto);
  }
}

function pintarHistorial(coche) {
  const lista = document.getElementById("detalle-historial");

  if (coche.historial.length === 0) {
    const vacio = document.createElement("li");
    vacio.className = "muted";
    vacio.textContent = "Todavía no hay mantenimientos registrados.";
    lista.appendChild(vacio);
    return;
  }

  coche.historial.forEach(function (registro) {
    const fila = document.createElement("li");

    const articulo = document.createElement("article");
    const nombre = document.createElement("h3");
    nombre.textContent = registro.titulo;
    const km = document.createElement("p");
    km.className = "muted";
    km.textContent = registro.km.toLocaleString("es-ES") + " km";
    articulo.appendChild(nombre);
    articulo.appendChild(km);

    const precio = document.createElement("span");
    precio.textContent = registro.precio + " €";

    fila.appendChild(articulo);
    fila.appendChild(precio);
    lista.appendChild(fila);
  });
}

function pintarMods(coche) {
  const lista = document.getElementById("detalle-mods");

  if (coche.mods.length === 0) {
    const vacio = document.createElement("li");
    vacio.textContent = "Sin modificaciones";
    lista.appendChild(vacio);
    return;
  }

  coche.mods.forEach(function (mod) {
    const chip = document.createElement("li");
    chip.textContent = mod;
    lista.appendChild(chip);
  });
}

if (coche) {
  const nombreCompleto = coche.marca + " " + coche.modelo;

  document.title = nombreCompleto + " | GarageHub";
  titulo.textContent = nombreCompleto;
  document.getElementById("detalle-anio").textContent = coche.anio;
  document.getElementById("detalle-km").textContent = coche.km.toLocaleString("es-ES") + " km";

  pintarFoto(coche);
  pintarHistorial(coche);
  pintarMods(coche);

  contenido.hidden = false;
} else {
  document.title = "Vehículo no encontrado | GarageHub";
  titulo.textContent = "Vehículo no encontrado";
  noEncontrado.hidden = false;
}
