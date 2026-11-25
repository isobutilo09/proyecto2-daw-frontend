// ===== Datos simulados (la "base de datos" del Proyecto 1) =====
// Cada objeto es un coche del garaje de Carlos.
// Si "foto" está vacía, la tarjeta muestra un recuadro "Sin foto".
// "historial" = mantenimiento (titulo, km, precio en euros). "mods" = modificaciones instaladas.

const coches = [
  {
    id: 1,
    marca: "BMW",
    modelo: "E36 325i",
    anio: 1994,
    km: 183240,
    foto: "assets/img/bmw-e36.jpg",
    historial: [
      { titulo: "Cambio de aceite", km: 163000, precio: 120 },
      { titulo: "Cambio de neumáticos", km: 172000, precio: 480 }
    ],
    mods: ["Suspensión Bilstein", "Escape deportivo", "Llantas BBS"]
  },
  {
    id: 2,
    marca: "Mazda",
    modelo: "MX-5",
    anio: 2003,
    km: 124509,
    foto: "assets/img/mazda-mx5.jpg",
    historial: [
      { titulo: "Cambio de aceite", km: 110000, precio: 95 },
      { titulo: "Cambio de pastillas de freno", km: 118000, precio: 160 }
    ],
    mods: ["Capota nueva", "Barra anti-vuelco"]
  },
  {
    id: 3,
    marca: "Seat",
    modelo: "Ibiza FR",
    anio: 2008,
    km: 98700,
    foto: "",
    historial: [
      { titulo: "Cambio de aceite", km: 90000, precio: 80 },
      { titulo: "Cambio de correa de distribución", km: 95000, precio: 420 }
    ],
    mods: ["Llantas de 17 pulgadas"]
  },
  {
    id: 4,
    marca: "Volkswagen",
    modelo: "Golf GTI",
    anio: 2012,
    km: 142300,
    foto: "",
    historial: [
      { titulo: "Cambio de aceite", km: 135000, precio: 110 },
      { titulo: "Cambio de neumáticos", km: 138000, precio: 520 }
    ],
    mods: ["Reprogramación de centralita", "Filtro de aire deportivo"]
  },
  {
    id: 5,
    marca: "Renault",
    modelo: "Clio Williams",
    anio: 1993,
    km: 201900,
    foto: "",
    historial: [
      { titulo: "Cambio de aceite", km: 195000, precio: 75 }
    ],
    mods: []
  }
];
