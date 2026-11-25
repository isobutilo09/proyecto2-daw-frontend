// ===== Validación de formularios en tiempo real =====
// Sin tooltips del navegador: los errores se pintan en el DOM bajo cada campo.
// Necesita modal.js cargado antes.

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Matrícula actual (1234 ABC) o antigua (M-1234-AB)
const REGEX_MATRICULA = /^(\d{4}\s?[A-Z]{3}|[A-Z]{1,2}-?\d{4}-?[A-Z]{1,2})$/i;

// ---------- Reglas: cada una devuelve un mensaje de error, o "" si todo está bien ----------

function reglaTexto(mensajeVacio, minimo, mensajeCorto) {
  return function (input) {
    const valor = input.value.trim();
    if (valor === "") {
      return mensajeVacio;
    }
    if (valor.length < minimo) {
      return mensajeCorto;
    }
    return "";
  };
}

function reglaEmail(input) {
  const valor = input.value.trim();
  if (valor === "") {
    return "Escribe tu email.";
  }
  if (!REGEX_EMAIL.test(valor)) {
    return "El email no es válido. Ejemplo: correo@ejemplo.com";
  }
  return "";
}

function reglaPasswordLogin(input) {
  if (input.value === "") {
    return "Escribe tu contraseña.";
  }
  return "";
}

function reglaPasswordRegistro(input) {
  const valor = input.value;
  if (valor === "") {
    return "Crea una contraseña.";
  }
  if (valor.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  if (!/[A-Za-z]/.test(valor) || !/\d/.test(valor)) {
    return "Incluye al menos una letra y un número.";
  }
  return "";
}

function reglaConfirmarPassword(input) {
  const original = document.getElementById("password");
  if (input.value === "") {
    return "Repite la contraseña.";
  }
  if (input.value !== original.value) {
    return "Las contraseñas no coinciden.";
  }
  return "";
}

function reglaTerminos(input) {
  if (!input.checked) {
    return "Debes aceptar los términos para continuar.";
  }
  return "";
}

function reglaAnio(input) {
  const valor = input.value.trim();
  const anioActual = new Date().getFullYear();
  if (valor === "") {
    return "Indica el año del coche.";
  }
  const numero = Number(valor);
  if (!Number.isInteger(numero)) {
    return "El año debe ser un número entero.";
  }
  if (numero < 1900 || numero > anioActual) {
    return "El año debe estar entre 1900 y " + anioActual + ".";
  }
  return "";
}

function reglaMatricula(input) {
  const valor = input.value.trim();
  if (valor === "") {
    return "Indica la matrícula.";
  }
  if (!REGEX_MATRICULA.test(valor)) {
    return "Formato no válido. Ejemplo: 1234 ABC";
  }
  return "";
}

function reglaKm(input) {
  const valor = input.value.trim();
  if (valor === "") {
    return "Indica el kilometraje.";
  }
  const numero = Number(valor);
  if (Number.isNaN(numero) || numero < 0) {
    return "El kilometraje debe ser un número positivo.";
  }
  if (numero > 2000000) {
    return "Revisa el kilometraje, parece demasiado alto.";
  }
  return "";
}

function reglaDescripcion(input) {
  // Opcional, pero con límite
  if (input.value.length > 300) {
    return "La descripción no puede superar los 300 caracteres.";
  }
  return "";
}

// ---------- Qué reglas usa cada formulario (clave = id del campo) ----------

const formularios = {
  "form-login": {
    email: reglaEmail,
    password: reglaPasswordLogin
  },
  "form-registro": {
    nombre: reglaTexto("Escribe tu nombre.", 2, "El nombre debe tener al menos 2 letras."),
    email: reglaEmail,
    password: reglaPasswordRegistro,
    password2: reglaConfirmarPassword,
    terminos: reglaTerminos
  },
  "form-crear": {
    marca: reglaTexto("Indica la marca.", 2, "La marca debe tener al menos 2 letras."),
    modelo: reglaTexto("Indica el modelo.", 1, "Indica el modelo."),
    anio: reglaAnio,
    matricula: reglaMatricula,
    km: reglaKm,
    desc: reglaDescripcion
  }
};

// ---------- Mostrar / quitar errores en el DOM ----------

function mostrarError(input, mensaje) {
  let parrafo = document.getElementById(input.id + "-error");

  if (!parrafo) {
    parrafo = document.createElement("p");
    parrafo.id = input.id + "-error";
    parrafo.className = "error";
    parrafo.setAttribute("aria-live", "polite");

    if (input.type === "checkbox") {
      input.closest("label").after(parrafo);
    } else {
      input.closest(".field").appendChild(parrafo);
    }
  }

  if (mensaje === "") {
    parrafo.textContent = "";
    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
  } else {
    parrafo.textContent = mensaje;
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", parrafo.id);
  }
}

// Valida un campo y devuelve true si está bien
function validarCampo(input, regla) {
  const mensaje = regla(input);
  mostrarError(input, mensaje);
  return mensaje === "";
}

// ---------- Conectar eventos ----------

function iniciarFormulario(formulario) {
  const reglas = formularios[formulario.id];
  const ids = Object.keys(reglas);

  ids.forEach(function (id) {
    const input = document.getElementById(id);
    if (!input) {
      return;
    }
    const regla = reglas[id];

    // Al salir del campo: validar y marcarlo como "tocado"
    input.addEventListener("blur", function () {
      input.dataset.tocado = "si";
      validarCampo(input, regla);
    });

    // Mientras escribe: solo si ya salió del campo una vez (así no avisa antes de tiempo)
    if (input.type === "checkbox") {
      input.addEventListener("change", function () {
        validarCampo(input, regla);
      });
    } else {
      input.addEventListener("input", function () {
        if (input.dataset.tocado === "si") {
          validarCampo(input, regla);
        }
        // Si cambia la contraseña, hay que revisar de nuevo la confirmación
        if (id === "password" && reglas.password2) {
          const confirmacion = document.getElementById("password2");
          if (confirmacion.dataset.tocado === "si") {
            validarCampo(confirmacion, reglas.password2);
          }
        }
      });
    }
  });

  formulario.addEventListener("submit", function (evento) {
    let primerInvalido = null;

    ids.forEach(function (id) {
      const input = document.getElementById(id);
      if (!input) {
        return;
      }
      input.dataset.tocado = "si";
      const correcto = validarCampo(input, reglas[id]);
      if (!correcto && primerInvalido === null) {
        primerInvalido = input;
      }
    });

    if (primerInvalido !== null) {
      evento.preventDefault();
      primerInvalido.focus();
      return;
    }

    // Todo correcto: cada formulario termina de forma distinta
    if (formulario.id === "form-registro") {
      evento.preventDefault();
      mostrarModal({
        titulo: "¡Cuenta creada!",
        mensaje: "Tu cuenta se ha creado correctamente. Ahora puedes iniciar sesión.",
        textoConfirmar: "Ir a iniciar sesión",
        alConfirmar: function () {
          window.location.href = "login.html";
        }
      });
    }

    if (formulario.id === "form-crear") {
      evento.preventDefault();
      mostrarModal({
        titulo: "Vehículo guardado",
        mensaje: "Tu coche se ha añadido a Mi garaje.",
        textoConfirmar: "Ver mi garaje",
        alConfirmar: function () {
          window.location.href = "../index.html";
        }
      });
    }
    // El login sigue su camino normal (action="../index.html")
  });
}

document.querySelectorAll("form[novalidate]").forEach(function (formulario) {
  if (formularios[formulario.id]) {
    iniciarFormulario(formulario);
  }
});
