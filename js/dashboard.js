// ===== Dashboard: tarjetas dinámicas + buscador + eliminar =====
// Necesita mockData.js (array "coches") y modal.js cargados antes.

let listaCoches = coches.slice(); // copia, para poder eliminar sin tocar el original

const contenedorTarjetas = document.querySelector(".cards");
const buscador = document.getElementById("buscador");
const sinResultados = document.getElementById("sin-resultados");
const contador = document.getElementById("contador");
const resumen = document.getElementById("resumen");

// Pasa a minúsculas y quita tildes, para que "ibiza" encuentre "Ibiza" y "Mazda" a "mazda"
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function textoCoches(cantidad) {
  if (cantidad === 1) {
    return "1 coche";
  }
  return cantidad + " coches";
}

function crearTarjeta(coche) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "card";

  // Foto, o recuadro "Sin foto" si el coche no tiene
  if (coche.foto !== "") {
    const imagen = document.createElement("img");
    imagen.src = coche.foto;
    imagen.alt = coche.marca + " " + coche.modelo;
    imagen.width = 640;
    imagen.height = 360;
    tarjeta.appendChild(imagen);
  } else {
    const sinFoto = document.createElement("div");
    sinFoto.className = "card-sin-foto";
    sinFoto.textContent = "Sin foto";
    tarjeta.appendChild(sinFoto);
  }

  const cuerpo = document.createElement("div");
  cuerpo.className = "card-body";

  const titulo = document.createElement("h2");
  titulo.textContent = coche.marca + " " + coche.modelo;

  const datos = document.createElement("p");
  datos.className = "muted";
  datos.textContent = coche.anio + " | " + coche.km.toLocaleString("es-ES") + " km";

  const acciones = document.createElement("div");
  acciones.className = "card-actions";

  const enlace = document.createElement("a");
  enlace.className = "link-accent";
  enlace.href = "pages/detalle.html?id=" + coche.id;
  enlace.textContent = "Ver vehículo";

  const botonEliminar = document.createElement("button");
  botonEliminar.type = "button";
  botonEliminar.className = "btn btn-outline btn-sm";
  botonEliminar.textContent = "Eliminar";
  botonEliminar.addEventListener("click", function () {
    pedirConfirmacionEliminar(coche);
  });

  acciones.appendChild(enlace);
  acciones.appendChild(botonEliminar);

  cuerpo.appendChild(titulo);
  cuerpo.appendChild(datos);
  cuerpo.appendChild(acciones);
  tarjeta.appendChild(cuerpo);

  return tarjeta;
}

function pedirConfirmacionEliminar(coche) {
  mostrarModal({
    titulo: "Eliminar vehículo",
    mensaje: "¿Seguro que quieres eliminar el " + coche.marca + " " + coche.modelo + "? Esta acción no se puede deshacer.",
    textoConfirmar: "Eliminar",
    textoCancelar: "Cancelar",
    alConfirmar: function () {
      listaCoches = listaCoches.filter(function (c) {
        return c.id !== coche.id;
      });
      actualizarVista();
    }
  });
}

// Devuelve los coches que coinciden con lo escrito en el buscador
function obtenerFiltrados() {
  const texto = normalizar(buscador.value.trim());
  if (texto === "") {
    return listaCoches;
  }
  return listaCoches.filter(function (coche) {
    const contenido = normalizar(coche.marca + " " + coche.modelo + " " + coche.anio);
    return contenido.includes(texto);
  });
}

function pintarTarjetas(lista) {
  contenedorTarjetas.innerHTML = "";
  lista.forEach(function (coche) {
    contenedorTarjetas.appendChild(crearTarjeta(coche));
  });

  contador.textContent = textoCoches(listaCoches.length);

  if (lista.length === listaCoches.length) {
    resumen.textContent = textoCoches(listaCoches.length) + " en tu garaje";
  } else {
    resumen.textContent = "Mostrando " + lista.length + " de " + listaCoches.length;
  }

  if (lista.length === 0) {
    if (listaCoches.length === 0) {
      sinResultados.textContent = "Tu garaje está vacío. Añade tu primer coche.";
    } else {
      sinResultados.textContent = "Ningún coche coincide con tu búsqueda.";
    }
    sinResultados.hidden = false;
  } else {
    sinResultados.hidden = true;
  }
}

function actualizarVista() {
  pintarTarjetas(obtenerFiltrados());
}

buscador.addEventListener("input", actualizarVista);

actualizarVista();
