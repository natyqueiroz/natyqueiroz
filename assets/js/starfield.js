const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let width, height;
let stars = [];

// Menos estrelas em telas pequenas = menos trabalho para o processador do celular
const STAR_DENSITY = 0.00018; // estrelas por pixel de tela
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A cor das estrelas vem da variável --star do CSS (muda com o tema)
let starColor = "white";
function readStarColor() {
  starColor = getComputedStyle(document.documentElement).getPropertyValue("--star").trim() || "white";
  if (reduceMotion) drawStars(); // céu parado precisa ser redesenhado na hora
}

// MutationObserver = "vigia": avisa quando o atributo data-theme do <html> muda
new MutationObserver(readStarColor).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"],
});

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;

  // Telas "retina" têm 2 ou 3 pixels físicos por pixel CSS.
  // Desenhamos em alta resolução para as estrelas não ficarem borradas.
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function createStars() {
  const count = Math.round(width * height * STAR_DENSITY);
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.2,
      speed: Math.random() * 0.2 + 0.1,
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = starColor;

  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateStars() {
  stars.forEach((star) => {
    star.y += star.speed;
    if (star.y > height) {
      star.y = 0;
      star.x = Math.random() * width;
    }
  });
}

function animate() {
  drawStars();
  updateStars();
  requestAnimationFrame(animate);
}

// No celular, a barra de endereço some/aparece ao rolar e dispara "resize".
// Antes, isso recriava TODAS as estrelas e o céu "piscava".
// Agora só recriamos quando a LARGURA muda (ex: girar o celular).
let lastWidth = window.innerWidth;
window.addEventListener("resize", () => {
  resizeCanvas();
  if (window.innerWidth !== lastWidth) {
    lastWidth = window.innerWidth;
    createStars();
  }
  if (reduceMotion) drawStars();
});

resizeCanvas();
createStars();
readStarColor();

// Quem pediu "reduzir movimento" no sistema vê o céu parado
if (reduceMotion) {
  drawStars();
} else {
  animate();
}
