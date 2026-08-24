const products = [
  {
    id: "cam-1",
    category: "camisetas",
    emoji: "👕",
    imgClass: "img-camiseta-1",
    tag: "Primera equipación",
    name: "Camiseta Local 2026/27",
    desc: "Los colores blaugrana clásicos con la tecnología de secado rápido.",
    price: 99.99
  },
  {
    id: "cam-2",
    category: "camisetas",
    emoji: "🎽",
    imgClass: "img-camiseta-2",
    tag: "Segunda equipación",
    name: "Camiseta Visitante 2026/27",
    desc: "Diseño elegante en negro con detalles dorados del escudo.",
    price: 94.99
  },
  {
    id: "cam-3",
    category: "camisetas",
    emoji: "🥇",
    imgClass: "img-camiseta-3",
    tag: "Edición especial",
    name: "Camiseta Aniversario",
    desc: "Edición limitada dorada para celebrar los títulos del club.",
    price: 119.99
  },
  {
    id: "cam-retro",
    category: "camisetas",
    emoji: "🕰️",
    imgClass: "img-camiseta-retro",
    tag: "Retro",
    name: "Camiseta Retro 1992 Dream Team",
    desc: "Réplica de la mítica equipación del Dream Team de Cruyff.",
    price: 84.99
  },
  {
    id: "pel-1",
    category: "pelotas",
    emoji: "⚽",
    imgClass: "img-pelota-1",
    tag: "Match",
    name: "Balón Oficial LaLiga",
    desc: "Balón de partido con costuras térmicas y máximo agarre.",
    price: 59.99
  },
  {
    id: "pel-2",
    category: "pelotas",
    emoji: "🔵🔴",
    imgClass: "img-pelota-2",
    tag: "Entrenamiento",
    name: "Balón Blaugrana Training",
    desc: "Perfecto para entrenar con los colores del Barça.",
    price: 29.99
  },
  {
    id: "pel-3",
    category: "pelotas",
    emoji: "🏆",
    imgClass: "img-pelota-3",
    tag: "Colección",
    name: "Minibalón Champions",
    desc: "Minibalón coleccionable, ideal para regalar a culers pequeños.",
    price: 19.99
  }
];

const matches = [
  {
    id: "ent-1",
    rival: "Real Madrid",
    competition: "LaLiga",
    date: "Sábado 25 Octubre · 21:00 h",
    zone: "Grada Lateral",
    price: 149.99
  },
  {
    id: "ent-2",
    rival: "Atlético de Madrid",
    competition: "LaLiga",
    date: "Domingo 9 Noviembre · 18:30 h",
    zone: "Gol Norte",
    price: 109.99
  },
  {
    id: "ent-3",
    rival: "Bayern Múnich",
    competition: "UEFA Champions League",
    date: "Martes 2 Diciembre · 21:00 h",
    zone: "Tribuna Principal",
    price: 229.99
  }
];

const squad = [
  { number: 1, name: "Ter Stegen", position: "Portero", group: "porteros" },
  { number: 13, name: "Joan García", position: "Portero", group: "porteros" },
  { number: 2, name: "Cubarsí", position: "Defensa central", group: "defensas" },
  { number: 3, name: "Balde", position: "Lateral izquierdo", group: "defensas" },
  { number: 4, name: "Araújo", position: "Defensa central", group: "defensas" },
  { number: 5, name: "Christensen", position: "Defensa central", group: "defensas" },
  { number: 23, name: "Koundé", position: "Lateral derecho", group: "defensas" },
  { number: 24, name: "Eric García", position: "Defensa central", group: "defensas" },
  { number: 6, name: "Gavi", position: "Mediocentro", group: "centrocampistas" },
  { number: 8, name: "Pedri", position: "Mediocentro", group: "centrocampistas" },
  { number: 16, name: "Fermín López", position: "Mediapunta", group: "centrocampistas" },
  { number: 17, name: "Casadó", position: "Pivote", group: "centrocampistas" },
  { number: 20, name: "Dani Olmo", position: "Mediapunta", group: "centrocampistas" },
  { number: 21, name: "De Jong", position: "Pivote", group: "centrocampistas" },
  { number: 7, name: "Ferran Torres", position: "Extremo izquierdo", group: "delanteros" },
  { number: 9, name: "Lewandowski", position: "Delantero centro", group: "delanteros" },
  { number: 10, name: "Lamine Yamal", position: "Extremo derecho", group: "delanteros" },
  { number: 11, name: "Raphinha", position: "Extremo izquierdo", group: "delanteros" },
  { number: 14, name: "Rashford", position: "Delantero centro", group: "delanteros" }
];

const groupLabels = {
  porteros: "🧤 Porteros",
  defensas: "🛡️ Defensas",
  centrocampistas: "⚙️ Centrocampistas",
  delanteros: "⚡ Delanteros"
};

const cart = new Map();

const gridCamisetas = document.getElementById("grid-camisetas");
const gridPelotas = document.getElementById("grid-pelotas");
const gridEntradas = document.getElementById("grid-entradas");
const cartButton = document.getElementById("cart-button");
const closeCartBtn = document.getElementById("close-cart");
const cartDrawer = document.getElementById("cart-drawer");
const overlay = document.getElementById("overlay");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const toast = document.getElementById("toast");
const squadGroups = document.getElementById("squad-groups");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalClose = document.getElementById("modal-close");
const checkoutView = document.getElementById("checkout-view");
const successView = document.getElementById("success-view");
const successText = document.getElementById("success-text");
const closeSuccessBtn = document.getElementById("close-success");
const checkoutForm = document.getElementById("checkout-form");
const modalSummary = document.getElementById("modal-summary");
const formError = document.getElementById("form-error");

function formatPrice(value) {
  return value.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

function productCard(product) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="card-img ${product.imgClass}">${product.emoji}</div>
    <div class="card-body">
      <span class="card-tag">${product.tag}</span>
      <h3 class="card-title">${product.name}</h3>
      <p class="card-desc">${product.desc}</p>
      <span class="card-price">${formatPrice(product.price)}</span>
      <button class="add-btn">Añadir al carrito</button>
    </div>`;
  card.querySelector(".add-btn").addEventListener("click", () => addToCart(product));
  return card;
}

function ticketCard(match) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="card-img" style="background: linear-gradient(140deg, #004d98 0%, #a50044 100%); color:#fff; font-size:3.4rem;">🏟️</div>
    <div class="card-body">
      <span class="card-tag tag-ticket">${match.competition}</span>
      <h3 class="card-title"><strong>FC Barcelona vs ${match.rival}</strong></h3>
      <div class="ticket-info">
        <span>${match.date}</span>
        <span>Zona: <strong>${match.zone}</strong></span>
        <span>Spotify Camp Nou</span>
      </div>
      <span class="card-price">${formatPrice(match.price)}</span>
      <button class="add-btn">Comprar entrada</button>
    </div>`;
  card.querySelector(".add-btn").addEventListener("click", () =>
    addToCart({
      id: match.id,
      name: `Entrada vs ${match.rival} (${match.zone})`,
      price: match.price,
      emoji: "🎟️",
      singleUnit: true
    })
  );
  return card;
}

function renderProducts() {
  products
    .filter((p) => p.category === "camisetas")
    .forEach((p) => gridCamisetas.appendChild(productCard(p)));
  products
    .filter((p) => p.category === "pelotas")
    .forEach((p) => gridPelotas.appendChild(productCard(p)));
  matches.forEach((m) => gridEntradas.appendChild(ticketCard(m)));
}

function renderSquad() {
  Object.keys(groupLabels).forEach((groupKey) => {
    const title = document.createElement("h3");
    title.className = "group-title";
    title.textContent = groupLabels[groupKey];
    const grid = document.createElement("div");
    grid.className = "grid grid-squad";
    squad
      .filter((p) => p.group === groupKey)
      .forEach((p) => {
        const card = document.createElement("article");
        card.className = "player-card";
        card.innerHTML = `
          <div class="player-number">${p.number}</div>
          <h4 class="player-name">${p.name}</h4>
          <span class="player-position">${p.position}</span>`;
        grid.appendChild(card);
      });
    squadGroups.appendChild(title);
    squadGroups.appendChild(grid);
  });
}

function addToCart(item) {
  if (item.singleUnit && cart.has(item.id)) {
    showToast("Ya tienes una entrada para este partido en el carrito");
    return;
  }
  const existing = cart.get(item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.set(item.id, { ...item, qty: 1 });
  }
  renderCart();
  showToast(`${item.name} añadido al carrito`);
  openCart();
}

function changeQty(id, delta) {
  const item = cart.get(id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart.delete(id);
  renderCart();
}

function removeFromCart(id) {
  cart.delete(id);
  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  let count = 0;

  if (cart.size === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Tu carrito está vacío.<br>¡Añade algo blaugrana! 💙❤️</p>`;
  } else {
    cart.forEach((item) => {
      total += item.price * item.qty;
      count += item.qty;

      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div class="cart-item-thumb ${item.imgClass || ""}" style="${item.imgClass ? "" : "background:#fdecec;"}">${item.emoji}</div>
        <div>
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">${formatPrice(item.price)} × ${item.qty}</p>
          <button class="remove-btn">Quitar</button>
        </div>
        <div class="qty-controls">
          <button class="qty-btn minus">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn plus">+</button>
        </div>`;
      row.querySelector(".minus").addEventListener("click", () => changeQty(item.id, -1));
      row.querySelector(".plus").addEventListener("click", () => changeQty(item.id, 1));
      row.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(item.id));
      cartItemsEl.appendChild(row);
    });
  }

  cartCountEl.textContent = count;
  cartTotalEl.textContent = formatPrice(total);
}

function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
}

function closeCartFn() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("show");
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function cartTotals() {
  let total = 0;
  let count = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
    count += item.qty;
  });
  return { total, count };
}

let pendingTotal = 0;

function openModal() {
  modalBackdrop.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalBackdrop.classList.remove("show");
  document.body.style.overflow = "";
}

checkoutBtn.addEventListener("click", () => {
  if (cart.size === 0) {
    showToast("El carrito está vacío");
    return;
  }
  const { total, count } = cartTotals();
  pendingTotal = total;
  modalSummary.textContent = `${count} ${count === 1 ? "artículo" : "artículos"} · Total a pagar: ${formatPrice(total)}`;
  checkoutView.hidden = false;
  successView.hidden = true;
  formError.hidden = true;
  closeCartFn();
  openModal();
});

modalClose.addEventListener("click", closeModal);
closeSuccessBtn.addEventListener("click", () => {
  closeModal();
  showToast("¡Visca el Barça! 🔵🔴");
});

modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalBackdrop.classList.contains("show")) closeModal();
});

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const field = (id) => document.getElementById(id);
  const nombre = field("f-nombre").value.trim();
  const email = field("f-email").value.trim();
  const direccion = field("f-direccion").value.trim();
  const ciudad = field("f-ciudad").value.trim();
  const cp = field("f-cp").value.trim();
  const pais = field("f-pais").value;

  let msg = "";
  if (!nombre || !email || !direccion || !ciudad || !cp) {
    msg = "Por favor, rellena todos los campos obligatorios.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg = "Introduce un email válido.";
  } else if (!/^\d{5}$/.test(cp)) {
    msg = "El código postal debe tener 5 dígitos.";
  }

  if (msg) {
    formError.textContent = msg;
    formError.hidden = false;
    return;
  }

  const metodo = checkoutForm.querySelector('input[name="pago"]:checked').value;
  const numPedido = "BCN-" + Math.floor(100000 + Math.random() * 900000);

  successText.innerHTML = `
    Gracias <strong>${nombre}</strong>, tu pedido <strong>${numPedido}</strong> se ha registrado correctamente.<br><br>
    📦 Envío a: ${direccion}, ${cp} ${ciudad} (${pais})<br>
    💳 Método de pago: ${metodo}<br>
    💰 Total: <strong>${formatPrice(pendingTotal)}</strong>`;

  checkoutView.hidden = true;
  successView.hidden = false;
  cart.clear();
  renderCart();
});

cartButton.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCartFn);
overlay.addEventListener("click", closeCartFn);

document.querySelectorAll(".nav-links a").forEach((link) =>
  link.addEventListener("click", closeCartFn)
);

renderProducts();
renderSquad();
renderCart();
