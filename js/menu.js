// ===== Menú hamburguesa (móvil) =====

const botonMenu = document.querySelector(".nav-toggle");
const menuPrincipal = document.getElementById("menu-principal");

function abrirMenu() {
  menuPrincipal.classList.add("abierto");
  botonMenu.setAttribute("aria-expanded", "true");
  botonMenu.setAttribute("aria-label", "Cerrar menú");
}

function cerrarMenu() {
  menuPrincipal.classList.remove("abierto");
  botonMenu.setAttribute("aria-expanded", "false");
  botonMenu.setAttribute("aria-label", "Abrir menú");
}

if (botonMenu && menuPrincipal) {
  botonMenu.addEventListener("click", function () {
    if (menuPrincipal.classList.contains("abierto")) {
      cerrarMenu();
    } else {
      abrirMenu();
    }
  });

  // Escape cierra el menú
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      cerrarMenu();
    }
  });

  // Al pasar a tablet/escritorio el menú vuelve a su estado normal
  window.matchMedia("(min-width: 768px)").addEventListener("change", cerrarMenu);
}
