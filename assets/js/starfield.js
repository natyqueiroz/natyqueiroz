/* =========================================================
   starfield.js — fundo estrelado animado (versão otimizada)

   O que deixa ele leve:
   1. Todas as estrelas de uma camada viram UM desenho só (um "path"
      com um único fill), em vez de centenas de desenhos separados.
   2. Estrelas pequenas são quadradinhos (rect), bem mais baratos que
      círculos (arc). Com 1 ou 2 pixels, ninguém vê a diferença.
   3. O movimento é calculado pelo TEMPO, não por quadro.
   4. A animação para quando a aba fica escondida.

   Analogia: em vez de levar as compras do carro uma sacola por vez,
   você junta tudo num carrinho e faz uma viagem só.
   ========================================================= */

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 3 camadas: as estrelas mais distantes são menores e mais lentas (efeito de profundidade)
const LAYERS = [
  { density: 0.00009, minSize: 0.5, maxSize: 1.2, speed: 6, round: false }, // speed = pixels por segundo
  { density: 0.00006, minSize: 0.8, maxSize: 1.6, speed: 12, round: false },
  { density: 0.00003, minSize: 1.0, maxSize: 1.8, speed: 20, round: true }, // só as maiores são redondas
];

let width = 0;
let height = 0;
let layers = []; // cada item: { stars: [{x, y, r}], speed, round, offset }
let starColor = "white";

/* ---------- Cor das estrelas vem do tema (variável --star do CSS) ---------- */
function readStarColor() {
  starColor = getComputedStyle(document.documentElement).getPropertyValue("--star").trim() || "white";
  drawFrame();
}

// "Vigia" que avisa quando o atributo data-theme do <html> muda
new MutationObserver(readStarColor).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"],
});

/* ---------- Tamanho do canvas ---------- */
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;

  // Até 1.5x em telas retina: estrelas nítidas sem multiplicar o trabalho por 4
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

/* ---------- Cria as estrelas de cada camada ---------- */
function createStars() {
  layers = LAYERS.map((config, i) => {
    const count = Math.round(width * height * config.density);
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: config.minSize + Math.random() * (config.maxSize - config.minSize),
    }));
    return { stars, speed: config.speed, round: config.round, offset: layers[i]?.offset ?? 0 };
  });
}

/* ---------- Desenha um quadro: 1 fill por camada ---------- */
function drawFrame() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = starColor;

  for (const layer of layers) {
    ctx.beginPath();
    for (const star of layer.stars) {
      // A estrela desce e, ao passar do fim da tela, volta para o topo (% = resto da divisão)
      const y = (star.y + layer.offset) % height;
      if (layer.round) {
        ctx.moveTo(star.x + star.r, y);
        ctx.arc(star.x, y, star.r, 0, Math.PI * 2);
      } else {
        ctx.rect(star.x, y, star.r * 1.6, star.r * 1.6);
      }
    }
    ctx.fill(); // um único "pincelada" para a camada inteira
  }
}

/* ---------- Animação baseada em TEMPO, não em quadros ----------
   Se o PC está lento e mostra só 30 quadros por segundo, as estrelas
   andam a mesma distância por segundo: o movimento continua suave. */
let lastTime = 0;
let running = false;

function animate(time) {
  if (!running) return;
  const seconds = Math.min((time - lastTime) / 1000, 0.1); // evita "salto" depois de uma pausa
  lastTime = time;

  for (const layer of layers) {
    layer.offset = (layer.offset + layer.speed * seconds) % height;
  }
  drawFrame();
  requestAnimationFrame(animate);
}

function start() {
  if (running || reduceMotion) return;
  running = true;
  lastTime = performance.now();
  requestAnimationFrame(animate);
}

function stop() {
  running = false;
}

// Aba escondida (o usuário foi para outra aba)? Para tudo e economiza bateria.
document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

/* ---------- Redimensionar ----------
   No celular, a barra de endereço some/aparece ao rolar e dispara "resize".
   Só recriamos as estrelas quando a LARGURA muda (ex: girar o celular). */
let lastWidth = window.innerWidth;
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  // "Debounce": espera o usuário parar de redimensionar antes de redesenhar
  resizeTimer = setTimeout(() => {
    const widthChanged = window.innerWidth !== lastWidth;
    lastWidth = window.innerWidth;
    resizeCanvas();
    if (widthChanged || layers.length === 0) createStars();
    drawFrame();
  }, 150);
});

/* ---------- Início ---------- */
resizeCanvas();
createStars();
readStarColor(); // lê a cor do tema e desenha o primeiro quadro
start();