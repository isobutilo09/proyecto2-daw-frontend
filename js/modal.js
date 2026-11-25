// ===== Modales reutilizables (usa la etiqueta <dialog>) =====
//
// mostrarModal({
//   titulo: "Texto del título",
//   mensaje: "Texto del mensaje",
//   textoConfirmar: "Aceptar",
//   textoCancelar: "Cancelar",   // opcional: si no se pone, es un simple aviso
//   alConfirmar: function () {}  // opcional
// });

function mostrarModal(opciones) {
  const dialogo = document.createElement("dialog");
  dialogo.className = "modal";
  dialogo.setAttribute("aria-labelledby", "modal-titulo");

  const titulo = document.createElement("h2");
  titulo.id = "modal-titulo";
  titulo.textContent = opciones.titulo;

  const mensaje = document.createElement("p");
  mensaje.textContent = opciones.mensaje;

  const acciones = document.createElement("div");
  acciones.className = "modal-actions";

  if (opciones.textoCancelar) {
    const botonCancelar = document.createElement("button");
    botonCancelar.type = "button";
    botonCancelar.className = "btn btn-outline";
    botonCancelar.textContent = opciones.textoCancelar;
    botonCancelar.addEventListener("click", function () {
      dialogo.close("cancelar");
    });
    acciones.appendChild(botonCancelar);
  }

  const botonConfirmar = document.createElement("button");
  botonConfirmar.type = "button";
  botonConfirmar.className = "btn";
  botonConfirmar.textContent = opciones.textoConfirmar || "Aceptar";
  botonConfirmar.addEventListener("click", function () {
    dialogo.close("confirmar");
  });
  acciones.appendChild(botonConfirmar);

  dialogo.appendChild(titulo);
  dialogo.appendChild(mensaje);
  dialogo.appendChild(acciones);

  // Clic fuera de la caja (en el fondo oscuro) = cerrar
  dialogo.addEventListener("click", function (evento) {
    if (evento.target === dialogo) {
      dialogo.close("cancelar");
    }
  });

  dialogo.addEventListener("close", function () {
    // En un aviso (sin botón cancelar) la acción se ejecuta siempre;
    // en una confirmación, solo si se pulsa el botón de confirmar.
    if (opciones.alConfirmar) {
      if (opciones.textoCancelar) {
        if (dialogo.returnValue === "confirmar") {
          opciones.alConfirmar();
        }
      } else {
        opciones.alConfirmar();
      }
    }
    dialogo.remove();
  });

  document.body.appendChild(dialogo);
  dialogo.showModal();
  botonConfirmar.focus();
}
